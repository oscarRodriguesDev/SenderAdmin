"use client";
import React from "react";
import { PiTextboxBold } from "react-icons/pi";
import { GoNumber } from "react-icons/go";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const SettingsUsers = () => {
  return (
    <>
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
                      placeholder="cpf@e-mail.com.br"
                      readOnly
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
                    />
                  </div>
                </div>


                {/* Campo de Confirmação de Senha */}
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="confirmPassword"
                  >
                    Confirme sua senha
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <RiLockPasswordLine size={24} />
                    </span>
                    <input
                      className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-12 pr-4 text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500"
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="*********"
                    />
                  </div>
                </div>


                {/* Campo de Empresa */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Empresa
                  </label>
                  <div className="relative">
                    <select className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-8 text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500">
                      <option value="">Dikma</option>
                      <option value="">Caex</option>
                      <option value="">Ecoplus</option>
                      <option value="">Dikmaq</option>
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
                    type="submit"
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
