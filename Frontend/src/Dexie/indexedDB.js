import Dexie from 'dexie'

export const db = new Dexie('testDB')

db.version(1).stores({
    income: 'income_source, income_amount, income_desc',
    expenses:'expenses_source, expenses_amount, expenses_desc'
})