import { NestApplication, NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle("Auth Platform question API")
    .setDescription("API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api/docs", app, document);

  app.enableCors({
    origin: "http://localhost:8000",
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 8000);
}

bootstrap().catch(console.error);
