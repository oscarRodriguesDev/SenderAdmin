"use client";
import React from "react";
import Image from "next/image";
import { MdContactEmergency,MdFormatListBulletedAdd  } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { FaBookMedical } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";





const EmissionCertifield = () => {
  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
               PREENCHA OS CAMPOS PARA EMISSÃO DO ATESTADO
              </h3>
            </div>
            <div className="p-7">
              <form>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="emailAddress"
                  >
                 Nome do Paciente
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                    <MdContactEmergency size={24}/>
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="text"
                      id="name"
                      placeholder="Paciente da Silva"                   
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="Username"
                  >
                   CID
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                    <MdFormatListBulletedAdd size={24}/>
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="Username"
                      id="Username"
                      placeholder="CID0000"
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="Username"
                  >
                   data de inicio
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                    <BsCalendarDate size={24}/>
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="date"
                      name="Username"
                      id="iniiDate"
                      placeholder="00/00/00"
                     
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="Username"
                  >
                   Data Fim
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                    <BsCalendarDate size={24}/>
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="date"
                      id="fimDate"
                      placeholder="00/00/00"
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="Username"
                  >
                Motivo do afastamento
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                    <FaBookMedical size={24}/>
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="text"
                      placeholder="Gripe"
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="Username"
                  >
                   Nome do Medico(a)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                    <FaUserDoctor size={24}/>
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="text"
                      placeholder="Dr Yara"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button>
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
        <div className="col-span-5 xl:col-span-2">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Pre Visualização
              </h3>
            </div>
            <div className="p-7">
              <form>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full">
                    <>
                      <Image
                        src="/images/user/user-03.png"
                        width={55}
                        height={55}
                        alt="User"
                        className="overflow-hidden rounded-full"
                      />
                    </>
                  </div>
                  <div>
                    <span className="mb-1.5 font-medium text-dark dark:text-white">
                      Edit your photo
                    </span>
                    <span className="flex gap-3">
                      <button className="text-body-sm hover:text-red">
                        Delete
                      </button>
                      <button className="text-body-sm hover:text-primary">
                        Update
                      </button>
                    </span>
                  </div>
                </div>

                <div
                  id="FileUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded-xl border border-dashed border-gray-4 bg-gray-2 px-4 py-4 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary sm:py-7.5"
                >
                  <input
                    type="file"
                    name="profilePhoto"
                    id="profilePhoto"
                    accept="image/png, image/jpg, image/jpeg"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  />
                  <div className="flex flex-col items-center justify-center">
                    <span className="flex h-13.5 w-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.4613 2.07827C10.3429 1.94876 10.1755 1.875 10 1.875C9.82453 1.875 9.65714 1.94876 9.53873 2.07827L6.2054 5.7241C5.97248 5.97885 5.99019 6.37419 6.24494 6.6071C6.49969 6.84002 6.89502 6.82232 7.12794 6.56756L9.375 4.10984V13.3333C9.375 13.6785 9.65482 13.9583 10 13.9583C10.3452 13.9583 10.625 13.6785 10.625 13.3333V4.10984L12.8721 6.56756C13.105 6.82232 13.5003 6.84002 13.7551 6.6071C14.0098 6.37419 14.0275 5.97885 13.7946 5.7241L10.4613 2.07827Z"
                          fill="#5750F1"
                        />
                        <path
                          d="M3.125 12.5C3.125 12.1548 2.84518 11.875 2.5 11.875C2.15482 11.875 1.875 12.1548 1.875 12.5V12.5457C1.87498 13.6854 1.87497 14.604 1.9721 15.3265C2.07295 16.0765 2.2887 16.7081 2.79029 17.2097C3.29189 17.7113 3.92345 17.9271 4.67354 18.0279C5.39602 18.125 6.31462 18.125 7.45428 18.125H12.5457C13.6854 18.125 14.604 18.125 15.3265 18.0279C16.0766 17.9271 16.7081 17.7113 17.2097 17.2097C17.7113 16.7081 17.9271 16.0765 18.0279 15.3265C18.125 14.604 18.125 13.6854 18.125 12.5457V12.5C18.125 12.1548 17.8452 11.875 17.5 11.875C17.1548 11.875 16.875 12.1548 16.875 12.5C16.875 13.6962 16.8737 14.5304 16.789 15.1599C16.7068 15.7714 16.5565 16.0952 16.3258 16.3258C16.0952 16.5565 15.7714 16.7068 15.1599 16.789C14.5304 16.8737 13.6962 16.875 12.5 16.875H7.5C6.30382 16.875 5.46956 16.8737 4.8401 16.789C4.22862 16.7068 3.90481 16.5565 3.67418 16.3258C3.44354 16.0952 3.29317 15.7714 3.21096 15.1599C3.12633 14.5304 3.125 13.6962 3.125 12.5Z"
                          fill="#5750F1"
                        />
                      </svg>
                    </span>
                    <p className="mt-2.5 text-body-sm font-medium">
                      <span className="text-primary">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="mt-1 text-body-xs">
                      SVG, PNG, JPG or GIF (max, 800 X 800px)
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex items-center justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
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

export default EmissionCertifield;
