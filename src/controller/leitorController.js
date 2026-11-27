import * as leitorLogic from "../logic/leitorLogic.js";


export async function listarLeitores(request, response) {
  try {
    const leitores = await leitorLogic.obterLeitores();
    response.json(leitores);
  } catch (error) {
    console.error("Erro ao listar leitores:", error);
    response.status(error.status || 500).json({ error: "Erro ao listar leitores" });
  }
}