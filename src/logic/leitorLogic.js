import * as leitorRepository from "../repository/leitorRepository.js";
import { Leitor } from "../model/leitores.js";

export async function obterLeitores() {
  return await leitorRepository.listarLeitor();
}