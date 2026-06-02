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
