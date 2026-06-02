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
