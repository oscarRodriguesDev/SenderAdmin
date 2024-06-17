'use client'
import { useEffect, useState } from "react";
import { FcViewDetails } from "react-icons/fc";
import { TbFileDislike, TbFileLike } from "react-icons/tb";
import { getAuthStatus, updateData } from "@/app/auth/authEmail";

interface dataProps {
  CPF: string;
  nome: string;
  empresa: string;
  contrato: string;
  url: string;
  ultima_data: string;
  aprove: string;
}

export const fetchData = async (): Promise<dataProps[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/fake`);
  if (!response.ok) {
    throw new Error(`Não foi possível recuperar dados`);
  }

  const data = await response.json();
  const result: dataProps[] = [];

  const sendSesmtData = data.sendSesmtData;
  for (const key in sendSesmtData) {
    if (sendSesmtData.hasOwnProperty(key) && key !== "atestados") {
      const parsedData: dataProps = JSON.parse(sendSesmtData[key]);
      if (parsedData.url !== '') {
        parsedData.CPF = key;
        result.push(parsedData);
      }
    }
  }

  return result;
};


const TableOne = () => {
  const [data, setData] = useState<dataProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [aprovado, setAprovado]=useState<string>()
  

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        const authStatus = await getAuthStatus();
        if (authStatus.loggedIn === true) {
          const fetchedData = await fetchData();
          setData(fetchedData); // Define os dados obtidos do backend no estado local
        } else {
          throw new Error("Usuário não está logado");
        }
      } catch (error) {
        console.log(error);
        setError("Não foi possível carregar os dados");
      } finally {
        setLoading(false); // Finaliza o carregamento, independentemente do resultado
      }
    };
  
    checkAuthAndFetchData(); // Chama a função para buscar os dados no início
  }, []);
  

  const handleButtonClick = async (cpf: string, aprove: string) => {
    try {
      await updateData(cpf, aprove); // Assumindo que updateData é uma função assíncrona

      // Atualiza o estado `data` após a atualização bem-sucedida
      const updatedData = data.map(item => {
        if (item.CPF === cpf) {
          return { ...item, aprove };
        }
        setAprovado(item.aprove)
        return item;
      });
      setData(updatedData);
      console.log(aprove)
      
      alert(`Atestado de ${cpf} ${status ? 'aprovado' : 'reprovado'}`);
    } catch (error) {
      console.log(`Erro ao atualizar dados: ${error}`);
      // Lida com erro de atualização, se necessário
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rounded-[10px] bg-white px-2 pb-2 pt-2 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="bg-slate-50 flex flex-col rounded-lg">
        <div className="grid grid-cols-7 gap-2">
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black">CPF</h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black">Nome</h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black">Empresa</h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black">Contrato</h5>
          </div>
          <div className="px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black">DOC</h5>
          </div>
          <div className="px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black">Data</h5>
          </div>
          <div className="px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black">Status</h5>
          </div>
         
        </div>

        {data.map((item, key) => (
          <div
            className={`grid grid-cols-7 gap-2 ${key === data.length - 1 ? "" : "border-b border-stroke dark:border-dark-3"
              }`}
            key={key}
          >
            <div className="flex items-center gap-3.5 px-2 py-4">
              <div className="flex items-center justify-center px-2 py-4">
                <p className="font-medium dark:text-slate-900">{item.CPF}</p>
              </div>
            </div>
            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark">{item.nome}</p>
            </div>
            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark">{item.empresa}</p>
            </div>
            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark">{item.contrato}</p>
            </div>
            <div className="flex items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark">
                <a href={item.url} target="_blank"><FcViewDetails size={24} /></a>
              </p>
            </div>
            <div className="flex items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark">{item.ultima_data}</p>
            </div>
          
            <div className="flex items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark flex gap-3">
                {/* Botão "Reprovado" */}
                <button
                  id='disapprov'
                  className={`border border-solid border-blue-400 rounded-full p-2 hover:bg-slate-400 ${(item.aprove=='aprovado') ? 'bg-white' : 'bg-amber-200'}`}
                  onClick={() => handleButtonClick(item.CPF, 'reprovado')}>
                  <TbFileDislike size={18} color={'#f93c3c'} />
                </button>

                {/* Botão "Aprovado" */}
                <button
                  id='approv'
                  className={`border border-solid border-blue-400 rounded-full p-2 hover:bg-slate-400 ${(item.aprove=='aprovado') ? 'bg-amber-200' : 'bg-white'}`}
                  onClick={() => handleButtonClick(item.CPF, 'aprovado')}>
                  <TbFileLike size={18} color={'#090'} />
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
