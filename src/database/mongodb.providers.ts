import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI não definida. Erro 500 - Falha na conexão com o banco de dados.');
}

export const mongodbProvider = {
  provide: 'MONGODB_CONNECTION',
  useFactory: async () => {
    const client = new MongoClient(mongoUri);
    await client.connect();
    return client.db(); // Retorna a instância do banco de dados
  },
};
