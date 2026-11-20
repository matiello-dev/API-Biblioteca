import * as livroRepository from "../repository/livroRepository.js";

export async function obterLivros() {
  return await livroRepository.listarLivros();
}