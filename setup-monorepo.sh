#!/bin/bash

# Exit on error
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored status messages
print_status() {
    if [ $2 -eq 0 ]; then
        echo -e "${GREEN}✓ $1${NC}"
    else
        echo -e "${RED}✗ $1${NC}"
        exit 1
    fi
}

# Function to print section headers
print_section() {
    echo -e "\n${BLUE}=== $1 ===${NC}"
}

print_section "Setting up fullstack nestjs/angular monorepo..."

# Check if the user is on Node 20
node_version=$(node -v)
if [[ ! $node_version =~ ^v20 ]]; then
    echo -e "${RED}Error: Please install Node 20 and try again${NC}"
    exit 1
fi

# Check if directory is empty or doesn't have package.json
if [ -f "package.json" ]; then
    echo -e "${RED}Error: package.json already exists in root directory${NC}"
    exit 1
fi

# Install necessary global packages
print_section "Installing global packages..."
npm install -g @nestjs/cli @angular/cli firebase-tools
print_status "Global packages installed" $?

# Create root package.json
print_section "Creating root package.json..."
cat > package.json << 'EOFROOT'
{
  "name": "fullstack-monorepo",
  "version": "1.0.0",
  "description": "Fullstack monorepo with NestJS and Angular",
  "scripts": {
    "dev": "concurrently \"cd frontend && ng serve\" \"cd backend && npm run start:dev\"",
    "build": "cd frontend && ng build --configuration production && cd ../backend && rm -rf dist && npm run build",
    "deploy": "npm run build && firebase deploy",
    "check-paths": "./.debug/check-paths.sh",
    "emulate": "npm run clean && npm run build && npm run check-paths && firebase emulators:start",
    "clean": "rm -rf frontend/dist frontend/.angular backend/dist"
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}
EOFROOT
print_status "Root package.json created" $?

# Install root dependencies
print_section "Installing root dependencies..."
npm install
print_status "Root dependencies installed" $?

# Create backend
print_section "Creating backend..."
nest new backend --package-manager npm --skip-git --skip-install
print_status "NestJS backend created" $?

cd backend

# Install backend dependencies
print_section "Installing backend dependencies..."
npm install firebase-admin firebase-functions @nestjs/platform-express
npm install -D @types/express typescript ts-node
npm install --save @nestjs/config
print_status "Backend dependencies installed" $?

# Remove default index.ts if it exists
rm -f src/index.ts
print_status "Removed default index.ts" $?

# Create src/app.config.ts
print_section "Creating backend configuration files..."
cat > src/app.config.ts << 'EOFCONFIG'
import { INestApplication } from '@nestjs/common';

export async function configureApp(app: INestApplication) {
  // Enable CORS
  app.enableCors();
  
  // Configure multer for file uploads
  // const upload = multer({
  //   dest: 'uploads/',
  //   limits: {
  //     fileSize: 5 * 1024 * 1024, // 5MB limit
  //   }
  // });
  
  // Add any other global middleware or configurations here
  // app.use('/upload', upload.single('file'));
  // app.useGlobalPipes(...);
  // app.useGlobalFilters(...);
  // app.useGlobalInterceptors(...);
  
  return app;
}
EOFCONFIG
print_status "Created app.config.ts" $?

# Update main.ts
cat > src/main.ts << 'EOFMAIN'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApp } from './app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureApp(app);
  await app.listen(3000);
}
bootstrap();
EOFMAIN
print_status "Updated main.ts" $?

# Create firebase.ts
cat > src/firebase.ts << 'EOFFIRE'
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';
import * as functions from 'firebase-functions';
import { Logger } from '@nestjs/common';
import { configureApp } from './app.config';

const server = express();
const logger = new Logger('Firebase');

async function bootstrap() {
  try {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    );
    configureApp(app);
    await app.init();
    logger.log('NestJS application initialized');
  } catch (error) {
    logger.error('Failed to initialize NestJS application', error);
    throw error;
  }
}

bootstrap();

export const api = functions.https.onRequest(server);
EOFFIRE
print_status "Created firebase.ts" $?

# Create add controller
print_section "Creating backend controllers..."
cat > src/add.controller.ts << 'EOFCTRL'
import { Controller, Get, Query } from '@nestjs/common';

@Controller('api/v1')
export class AddController {
  @Get('add')
  add(@Query('a') a: string, @Query('b') b: string) {
    const numA = Number(a);
    const numB = Number(b);
    
    if (isNaN(numA) || isNaN(numB)) {
      return { error: 'Invalid input: parameters must be numbers' };
    }
    
    return { result: numA + numB };
  }
}
EOFCTRL
print_status "Created add.controller.ts" $?

