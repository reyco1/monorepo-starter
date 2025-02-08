import { Module } from '@nestjs/common';
import { AddController } from './add.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseModule } from '@reyco1/nestjs-firebase';
import * as admin from 'firebase-admin';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FirebaseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // Check if running in Firebase environment (Cloud Functions or emulator)
        const isFirebaseEnv = process.env.FIREBASE_CONFIG || process.env.FUNCTIONS_EMULATOR;
        
        if (isFirebaseEnv) {
          // When in Firebase environment, use automatic credentials
          return {
            serviceAccountPath: admin.credential.applicationDefault()
          };
        } else {
          // When running standalone (local development), use service account
          return {
            serviceAccountPath: configService.get<string>('FIREBASE_SERVICE_ACCOUNT_PATH'),
          };
        }
      },
      inject: [ConfigService],
    })
  ],
  controllers: [AddController],
  providers: [],
})
export class AppModule {}