import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6380');
const TTL = 60;

export async function getBooksCache() {
  try {
    const raw = await redis.get('books:list');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function setBooksCache(data: unknown) {
  try {
    if (data === null) return redis.del('books:list');
    return redis.set('books:list', JSON.stringify(data), 'EX', TTL);
  } catch {
    // ignore
  }
}
