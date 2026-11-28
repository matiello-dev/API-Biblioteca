import * as emprestimoLogic from "../logic/emprestimoLogic.js";

export async function emprestarLivro(request, response) {
  try {
    const { livroId, usuarioId } = request.body;
    await emprestimoLogic.emprestarLivro(livroId, usuarioId);
    response.json({ message: "Livro emprestado com sucesso" });
  } catch (error) {
    console.error("Erro ao emprestar livro:", error);
    response.status(error.status || 500).json({ error: "Erro ao emprestar livro" });
  }
}
