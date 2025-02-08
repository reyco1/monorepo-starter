# Monorepo Setup Checklist

This checklist outlines the necessary steps to set up the monorepo from scratch.

---

## 1. Clone the Repository
- Run the following commands in your terminal:
  ```bash
  git clone https://github.com/reyco1/monorepo-starter.git
  cd fullstack-monorepo
  ```

## 2. Install Dependencies for All Projects
- In the repository root, run:
  ```bash
  npm run install:all
  ```
- This installs all dependencies for the frontend, backend, and other sub-projects.

## 3. Setup Environment & Configuration Files
### Backend
- Copy the example environment file:
  ```bash
  cp backend/.env.example backend/.env
  ```
- Update `backend/.env` with your specific configurations (API keys, port numbers, etc.).

### Frontend
- Update the environment files with your Firebase configuration and other settings:
  - `frontend/src/environments/environment.ts`
  - `frontend/src/environments/environment.prod.ts`

## 4. Firebase Setup
### Install and Login with Firebase CLI
- Ensure you have the Firebase CLI installed (if not, install via `npm install -g firebase-tools`).
- Login to Firebase by running:
  ```bash
  npm run firebase:login
  ```

### Initialize Firebase (for New Projects)
- If starting from scratch, initialize Firebase with:
  ```bash
  npm run firebase:init
  ```
- During initialization, select these options:
  - Enable Cloud Functions (set `backend/dist` as your functions directory)
  - Enable Firebase Hosting (set `frontend/dist/browser` as your hosting directory)
  - Configure as a single-page app: Yes
  - Skip automatic GitHub deploys (if not required)

## 5. Development Workflow
### Running the Application
- To run both frontend and backend concurrently in development mode:
  ```bash
  npm run dev
  ```
- To run them individually:
  - Frontend: `npm run start:frontend` (http://localhost:4200)
  - Backend: `npm run start:backend` (http://localhost:3000)

### Building for Production
- Build both projects together:
  ```bash
  npm run build
  ```
- Or build individually:
  - Frontend: `npm run build:frontend`
  - Backend: `npm run build:backend`

### Cleaning Build Artifacts
- Run:
  ```bash
  npm run clean
  ```

## 6. Testing and Code Quality
### Testing
- Run all tests with:
  ```bash
  npm run test:all
  ```

### Linting
- Check code quality with:
  ```bash
  npm run lint:all
  ```

## 7. Deployment
### Deploy Everything
- Build and deploy the entire application:
  ```bash
  npm run deploy
  ```

### Selective Deployment
- Deploy backend functions only:
  ```bash
  npm run deploy:functions
  ```
- Deploy frontend hosting only:
  ```bash
  npm run deploy:hosting
  ```

### Local Testing with Firebase Emulators
- Run the Firebase emulators:
  ```bash
  npm run emulate
  ```

### Check Deployment Paths
- Validate your deployment configuration with:
  ```bash
  npm run check-paths
  ```

## 8. Maintenance and Updates
### Update Dependencies
- Update project dependencies across all workspaces:
  ```bash
  npm run update:deps
  ```

### Reinstall Dependencies (if needed)
- Reinstall all dependencies:
  ```bash
  npm run install:all
  ```

## 9. Additional Considerations
- **Project Structure Familiarization:**
  - Review the monorepo layout to understand the organization:
    ```
    monorepo/
    ├── backend/          # NestJS backend application
    ├── frontend/         # Angular frontend application
    ├── .debug/           # Debug utilities
    ├── firebase.json     # Firebase configuration
    └── setup-monorepo.sh # Setup script for the monorepo
    ```
- **Review Documentation:**
  - Read the README.md for further details on available scripts, deployment instructions, and project-specific notes.

---

Follow this checklist to ensure you have all necessary steps covered for a successful monorepo setup.