"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { jsPDF } from "jspdf";
import { MdContactEmergency, MdFormatListBulletedAdd } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { FaBookMedical } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

interface FormData {
  name: string;
  cid: string;
  startDate: string;
  endDate: string;
  reason: string;
  doctor: string;
}

const EmissionCertifield: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    cid: "",
    startDate: "",
    endDate: "",
    reason: "",
    doctor: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };



  /* fuynção para emitir atestados */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const doc = new jsPDF();
  
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginX = 20;
    const marginY = 20;
  
    const centeredText = (text: string, y: number) => {
      const textWidth = doc.getTextWidth(text);
      const x = (pageWidth - textWidth) / 2;
      doc.text(text, x, y);
    };
  
    // Cabeçalho
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    centeredText("Atestado Médico", marginY);
  
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
  
    // Texto do atestado
    const atestadoText = `Atesto para os devidos fins que o Sr ${formData.name} esteve sob meus cuidados apresentando os seguintes sintomas: ${formData.reason}, por esse motivo necessita de ${calculateDays(formData.startDate,formData.endDate)} dias a contar de ${formData.startDate} `;
  
    const splitText = doc.splitTextToSize(atestadoText, pageWidth - marginX * 2);
    doc.text(splitText, marginX, marginY + 20);
  
    // Assinatura do médico
    doc.setFont("helvetica", "normal");
    doc.text(`Dr(a). ${formData.doctor}`, marginX, pageHeight - marginY - 40);
    doc.text("CRM 000000", marginX, pageHeight - marginY - 30);
  
    // Rodapé
    doc.setFont("helvetica", "bold");
    doc.setFont("helvetica", "normal");
   
    doc.save("atestado.pdf");
  };
  
  //calcula a quantidade de dias de atestado do paciente
  function calculateDays(data1: string, data2: string): number {
    // Convertendo as strings em objetos Date
    const date1 = new Date(data1);
    const date2 = new Date(data2);

    // Calculando a diferença em milissegundos
    const diffTime = Math.abs(date2.getTime() - date1.getTime());

    // Convertendo a diferença de milissegundos para dias
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}






  return (
    <>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                PREENCHA OS CAMPOS PARA EMISSÃO DO ATESTADO
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleSubmit}>
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="name"
                  >
                    Nome do Paciente
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                      <MdContactEmergency size={24} />
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="text"
                      id="name"
                      placeholder="Paciente da Silva"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="cid"
                  >
                    CID
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                      <MdFormatListBulletedAdd size={24} />
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="text"
                      id="cid"
                      placeholder="CID0000"
                      value={formData.cid}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="startDate"
                  >
                    Data de Início
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                      <BsCalendarDate size={24} />
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="date"
                      id="startDate"
                      placeholder="00/00/00"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="endDate"
                  >
                    Data Fim
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                      <BsCalendarDate size={24} />
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="date"
                      id="endDate"
                      placeholder="00/00/00"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="reason"
                  >
                    Motivo do Afastamento
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                      <FaBookMedical size={24} />
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="text"
                      id="reason"
                      placeholder="Gripe"
                      value={formData.reason}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="doctor"
                  >
                    Nome do Médico(a)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                      <FaUserDoctor size={24} />
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="text"
                      id="doctor"
                      placeholder="Dr Yara"
                      value={formData.doctor}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                    type="button"
                  >
                    Cancelar
                  </button>
                  <button
                    className="flex justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                    type="submit"
                  >
                    Emitir Atestado
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
