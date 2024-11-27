import express from "express"; // Importa o módulo express para criar e gerenciar o servidor HTTP
import routes from "./src/routes/postsRoutes.js";

const app = express(); // Cria uma instância do servidor express
app.use(express.static("uploads"))
routes(app);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.group("Servidor escutando..."); // Exibe uma mensagem no console quando o servidor está rodando
});



// Função para buscar o índice de um post pelo ID
function buscarPost(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id); // Compara o ID convertido para número com o ID do post
    });
}
