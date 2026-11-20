import pg from "pg";
console.log(process.env.DATABASE_URL)
const pool = new pg.Pool({
connectionString: process.env.DATABASE_URL,
ssl: { rejectUnauthorized: false }, // o Supabase exige conexão segura
});
export default pool;