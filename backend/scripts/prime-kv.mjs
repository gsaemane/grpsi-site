import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const DB_PATH = path.join(__dirname, '../data/db.json');
const MARITIME_DATA_KEY = 'gprsi_site_content';

async function primeKV() {
    console.log('🚀 Starting Maritime Cloud Database Priming...');

    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
        console.error('❌ Error: Vercel KV credentials missing from backend/.env');
        console.log('💡 Ensure you have added KV_REST_API_URL and KV_REST_API_TOKEN.');
        process.exit(1);
    }

    try {
        console.log('📖 Reading local database...');
        const localData = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

        console.log('☁️  Uploading to Vercel KV...');
        await kv.set(MARITIME_DATA_KEY, localData);

        console.log('✅ Success! Maritime data is now live in the Cloud.');
        console.log(`🔗 Key: ${MARITIME_DATA_KEY}`);
    } catch (err) {
        console.error('❌ Priming Failed:', err);
    }
}

primeKV();
