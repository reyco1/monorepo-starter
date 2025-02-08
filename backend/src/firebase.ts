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
