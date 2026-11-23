import * as livroRepository from "../repository/livroRepository.js";
import {Livro} from "../model/livro.js";

export async function obterLivros() {
  return await livroRepository.listarLivros();
}
export async function obterLivroPorId(id) {
  return await livroRepository.obterLivroPorId(id);
}
export async function criarLivroCompleto(livro, autorIds) {
  const autor = await livroRepository.obterAutorPorId(autorIds[0]);
  if (!autor) {
    const erro = new Error("Autor não encontrado");
    erro.status = 400;
    throw erro;
  }
  const isbnExistente = await livroRepository.obterISBNExistente(livro.isbn);
  if (isbnExistente) {
    const erro = new Error("ISBN já existente");
    erro.status = 400;
    throw erro;
  }
  const livroCriado = new Livro(livro.titulo, livro.isbn, livro.ano, livro.editoraId);
  livroCriado = await livroRepository.criarLivroSemAutor(livroCriado);
  return await livroRepository.criarLivroCompleto(livroCriado, autorIds);
}