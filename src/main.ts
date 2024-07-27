import * as basicAuth from 'express-basic-auth'

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

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('NextCity | API')
      .setDescription(
        'API for web application for Next City Taxi in Rossoh, Russia.',
      )
      .setVersion('1.0')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)
  }

  app.enableCors(await getCorsConfig())

  await app.register(fastifyCsrf)
  await app.listen(process.env.PORT || 5000)
}

bootstrap()
