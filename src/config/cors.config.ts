import { ConfigService } from '@nestjs/config'

const getCorsConfig = async () => ({
  origin: process.env.DOMAIN,
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Accept',
    'Content-Type',
    'Authorization',
  ],
  methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
})

export default getCorsConfig
