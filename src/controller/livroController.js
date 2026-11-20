import * as livroLogic from "../logic/livroLogic.js";

export async function listarLivros(request, response) {
  try {
    const livros = await livroLogic.obterLivros();
    response.json(livros);
  } catch (error) {
    console.error("Erro ao listar livros:", error);
    response.status(500).json({ error: "Erro ao listar livros" });
  }
}