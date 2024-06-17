"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ClickOutside from "../ClickOutside";
import { TbPointFilled } from "react-icons/tb";
import { LiaEnvelopeOpen } from "react-icons/lia";
import { LiaEnvelopeSolid } from "react-icons/lia";

const notificationList = [
  {
    image: "/images/user/user-15.png",
    title: "Piter Joined the Team!",
    subTitle: "Congratulate him",
  },
];



const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [listaNotif, setListaNotif] = useState<{ title: string }[]>([]);
  const [count,setCount]=useState<number>(0)
  const [value,setValue] = useState<string>('')



  const getNotifications = async (): Promise<{ title: string }[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/atestados`);
    if (!response.ok) {
      throw new Error(`Não foi possível recuperar dados`);
    }
  
    const data = await response.json();
    const result: { title: string }[] = [];
  
    const sendSesmtData = data.sendSesmtData;
    const atestados = JSON.parse(sendSesmtData.atestados);
  
    if (!atestados || !Array.isArray(atestados)) {
      throw new Error("Formato de atestados inválido");
    }
  
    for (const cpf of atestados) {
      if (sendSesmtData.hasOwnProperty(cpf)) {
        const parsedData = JSON.parse(sendSesmtData[cpf]);
        if (parsedData.url !== "") {
          result.push({ title: `${cpf} enviou um atestado` });
         
          
        }
      }
    }
  
    return result;
  };





  useEffect(() => {
    async function getNotificationList() {
        try {
            const notifications = await getNotifications();
            setListaNotif(notifications);
            setCount(notifications.length);
            localStorage.setItem("alertas", String(notifications.length));  // Correção: Use String(notifications.length)
        } catch (error) {
            console.error("Erro ao buscar notificações:", error);
        }
    }

    getNotificationList();
}, []);

useEffect(() => {


  

})






  return (
    <ClickOutside
      onClick={() => setDropdownOpen(false)}
      className="relative hidden sm:block"
    >
      <li>
        <Link
          onClick={() => {
           setValue(String(count))
            setDropdownOpen(!dropdownOpen);
          }}
          href="#"
          className="relative flex h-12 w-12 items-center justify-center rounded-full border border-stroke bg-gray-2 text-dark hover:text-primary dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:hover:text-white"
        >
          <span className="relative">
     
        
            <LiaEnvelopeSolid size={24}/>
            
              
            <span
              className={`absolute -top-0.5 right-0 z-1 h-2.5 w-2.5 rounded-full border-2 border-gray-2 bg-red-light dark:border-dark-3 ${
                !notifying ? "hidden" : "inline"
              }`}
            >
              <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-light opacity-75"></span>
            </span>
          </span>
        </Link>



        {dropdownOpen && (
          <div
            className={`absolute -right-27 mt-7.5 flex h-[550px] w-75 flex-col rounded-xl border-[0.5px] border-stroke bg-white px-5.5 pb-5.5 pt-5 shadow-default dark:border-dark-3 dark:bg-gray-dark sm:right-0 sm:w-[364px]`}
          >
            <div className="mb-5 flex items-center justify-between">
              <h5 className="text-lg font-medium text-dark dark:text-white">
                Alertas
              </h5>
              <span className="rounded-md bg-primary px-2 py-0.5 text-body-xs font-medium text-white">
                {count} novos alertas
              </span>
            </div>

            <ul className="no-scrollbar mb-5 flex h-auto flex-col gap-1 overflow-y-auto">
              {listaNotif.map((item, index) => (
                <li key={index}>
                  <div
                    className="flex items-center gap-4 rounded-[10px] p-2.5 hover:bg-gray-2 dark:hover:bg-dark-3"
                 
                  >
                    <span className="block h-14 w-14 rounded-full">

                    <TbPointFilled size={24} color={'#0d5109'}/>
                    
                    </span>

                    <span className="block">
                      <span className="block font-medium text-sm text-dark dark:text-white ">
                        {item.title}
                      </span>
                   
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              className="flex items-center justify-center rounded-[7px] border border-primary p-2.5 font-medium text-primary hover:bg-blue-light-5 dark:border-dark-4 dark:text-dark-6 dark:hover:border-primary dark:hover:bg-blue-light-3 dark:hover:text-primary"
              href="#"
            >
             Marcar todas como Lidas
            </Link>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;
