'use client'
import { useState } from "react";
import { loginMail } from "@/services/auth";


export function Login() {
  const [user, setUser] = useState<string>('');
  const [senha, setSenha] = useState<string>('');


  async function logar(email: string, senha: string) {
    try {
      const res = await loginMail(email, senha);
      alert('vai pra outra rota')

    } catch (error) {
      // Trate os erros de login aqui
    alert('Erro ao fazer login');
    }
  }

  return (
    <div className="w-full flex justify-center">
      <form className="w-full flex flex-col space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="CPF"
            required
            className="flex-1 px-2 py-1 border border-gray-300 rounded"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="********"
            className="flex-1 px-2 py-1 border border-gray-300 rounded"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={(e) => {
              e.preventDefault();
              logar(user, senha);
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
