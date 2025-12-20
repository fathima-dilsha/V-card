import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule);

    // Enable CORS for frontend
    app.enableCors({
      origin: [
        'http://localhost:3000',  // Next.js default
        'http://localhost:5173',  // Vite default
        process.env.FRONTEND_URL,
      ].filter(Boolean),
      credentials: true,
    });

    // Enable global validation
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    // Set global prefix for all routes
    app.setGlobalPrefix('api');

    const port = process.env.PORT || 3000;
    await app.listen(port);

    logger.log(` Application is running on: http://localhost:${port}`);
    logger.log(`  Database: Connected successfully`);
  } catch (error) {
    logger.error(' Failed to start application', error);
    process.exit(1);
  }
}

bootstrap();