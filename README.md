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

- Node.js (LTS version)
- npm or yarn
- Angular CLI
- Firebase CLI (for deployment)

## 🚦 Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
cd fullstack-monorepo
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

## 📜 Available Scripts

### Root Directory Scripts
```bash
# Run both frontend and backend in development mode
npm run dev

# Build both frontend and backend for production
npm run build

# Deploy to Firebase
npm run deploy

# Clean build artifacts
npm run clean

# Run Firebase emulators
npm run emulate

# Check deployment paths
npm run check-paths
```

### Frontend (http://localhost:4200)
```bash
cd frontend
ng serve          # Start development server
ng build          # Build for production
ng test           # Run unit tests
```

### Backend (http://localhost:3000)
```bash
cd backend
npm run start:dev # Start development server
npm run build     # Build for production
npm run test      # Run unit tests
npm run test:e2e  # Run end-to-end tests
```

## 🚀 Deployment

The project is configured for Firebase deployment. To deploy both frontend and backend:

```bash
npm run deploy
```

This command will:
1. Build both frontend and backend applications
2. Deploy the built applications to Firebase

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

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
