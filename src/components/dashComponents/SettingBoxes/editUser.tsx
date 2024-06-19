"use client";
import React from "react";
import { PiTextboxBold } from "react-icons/pi";
import { GoNumber } from "react-icons/go";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";


const SettingsUsers = () => {
  return (
    <>
      <div className="">
        <div className="col-span-5 xl:col-span-3 mx-1 ">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3 text-center">
              <h3 className="font-medium text-dark dark:text-white">
                Users Settings
              </h3>
            </div>
            <div className="py-1 px-5">
              <form>

                  {/* Campo de cpf */}
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                  >
                 CPF
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                     {/* tinha um svg aqui */}
                     <GoNumber size={24} />
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="number"
                      placeholder="00000000000"
                   
                    />
                  </div>
                </div>


                {/* campo de nome  */}
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                  >
                 Nome
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                     {/* tinha um svg aqui */}
                     <PiTextboxBold size={24} />
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="text"
                      placeholder="nome do usuário"
                   
                    />
                  </div>
                </div>



                 {/* Campo de email do usuário */}
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="emailAddress"
                  >
                   Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                     {/* tinha um svg aqui */}
                     <MdAlternateEmail size={24} />
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="email"
                      name="emailAddress"
                      id="emailAddress"
                      placeholder="cpf@gmail.com"
                      readOnly
                    />
                  </div>
                </div>


                  {/* Campo de senha  */}
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="emailAddress"
                  >
                   Confirm Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                     {/* tinha um svg aqui */}
                     <RiLockPasswordLine size={24} />
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="Password"
                      name="password"
                      id="password"
                      placeholder="*********"
                     
                    />
                  </div>
                </div>


                {/* Campo de confirmação de senha */}
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="emailAddress"
                  >
                   new Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                     {/* tinha um svg aqui */}
                     <RiLockPasswordLine size={24} />
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="Password"
                      name="password"
                      id="password"
                      placeholder="*********"
                     
                    />
                  </div>
                </div>


                <div className="flex justify-end gap-3">

                    {/* Botão para cancelar */}
                  <button
                    className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button>

                    {/* Botão para alterar o usuario e senha */}
                  <button
                    className="flex justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
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

export default SettingsUsers
