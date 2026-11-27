import * as livroLogic from "../logic/livroLogic.js";

export async function listarLivros(request, response) {
  try {
    const livros = await livroLogic.obterLivros();
    response.json(livros);
  } catch (error) {
    console.error("Erro ao listar livros:", error);
    response.status(error.status || 500).json({ error: "Erro ao listar livros" });
  }
}
export async function obterLivroPorId(request, response) {
  try {
    const { id } = request.params;
    if(id === undefined || isNaN(id)) {
      return response.status(400).json({ error: "ID inválido" });
    }
    const livro = await livroLogic.obterLivroPorId(id);
    if (!livro) {
      return response.status(404).json({ error: "Livro não encontrado" });
    }
    response.json(livro);
  } catch (error) {
    console.error("Erro ao obter livro:", error);
    response.status(error.status || 500).json({ error: "Erro ao obter livro" });
  }
}
export async function criarLivro(request, response) {
  try {
    const { titulo, isbn, ano, editoraId, autorIds } = request.body;
    const livroCriado = await livroLogic.criarLivroCompleto({ titulo, isbn, ano, editoraId }, autorIds);
    response.status(201).json(livroCriado);
  } catch (error) {
    console.error("Erro ao criar livro:", error);
    response.status(error.status || 500).json({ error: "Erro ao criar livro" });
  }
}

export async function alterarLivro(request, response) {
  try {
    const { id } = request.params;
    const dados = request.body;
    if(id === undefined || isNaN(id)) {
      return response.status(400).json({ error: "ID inválido" });
    }
    await livroLogic.alterarLivro(id, dados);
    response.json({ message: "Livro atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao alterar livro:", error);
    response.status(error.status || 500).json({ error: "Erro ao alterar livro" });
  }
}

export async function deletarLivro(request, response) {
  try {
    const { id } = request.params;
    if(id === undefined || isNaN(id)) {
      return response.status(400).json({ error: "ID inválido" });
    }
    await livroLogic.deletarLivro(id);
    response.status(204).send("deletado com sucesso");
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    response.status(error.status || 500).json({ error: "Erro ao deletar livro" });
  }
}
