#!/bin/bash
set -e

echo "🤖 Agent: Starting full project generation..."

# 1. Создаем Dockerfile для PocketBase
echo "📄 Creating Dockerfile..."
cat > Dockerfile << 'DOCKERFILE'
FROM alpine:latest
RUN apk add --no-cache unzip curl
ARG PB_VERSION=0.23.4
RUN wget -q https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip -O /tmp/pb.zip && \
    unzip /tmp/pb.zip -d /pb/ && \
    rm /tmp/pb.zip && \
    chmod +x /pb/pocketbase
EXPOSE 8090
WORKDIR /pb
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb_data"]
DOCKERFILE

# 2. Создаем docker-compose.yml
echo "🐳 Creating docker-compose.yml..."
cat > docker-compose.yml << 'COMPOSE'
version: '3.8'
services:
  pocketbase:
    build: .
    ports:
      - "8090:8090"
    volumes:
      - ./pb_data:/pb_data
    restart: unless-stopped
    networks:
      - app-net

  frontend:
    image: node:20-alpine
    working_dir: /app
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
    command: sh -c "npm install && npm run dev -- --host 0.0.0.0"
    depends_on:
      - pocketbase
    networks:
      - app-net

volumes:
  pb_data:

networks:
  app-net:
COMPOSE

# 3. Создаем миграцию PocketBase (Схема БД)
echo "💾 Creating PocketBase migrations..."
mkdir -p pb_migrations
cat > pb_migrations/1717200000_init_collections.js << 'MIGRATION'
/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collections = [
    { name: 'trainers', fields: [{ name: 'experience', type: 'text' }, { name: 'specialization', type: 'text' }, { name: 'photo', type: 'file' }] },
    { name: 'news', fields: [{ name: 'content', type: 'editor' }, { name: 'image', type: 'file' }] },
    { name: 'events', fields: [{ name: 'date', type: 'date' }, { name: 'location', type: 'text' }] },
    { name: 'jobs', fields: [{ name: 'salary', type: 'text' }, { name: 'requirements', type: 'editor' }] },
    { name: 'services', fields: [{ name: 'price', type: 'number' }, { name: 'duration', type: 'text' }] },
    { name: 'club_cards', fields: [{ name: 'type', type: 'select' }, { name: 'price', type: 'number' }, { name: 'validity', type: 'text' }] },
    { name: 'shares', fields: [{ name: 'discount', type: 'number' }, { name: 'end_date', type: 'date' }] },
    { name: 'banners', fields: [{ name: 'link', type: 'url' }, { name: 'position', type: 'select' }, { name: 'image', type: 'file' }] },
    { name: 'club_info', fields: [{ name: 'description', type: 'editor' }, { name: 'address', type: 'text' }] },
    { name: 'leads', system: true, fields: [{ name: 'name', type: 'text' }, { name: 'phone', type: 'text' }, { name: 'message', type: 'text' }] }
  ];

  collections.forEach(data => {
    const collection = new Collection(data);
    if (!data.system) {
      collection.listRule = "@request.auth != null || true";
      collection.viewRule = "@request.auth != null || true";
    } else {
      collection.listRule = ""; 
      collection.viewRule = "";
    }
    // Если коллекция уже есть, обновляем, иначе создаем (упрощенно для скрипта)
    try { db.findCollectionByNameOrId(data.name); } catch(e) { db.save(collection); }
  });
  return true;
}, (db) => { return false; })
MIGRATION

# 4. Создаем структуру Frontend (React + Vite)
echo "⚛️ Creating React Frontend..."
mkdir -p frontend/src/components frontend/src/pages frontend/src/lib
cat > frontend/package.json << 'PKGJSON'
{
  "name": "extrasport-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "pocketbase": "^0.21.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8"
  }
}
PKGJSON

cat > frontend/vite.config.js << 'VITECONF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  server: { host: '0.0.0.0', port: 5173 }
})
VITECONF

cat > frontend/index.html << 'HTML'
<!doctype html>
<html lang="en">
  <head><meta charset="UTF-8" /><title>ExtraSport Headless</title></head>
  <body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body>
</html>
HTML

cat > frontend/src/main.jsx << 'MAIN'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
MAIN

cat > frontend/src/App.jsx << 'APP'
import { useEffect, useState } from 'react'
import PocketBase from 'pocketbase'

const pb = new PocketBase(import.meta.env.VITE_PB_URL || 'http://localhost:8090')

function App() {
  const [collections, setCollections] = useState([])
  
  useEffect(() => {
    pb.collection('trainers').getList(1, 1).catch(() => {}) // Ping
    pb.admins.authWithPassword('admin@example.com', 'admin').catch(() => {})
    
    // Попытка получить список коллекций (для демонстрации)
    // В реальном приложении лучше использовать конкретные запросы
    fetch(`${pb.baseUrl}/api/collections`)
      .then(r => r.json())
      .then(data => setCollections(data.items || []))
      .catch(e => console.error(e))
  }, [])

  return (
    <div style={{padding: '2rem', fontFamily: 'sans-serif'}}>
      <h1>🏋️ ExtraSport Headless (PocketBase)</h1>
      <p>Status: <strong>{collections.length > 0 ? 'Connected ✅' : 'Connecting...'}</strong></p>
      <h3>Available Collections:</h3>
      <ul>
        {collections.map(c => <li key={c.id}><code>{c.name}</code> ({c.type})</li>)}
      </ul>
      <p><i>Open <a href="/_/" target="_blank">PocketBase Admin</a> to manage data.</i></p>
    </div>
  )
}
export default App
APP

# 5. Создаем .env
echo "🔑 Creating .env..."
cat > .env << 'ENV'
VITE_PB_URL=http://localhost:8090
ENV

# 6. Git Commit
echo "💾 Committing changes..."
git add .
git commit -m "feat(agent): Full PocketBase + React scaffold generated" || echo "No changes to commit"

echo "✅ Done! Run: docker compose up -d --build"
