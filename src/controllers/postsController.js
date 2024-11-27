import { getTodosOsPosts, criarPost , atualizarPost} from "../models/postModel.js";
import gerarDescricaoComGemini  from "../services/geminiService.js";
import fs from "fs";

export async function listarPosts(req, res) {
    const posts = await getTodosOsPosts();
    res.status(200).json(posts);
}

export async function cadastrarPost(req, res) {
    const novoPost = req.body;

    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Erro ao tentar criar post" + erro.message })
    }
}

export async function uploadImagem(req, res) {
    const novoPost ={ 
        descricao: "",
        img_url: req.file.originalname,
        alt:""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json("image inserida com sucesso!!/n"+postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Erro ao tentar subir uma imagem" + erro.message })
    }
}

export async function atualizaNovoPost(req, res) {
    const id = req.params.id;
    const url_imagem = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer)
        
    const post = {
        descricao: descricao,
        img_url: url_imagem,
        alt: req.body.alt

    }
        const postCriado = await atualizarPost(id, post);
        
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Erro ao tentar criar post" + erro.message })
    }
}