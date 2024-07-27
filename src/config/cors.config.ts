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
  credentials: true,
  methods: ['GET', 'PATCH', 'POST', 'DELETE'],
})

export default getCorsConfig
