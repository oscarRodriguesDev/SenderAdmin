
import { Container } from "@/components/Container";
import { FaGooglePlay } from "react-icons/fa";

export const Hero = () => {
  return (
    <>
      <Container className="w-full max-w-[1900px] w- mx-auto bg-center bg-cover bg-[url('../../public/img/hero.png')] relative top-20 block">
        <div className="flex flex-col items-center w-full lg:w-1/2 ">
          <div className="max-w-2xl mb-8">
            <h1 className=" text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-gray-900">
              A ponte perfeita entre o RH e os colaboradores, tudo em um só
              lugar.
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-700">
              Em um ambiente corporativo dinâmico, a comunicação eficaz entre os
              colaboradores e o departamento de Recursos Humanos é essencial
              para o sucesso organizacional. Nossa plataforma oferece uma
              solução inovadora, permitindo que os colaboradores se conectem
              facilmente com o RH, agilizando processos, enviando atestados
              médicos e fazendo solicitações de forma simples e rápida
            </p>
          </div>

          <a href="https://play.google.com/" target='blank'>

          <div className=" flex gap-3 items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row bg-green-800 pb-2 pt-2 pl-4 pr-4 br rounded">
            Baixar
            <FaGooglePlay size={24} color="#fff" />
          </div>
          </a>

        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2"></div>
      </Container>
     
    </>
  );
};


