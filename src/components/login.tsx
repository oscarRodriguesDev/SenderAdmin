'use client'
import { useState } from "react";
import { userLogin } from "@/app/auth/authEmail";
import { useRouter } from "next/navigation";



export function Login() {
  const [user, setUser] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const router = useRouter();

  async function logar(cpf: string, senha: string) {
    try {
      const res = await userLogin(cpf, senha);
      if (res) {
        router.push('/dashboards/aplication');
      } else {
     alert('Acesso não autorizado!')
      }
    } catch (error) {
      alert('Acesso não autorizado!')
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
            className="flex-1 px-2 py-0.5 border border-gray-300 rounded text-xs"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="********"
            className="flex-1 px-2 py-0.5 border border-gray-300 rounded text-xs"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button
            type="submit"
            className="px-2 py-0.5 bg-blue-500 text-white rounded hover:bg-blue-600"
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