# Update app.module.ts
cat > src/app.module.ts << 'EOFMOD'
import { Module } from '@nestjs/common';
import { AddController } from './add.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AddController],
  providers: [],
})
export class AppModule {}
EOFMOD
print_status "Updated app.module.ts" $?

# Create firebase config for TypeScript compilation
cat > tsconfig.firebase.json << 'EOFTSCONFIG'
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": false,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2017",
    "sourceMap": false,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": false,
    "skipLibCheck": true,
    "esModuleInterop": true
  },
  "include": ["src/firebase.ts"],
  "exclude": ["node_modules", "dist"]
}
EOFTSCONFIG
print_status "Created tsconfig.firebase.json" $?

# Update package.json
print_section "Updating backend package.json..."
node -e "
const pkg = require('./package.json');
pkg.main = 'index.js';
pkg.scripts.build = 'nest build && tsc -p tsconfig.firebase.json && cp package.json dist/ && mv dist/firebase.js dist/index.js';
require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"
print_status "Updated backend package.json" $?

cd ..

# Create frontend
print_section "Creating frontend..."
ng new frontend --style css --skip-tests --routing --skip-git --defaults
print_status "Angular frontend created" $?

cd frontend

# Install frontend dev dependencies
print_section "Installing frontend dependencies..."
npm install -D @types/cors @types/eslint-scope @types/estree
print_status "Frontend dev dependencies installed" $?

# update tsconfig.json
print_section "Configuring frontend TypeScript..."
cat > tsconfig.json << 'EOFJSON'
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "types": ["node", "@types/cors", "@types/eslint-scope", "@types/estree"]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
EOFJSON
print_status "Created tsconfig.json" $?

# Create environment files
print_section "Creating frontend environment files..."
mkdir -p src/environments
cat > src/environments/environment.ts << 'EOFENV'
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1'
};
EOFENV
print_status "Created environment.ts" $?

cat > src/environments/environment.prod.ts << 'EOFENVPROD'
export const environment = {
  production: true,
  apiUrl: '/api/v1'
};
EOFENVPROD
print_status "Created environment.prod.ts" $?

# Update app.component.ts
print_section "Creating frontend components..."
cat > src/app/app.component.ts << 'EOFCOMP'
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AppComponent implements OnInit {
  numberA: number = 0;
  numberB: number = 0;
  result: number | null = null;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('Environment:', environment);
  }

  calculate() {
    const url = `${environment.apiUrl}/add?a=${this.numberA}&b=${this.numberB}`;
    console.log('Calling API at:', url);
    console.log('Is production:', environment.production);
    
    this.http.get<any>(url).subscribe({
      next: (response) => {
        console.log('API response:', response);
        if (response.error) {
          this.error = response.error;
          this.result = null;
        } else {
          this.result = response.result;
          this.error = null;
        }
      },
      error: (error) => {
        console.error('API error:', error);
        this.error = `Error: ${error.message || 'An error occurred while calculating'}`;
        this.result = null;
      }
    });
  }
}
EOFCOMP
print_status "Created app.component.ts" $?

# Update app.component.html
cat > src/app/app.component.html << 'EOFHTML'
<div class="p-5 bg-gray-900 text-white min-h-screen flex items-center justify-center">
  <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold mb-6 text-center">Calculator</h1>
    
    <div class="flex flex-col items-center mb-6">
      <input type="number" [(ngModel)]="numberA" placeholder="First number" class="bg-gray-700 text-white p-2 rounded mb-2 w-full">
      <input type="number" [(ngModel)]="numberB" placeholder="Second number" class="bg-gray-700 text-white p-2 rounded mb-2 w-full">
      <button (click)="calculate()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Add Numbers</button>
    </div>

    <div *ngIf="result !== null" class="text-lg text-center">
      Result: {{ result }}
    </div>

    <div *ngIf="error" class="text-red-500 mt-2 text-center">
      {{ error }}
    </div>
  </div>
</div>
EOFHTML
print_status "Created app.component.html" $?

# update app.config.ts
cat > src/app/app.config.ts << 'EOFCONFIG'
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi())
  ]
};
EOFCONFIG
print_status "Created app.config.ts" $?

# Update angular.json to handle environments correctly
print_section "Configuring Angular build settings..."
node -e "
const fs = require('fs');
const angularJson = JSON.parse(fs.readFileSync('./angular.json', 'utf8'));
const projectName = Object.keys(angularJson.projects)[0];

