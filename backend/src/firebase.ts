import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import { Logger } from '@nestjs/common';
import { configureApp } from './app.config';

const expressApp = express();
const logger = new Logger('Firebase');

async function createNestApp() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    { logger: ['error', 'warn', 'log'] }
  );
  
  app.enableCors();
  configureApp(app);
  await app.init();
  return app;
}

createNestApp().catch(err => {
  logger.error('Error initializing NestJS application:', err);
  process.exit(1);
});

// Export with v2 configuration
export const api = onRequest(
  {
    memory: '256MiB',
    timeoutSeconds: 60,
    minInstances: 0,
    maxInstances: 10,
    cors: true
  }, 
  expressApp
);
