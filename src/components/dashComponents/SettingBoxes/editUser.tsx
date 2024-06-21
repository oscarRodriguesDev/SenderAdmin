"use client";
import React from "react";
import { PiTextboxBold } from "react-icons/pi";
import { GoNumber } from "react-icons/go";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Toaster, toast } from "sonner";
import { useState, ChangeEvent, useRef } from "react";


const SettingsUsers = () => {
  const [cpf, setCpf] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')
  const [confirm, setConfirm] = useState<string>('')
  const [nome, setNome] = useState<string>('')
  const [empresa, setEmpresa] = useState<string>('')
  const [contrato, setContrato] = useState<string>('')
  const [textColor, setTextColor] = useState<string>('text-black'); // Estado para a cor do texto
  const confirmRef = useRef<HTMLInputElement>(null);



async function handleSubmit() {
  try{

    if (!cpf || !email || !senha || !nome || !empresa || !contrato) {
     toast.error('campos vazios')
    } 
  }catch(err){
    toast.error('impossivel salvar vazio' + err)
  }

  const data = {
    cpf: cpf,
    email: email,
    senha: senha,
    nome: nome,
    empresa: empresa,
    contrato: contrato,
  };

  try {
    const response = await fetch('/api/atestados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
    toast.success('cadastro realizado com sucesso');
    }
    const result = await response.json();
    console.log(result);

  
  } catch (error) {
    toast.error("Erro ao cadastrar: " + error);

  }
}





  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(e.target.value);
  };

  const handleConfirmBlur = () => {
    if (senha !== confirm) {
      toast.error("Senhas não conferem");
      setConfirm('');
      setTextColor('text-red-500');
    } else {
      setTextColor('text-black');
    }
  };


  function handleCPF(e: React.ChangeEvent<HTMLInputElement>){
    setCpf(e.target.value.replace(/\D+/g, ''));
    setEmail(`${cpf}@sender.com.br`)

  }




  return (
    <>
      <Toaster />
      <div className="container mx-auto px-4">
        <div className="w-full lg:w-2/3 mx-auto">
          <div className="rounded-xl border border-gray-300 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-300 px-7 py-4 text-center dark:border-gray-700">
              <h3 className="font-medium text-gray-800 dark:text-white">
                User Settings
              </h3>
            </div>
            <div className="py-5 px-6">
              <form>
                {/* Campo de CPF */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    CPF
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <GoNumber size={24} />
                    </span>
                    <input
                      className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-12 pr-4 text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500"
                      type="number"
                      placeholder="00000000000"
                      value={cpf}
                      onChange={(e) => handleCPF(e)}
                    />
                  </div>
                </div>

                {/* Campo de Nome */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nome
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <PiTextboxBold size={24} />
                    </span>
                    <input
                      className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-12 pr-4 text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500"
                      type="text"
                      placeholder="Nome do usuário"
                      value={nome}
                      onChange={(e) => { setNome(e.target.value) }}
                    />
                  </div>
                </div>

                {/* Campo de Email */}
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="emailAddress"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <MdAlternateEmail size={24} />
                    </span>
                    <input
                      className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-12 pr-4 text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500"
                      type="email"
                      name="emailAddress"
                      id="emailAddress"
                      placeholder="cpf@sender,com.br"
                      value={email}
                    
                     
                    />
                  </div>
                </div>


                {/* Campo de Senha */}
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="password"
                  >
                    Escolha uma senha forte
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <RiLockPasswordLine size={24} />
                    </span>
                    <input
                      className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-12 pr-4 text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="*********"
                      value={senha}
                      onChange={(e) => { setSenha(e.target.value) }}
                    />
                  </div>
                </div>


                {/* Campo de Confirmação de Senha */}
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-medium   text-gray-700 dark:text-gray-300"
                    htmlFor="confirmPassword"
                  >
                    Confirme sua senha
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <RiLockPasswordLine size={24} />
                    </span>
                    <input
                      className="w-full rounded-lg border border-gray-300 bg-white  py-2.5 pl-12 pr-4 text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500"
                      type="password"
                      value={confirm}
                      onChange={handleConfirmChange}
                      onBlur={handleConfirmBlur}
                    />

                  </div>
                </div>


                {/* Campo de Empresa */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Empresa
                  </label>
                  <div className="relative">
                    <select
                      className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-8 text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                    >
                      <option value="Dikma">Dikma</option>
                      <option value="Caex">Caex</option>
                      <option value="Ecoplus">Ecoplus</option>
                      <option value="Dikmaq">Dikmaq</option>
                    </select>
                  </div>
                </div>


                {/* informe do nome do contrato */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Contrato
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <PiTextboxBold size={24} />
                    </span>
                    <input
                      className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-12 pr-4 text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500"
                      type="text"
                      placeholder="Digite o nome do contrato"
                      value={contrato}
                      onChange={(e) => setContrato(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  {/* Botão para cancelar */}
                  <button
                    className="flex justify-center rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-800 hover:shadow-md dark:border-gray-700 dark:text-white"
                    type="button"
                  >
                    Cancel
                  </button>

                  {/* Botão para salvar */}
                  <button
                    className="flex justify-center rounded-lg bg-blue-500 px-6 py-2 font-medium text-white hover:bg-blue-600"
                    type="button"
                    onClick={(e) => { handleSubmit() }}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsUsers;
