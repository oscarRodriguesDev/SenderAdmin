'use client'
import { useEffect, useState } from "react";
import { ImFilePicture } from "react-icons/im";
import { AuthStatus, getAuthStatus } from "@/app/auth/authEmail";

interface dataProps {
  CPF: string;
  nome: string;
  empresa: string;
  contrato: string;
  url: string;
  ultima_data: string;
}

export const fetchData = async (): Promise<dataProps[]> => {
 console.log(getAuthStatus())
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/atestados`);//http://localhost:3000/api/fake

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  const result: dataProps[] = [];

  // Parse sendSesmtData
  const sendSesmtData = data.sendSesmtData;
  for (const key in sendSesmtData) {
    if (sendSesmtData.hasOwnProperty(key) && key !== "atestados") {
      const parsedData: dataProps = JSON.parse(sendSesmtData[key]);
      parsedData.CPF = key; // Adiciona o CPF ao objeto parseado
      result.push(parsedData);
    }
  }

  return result;
};


const TableOne = () => {
  const [data, setData] = useState<dataProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData()
      .then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
    {/*   <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Atestados
      </h4> */}
      
      <div className="bg-slate-50 flex flex-col rounded-lg">
        <div className="grid grid-cols-6 gap-4">
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base  text-black">CPF</h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base  text-black">Nome</h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base  text-black">Empresa</h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base  text-black">Contrato</h5>
          </div>
          <div className="px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base  text-black">DOC</h5>
          </div>
          <div className="px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base  text-black">Data</h5>
          </div>
        </div>

        {data.map((item, key) => (
          <div
            className={`grid grid-cols-6 gap-4 ${
              key === data.length - 1
                ? ""
                : "border-b border-stroke dark:border-dark-3"
            }`}
            key={key}
          >
            
            <div className="flex items-center gap-3.5 px-2 py-4">
            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium  dark:text-slate-900">{item.CPF}</p>
            </div>
            </div>
            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark">{item.nome}</p>
            </div>
            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark ">{item.empresa}</p>
            </div>
            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark">{item.contrato}</p>
            </div>
            <div className="flex items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark">
                <a href={item.url} target='_blank'><ImFilePicture size={24}/></a>
              </p>
            </div>
            <div className="flex items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark ">
                  {item.ultima_data}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
