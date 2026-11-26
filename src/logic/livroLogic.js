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



export async function alterarLivro(id,dados) {

  const livro = await livroRepository.obterLivroPorId(id);
  if (!livro) {
    const erro = new Error("Livro não encontrado");
    erro.status = 404;
    throw erro;
  }
  await livroRepository.alterarLivro(id, dados);
}

export async function deletarLivro(id) {
  const livro = await livroRepository.obterLivroPorId(id);
  if (!livro) {
    const erro = new Error("Livro não encontrado");
    erro.status = 404;
    throw erro;
  }
  await livroRepository.deletarLivro(id);
}
export async function obterExemplaresLivro(id){
  console.log("chegou logic")
  return await livroRepository.obterExemplaresLivros(id)
}