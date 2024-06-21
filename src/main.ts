import 'reflect-metadata'

import { Req, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify'
import fastifyCsrf from '@fastify/csrf-protection'

import getCorsConfig from 'config/cors.config'

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('InterCity Taxi API')
    .setDescription('API for InterCity Taxi')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  if (process.env.ENVIRONMENT === 'production') {
    app.enableCors(await getCorsConfig())
  }

  await app.register(fastifyCsrf)
  await app.listen(process.env.PORT || 3000)
}

bootstrap()
