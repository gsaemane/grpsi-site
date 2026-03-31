import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '../public');
const DB_PATH = path.join(__dirname, '../../backend/data/db.json');
const ENV_PATH = path.join(__dirname, '../.env.local');

// Manual loader for .env.local (Node.js standalone script support)
if (fs.existsSync(ENV_PATH)) {
    const envFile = fs.readFileSync(ENV_PATH, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, ...value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.join('=').trim().replace(/^["']|["']$/g, '');
        }
    });
}

// Check for token
if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ Error: BLOB_READ_WRITE_TOKEN is missing from environment.');
    console.log('💡 Ensure you have added it to frontend/.env.local (e.g., BLOB_READ_WRITE_TOKEN=your_token)');
    process.exit(1);
}

async function migrate() {
    console.log('🚀 Starting Maritime Asset Migration to Vercel Blob...');
    
    // Read DB
    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    let dbString = JSON.stringify(db);
    
    // Scan public folder for images
    const files = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
    
    for (const file of files) {
        const filePath = path.join(PUBLIC_DIR, file);
        const fileBuffer = fs.readFileSync(filePath);
        
        console.log(`📤 Uploading ${file}...`);
        try {
            const blob = await put(file, fileBuffer, {
                access: 'public',
            });
            
            console.log(`✅ Uploaded: ${blob.url}`);
            
            // Replace local path with Blob URL in DB string
            // Local paths are usually like "/filename.png" or "filename.png"
            const localPath = `/${file}`;
            const regex = new RegExp(localPath, 'g');
            dbString = dbString.replace(regex, blob.url);
            
        } catch (err) {
            console.error(`❌ Failed to upload ${file}:`, err.message);
        }
    }
    
    // Write updated DB
    fs.writeFileSync(DB_PATH, JSON.stringify(JSON.parse(dbString), null, 4));
    console.log('✨ Migration complete. Database updated with maritime cloud URLs.');
}

migrate();
