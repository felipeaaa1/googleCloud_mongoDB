// Importa o arquivo de configuração para conexão com o banco de dados
import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/db_config.js"; 
// Estabelece a conexão com o banco usando uma string de conexão fornecida por uma variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); 


// Função para buscar todos os posts no banco de dados
export async function getTodosOsPosts() {
    const db = conexao.db("primeiro_banco"); // Seleciona o banco de dados chamado "primeiro_banco"
    const colecao = db.collection("posts"); // Seleciona a coleção chamada "posts"
    return colecao.find().toArray(); // Retorna todos os documentos da coleção convertidos para um array
}

export async function criarPost (novoPost){
    const db = conexao.db("primeiro_banco"); // Seleciona o banco de dados chamado "primeiro_banco"
    const colecao = db.collection("posts"); // Seleciona a coleção chamada "posts"
    return colecao.insertOne(novoPost); // Retorna todos os documentos da coleção convertidos para um array

}


export async function atualizarPost (id, novoPost){
    const db = conexao.db("primeiro_banco"); // Seleciona o banco de dados chamado "primeiro_banco"
    const colecao = db.collection("posts"); // Seleciona a coleção chamada "posts"
    const objId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:novoPost}); // Retorna todos os documentos da coleção convertidos para um array

}


