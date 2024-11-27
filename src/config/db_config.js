import { MongoClient } from 'mongodb';

export default async function conectarAoBanco(stringConexao) {
    let client;

    try {
        client = new MongoClient(stringConexao);
        console.log('Conectado ao cluster do bando de dados...');
        await client.connect();
        console.log('Concetado ao MongoDB Atlas com sucesso');
        return client;
    }catch (erro) {
        console.log('Falha na conexão com o banco', erro);
        process.exit;
    }
}