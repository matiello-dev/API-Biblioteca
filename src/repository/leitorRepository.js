import pool from "../database/conexao.js";

export async function listarLeitor() {
  const { rows } = await pool.query( `
    SELECT
      id,
      nome,
      cpf,
      email,
      telefone,
      ativo
    FROM leitores
    ORDER BY nome`
  );
  return rows;
}
