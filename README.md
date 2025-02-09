# Fullstack Monorepo

<div align="center">
  <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="Angular Logo" width="120"/>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://nestjs.com/img/logo-small.svg" alt="NestJS Logo" width="120"/>
</div>

<br/>

This monorepo contains a modern fullstack application built with NestJS (backend) and Angular (frontend). The project uses Firebase for deployment and follows a clean architecture pattern.

## 🏗️ Project Structure

```
monorepo/
├── backend/          # NestJS backend application
├── frontend/         # Angular frontend application
├── .debug/           # Debug utilities
├── firebase.json     # Firebase configuration
└── setup-monorepo.sh # Setup script for the monorepo
```

## 🚀 Features

### Backend (NestJS)
- Built with NestJS framework
- TypeScript support
- ESLint + Prettier configuration
- Environment configuration
- Firebase integration
- Unit and E2E testing setup

### Frontend (Angular)
- Built with latest Angular (v19)
- TailwindCSS v4.0 for styling
- TypeScript support
- Responsive design
- Modern development setup with hot reload
- Testing configuration with Jasmine

## 🛠️ Prerequisites

- Node.js (v20.0.0 or higher)
- npm (v10.0.0 or higher)
- Angular CLI
- Firebase CLI (for deployment)

## 🔥 Firebase Setup

1. **Install Firebase CLI** (if not already installed)
```bash
npm run firebase:login
```

2. **Login to Firebase**
```bash
npm run firebase:login
```

3. **Initialize Firebase Project** (if starting from scratch)
```bash
npm run firebase:init
```
Select the following options:
- Functions: Configure a Cloud Functions directory and its files
- Hosting: Configure files for Firebase Hosting
- Use an existing project or create a new one
- Select `backend/dist` as your functions directory
- Select `frontend/dist/browser` as your hosting directory
- Configure as a single-page app: Yes
- Set up automatic builds and deploys with GitHub: No

4. **Environment Setup**
```bash
# Backend: Create .env file in backend directory
cp backend/.env.example backend/.env

# Frontend: Update environment files
# Edit these files with your Firebase config:
frontend/src/environments/environment.ts
frontend/src/environments/environment.prod.ts
```

5. **Environment Configuration**
- For the frontend, refer to `environment.example.ts` for a basic structure:
  ```typescript
  // frontend/src/environments/environment.example.ts
  export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000/api/v1',
    firebaseConfig: {
      // Your Firebase configuration here
    }
  };
  ```
- In `environment.ts` (development), use the full URL including `localhost:3000`:
  ```typescript
  apiUrl: 'http://localhost:3000/api/v1'
  ```
- In `environment.prod.ts`, use a relative URL:
  ```typescript
  apiUrl: '/api/v1'
  ```
- Update both files with your specific Firebase configuration.


## 🚦 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/reyco1/monorepo-starter.git
cd fullstack-monorepo
```

2. **Install all dependencies**
```bash
npm run install:all
```

## 📜 Available Scripts

### Root Directory Scripts

#### Development
```bash
# Run both frontend and backend in development mode
npm run dev

# Start frontend only
npm run start:frontend  # Runs on http://localhost:4200

# Start backend only
npm run start:backend   # Runs on http://localhost:3000
```

#### Building
```bash
# Build both projects for production
npm run build

# Build frontend only
npm run build:frontend

# Build backend only
npm run build:backend

# Clean build artifacts
npm run clean
```

#### Testing and Linting
```bash
# Run all tests
npm run test:all

# Run all linting
npm run lint:all
```

#### Deployment
```bash
# Deploy everything
npm run deploy

# Deploy only backend functions
npm run deploy:functions

# Deploy only frontend hosting
npm run deploy:hosting

# Run Firebase emulators
npm run emulate

# Check deployment paths
npm run check-paths
```

#### Maintenance
```bash
# Update dependencies across all projects
npm run update:deps

# Install dependencies for all projects
npm run install:all
```

## 🚀 Deployment

The project is configured for Firebase deployment with the following setup:
- Frontend is served via Firebase Hosting at `frontend/dist/browser`
- Backend is deployed as Firebase Functions at `backend/dist`
- API requests (`/api/**`) are automatically routed to the backend
- All other routes are handled by the Angular application

### Deploy to Firebase

1. **Build and Deploy Everything**
```bash
npm run deploy
```

2. **Selective Deployment**
```bash
# Deploy only backend functions
npm run deploy:functions

# Deploy only frontend hosting
npm run deploy:hosting
```

### Firebase Configuration
The `firebase.json` configuration includes:
```json
{
  "functions": {
    "source": "backend/dist",
    "runtime": "nodejs20"
  },
  "hosting": {
    "public": "frontend/dist/browser",
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
  }
}
```

## 🧪 Local Development with Firebase

To test the application with Firebase emulators:

```bash
npm run emulate
```

This will:
1. Clean previous builds
2. Build both applications
3. Check deployment paths
4. Start Firebase emulators
   - Functions emulator on port 5001
   - Hosting emulator on port 8080

## 📦 Dependencies

This project uses npm workspaces to manage the monorepo structure. Key dependencies include:
- `concurrently`: Run multiple commands concurrently
- `firebase-tools`: Firebase CLI for deployment and emulation
- `rimraf`: Cross-platform solution for recursive directory cleanup

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
