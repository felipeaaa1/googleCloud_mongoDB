import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, cadastrarPost, uploadImagem, atualizaNovoPost } from "../controllers/postsController.js";

const corsOpt = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

const upload = multer({dest:"./uploads", storage})


const routes = (app) => {
    // Configura o servidor para entender requisições com corpo no formato JSON
    app.use(express.json());

    app.use(cors(corsOpt))
    // Rota para retornar todos os posts
    app.get("/posts", listarPosts);
    // Rota para criar post
    app.post("/posts", cadastrarPost);
    //  subir imagem
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id",  atualizaNovoPost);


}



export default routes;