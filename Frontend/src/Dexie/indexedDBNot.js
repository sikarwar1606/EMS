import Dexie from 'dexie';

export const db = new Dexie('database');

db.version(2).stores({
  users: 'user_id, name, &login_id',
  income_categories:'category_id,user_id,name,created_at',
});