// Update build configurations
const buildOptions = angularJson.projects[projectName].architect.build;
buildOptions.options.outputPath = 'dist';
buildOptions.options.fileReplacements = [];

buildOptions.configurations.production = {
  ...buildOptions.configurations.production,
  fileReplacements: [
    {
      replace: 'src/environments/environment.ts',
      with: 'src/environments/environment.prod.ts'
    }
  ],
  outputPath: 'dist',
  optimization: true,
  sourceMap: false,
  namedChunks: false,
  extractLicenses: true,
  budgets: [
    {
      type: 'initial',
      maximumWarning: '2mb',
      maximumError: '5mb'
    }
    ]
};

fs.writeFileSync('./angular.json', JSON.stringify(angularJson, null, 2));
"
print_status "Updated angular.json" $?

cd ..

# Create firebase.json
print_section "Creating Firebase configuration..."
cat > firebase.json << 'EOFFIRE'
{
  "functions": {
    "source": "backend/dist",
    "runtime": "nodejs20"
  },
  "hosting": {
    "public": "frontend/dist/browser",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "/api/**",
        "function": "api"
      },
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "emulators": {
    "functions": {
      "port": 5001
    },
    "hosting": {
      "port": 8080,
      "host": "localhost"
    },
    "ui": {
      "enabled": true,
      "port": 4000
    }
  }
}
EOFFIRE
print_status "Created firebase.json" $?

# Create .gitignore
print_section "Creating Git configuration..."
cat > .gitignore << 'EOFGIT'
# Dependencies
node_modules/

# Build outputs
dist/
.angular/

# Firebase
.firebase/
*.log

# ignore node_modules from the backend
backend/node_modules/

# ignore node_modules from the frontend
frontend/node_modules/

# ignore dist from the frontend
frontend/dist

# ignore dist from the backend
backend/dist
EOFGIT
print_status "Created .gitignore" $?

# Add debug script
print_section "Creating debug commands..."
mkdir -p .debug
cat > .debug/check-paths.sh << 'EOFCHECK'
#!/bin/bash
echo "Frontend build output structure:"
tree frontend/dist 2>/dev/null || find frontend/dist -type d 2>/dev/null || echo "Directory not found: frontend/dist"

echo -e "\nIndex.html location:"
find frontend/dist -name "index.html" 2>/dev/null || echo "No index.html found"

echo -e "\nContents of index.html location:"
INDEX_PATH=$(find frontend/dist -name "index.html" 2>/dev/null)
if [ -n "$INDEX_PATH" ]; then
    ls -la "$(dirname "$INDEX_PATH")"
fi

echo -e "\nBackend build output:"
ls -la backend/dist 2>/dev/null || echo "Directory not found: backend/dist"

echo -e "\nFirebase hosting public directory contents:"
FIREBASE_PUBLIC=$(node -e "console.log(require('./firebase.json').hosting.public)")
echo "Checking contents of: $FIREBASE_PUBLIC"
ls -la "$FIREBASE_PUBLIC" 2>/dev/null || echo "Directory not found: $FIREBASE_PUBLIC"
EOFCHECK
chmod +x .debug/check-paths.sh
print_status "Created debug scripts" $?

# Install dependencies in backend and frontend
print_section "Installing project dependencies..."
cd backend && npm install
print_status "Backend dependencies installed" $?
cd ../frontend && npm install
print_status "Frontend dependencies installed" $?

# Install Tailwind CSS and related packages
print_section "Setting up Tailwind CSS..."
npm install tailwindcss @tailwindcss/postcss postcss --force
print_status "Installed Tailwind CSS packages" $?

# Create .postcssrc.json
cat > .postcssrc.json << 'EOL'
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
EOL
print_status "Created .postcssrc.json" $?

# Check and update styles.css
if ! grep -q '@import "tailwindcss";' src/styles.css; then
  echo '@import "tailwindcss";' | cat - src/styles.css > temp && mv temp src/styles.css
  print_status "Updated styles.css with Tailwind import" $?
fi

# Return to root directory
cd ..

print_section "Setup Complete!"
echo -e "${GREEN}✓ Project setup successfully completed${NC}"
echo -e "\n${YELLOW}Next Steps:${NC}"
echo -e "1. To start development, run: ${GREEN}npm run dev${NC}"
echo -e "2. To test deployment locally, run: ${GREEN}npm run emulate${NC}"
echo -e "3. To deploy to Firebase:"
echo -e "   - First login with: ${GREEN}firebase login${NC}"
echo -e "   - Then run: ${GREEN}npm run deploy${NC}"