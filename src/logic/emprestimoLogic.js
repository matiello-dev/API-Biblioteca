import * as emprestimoRepository from "../repository/emprestimoRepository.js";

export async function emprestarLivro(livroId, usuarioId) {
  const livro = await emprestimoRepository.obterLivroPorId(livroId);
    if (!livro) {
      const erro = new Error("Livro não encontrado");
      erro.status = 404;
      throw erro;
    }
    await emprestimoRepository.criarEmprestimo(livroId, usuarioId);
}