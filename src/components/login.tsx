'use client'
import { loginMail } from "@/services/auth";

import { redirect } from "next/navigation";



export  function Login() {
 
    async function logar() {
     const res= await loginMail('06230124645','88211663');
   
     
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
          />
          <input
            type="password"
            placeholder="********"
            className="flex-1 px-2 py-1 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => logar()}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
