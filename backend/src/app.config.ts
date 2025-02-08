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
