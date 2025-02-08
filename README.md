# Fullstack Monorepo (NestJS + Angular)

This monorepo contains a modern fullstack application built with NestJS (backend) and Angular (frontend). The project uses Firebase for deployment and follows a clean architecture pattern.

## 🏗️ Project Structure

```
monorepo/
├── backend/          # NestJS backend application
├── frontend/         # Angular frontend application
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
- Built with latest Angular
- TailwindCSS for styling
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
npm install
cd frontend && npm install
cd ../backend && npm install
```

3. **Development**
```bash
# Run both frontend and backend in development mode
npm run dev

# Frontend only (http://localhost:4200)
cd frontend && ng serve

# Backend only (http://localhost:3000)
cd backend && npm run start:dev
```

## 🏭 Build

```bash
# Build both frontend and backend
npm run build

# Frontend only
cd frontend && ng build

# Backend only
cd backend && npm run build
```

## 🚀 Deployment

The project is configured for Firebase deployment:

```bash
npm run deploy
```

## 🧪 Testing

### Frontend
```bash
cd frontend
ng test        # Run unit tests
ng e2e         # Run end-to-end tests
```

### Backend
```bash
cd backend
npm run test        # Run unit tests
npm run test:e2e    # Run end-to-end tests
```

## 🔧 Available Scripts

- `npm run dev`: Start both frontend and backend in development mode
- `npm run build`: Build both frontend and backend for production
- `npm run deploy`: Deploy the application to Firebase
- `npm run emulate`: Run Firebase emulators
- `npm run clean`: Clean build directories
- `npm run check-paths`: Verify deployment paths

## 📝 Environment Configuration

1. Backend: Create a `.env` file in the `backend` directory
2. Frontend: Environment files are located in `frontend/src/environments/`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details

## 👥 Support

For support, please open an issue in the repository or contact the maintainers.
