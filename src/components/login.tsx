"use client";
import { useState } from "react";
import { userLogin } from "@/app/(auth)/auth/authEmail";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import imageLogin from "../../public/images/home.png";
import Image from "next/image";

export function Login() {
  const [user, setUser] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const router = useRouter();

  async function logar(cpf: string, senha: string) {
    try {
      const res = await userLogin(cpf, senha);
      if (res) {
        router.push("/all");
        toast.success("seja bem vindo!");
      } else {
        toast.error("Acesso não autorizado!");
      }
    } catch (error) {
      toast.error("Acesso não autorizado!");
    }
  }

  return (
    <div className=" min-h-svh  flex items-center justify-center bg-gradient-to-r0 from-blue-500 to-purple-600 relative">
      <Toaster />
      <Image
        src={imageLogin}
        width={1000}
        height={800}
        alt="Login Image"
        className="fixed top-1 object-cover w-full h-full opacity-65"
      />
      <div className="bg-white bg-opacity-55 pb-2 rounded-t-lg shadow-lg w-full max-w-md z-10">
        <h1 className="w-full bg-sky-900 text-body-2xlg font-bold text-center mb-0 text-white rounded-t-lg ">LOGIN</h1>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            logar(user, senha);
          }}
        >
          <div className="flex flex-col  space-y-4">
            <Image
              src={imageLogin}
              width={600}
              height={400}
              alt="Login Image"
              className="relative top-1 object-cover w-full h-auto "
            />
            <input
              type="text"
              placeholder="CPF"
              required
              className="px-2 py-5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              required
              className="px-4 py-5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button
              type="submit"
              className="w-40 mx-auto py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
