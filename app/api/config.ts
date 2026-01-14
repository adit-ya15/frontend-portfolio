import { Redis } from '@upstash/redis'
import nodemailer from 'nodemailer';
const redis = new Redis({
  url: process.env.UPSTASH_URL || '',
  token: process.env.UPSTASH_TOKEN || '',
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD
  }
});

export { redis, transporter };