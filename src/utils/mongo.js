import { connect, connection } from 'mongoose';

const conn = {
  isConnected: false,
};

export async function dbConnect() {
  if (conn.isConnected) return;

  const db = await connect(process.env.DATABASE_LOCAL);
  conn.isConnected = db.connections[0].readyState;

  console.log(db.connection.db.databaseName);
}

connection.on('connected', () => {
  console.log('MongoDB connected to database');
});

connection.on('error', (err) => {
  console.log('MongoDB Error', err.message);
});
