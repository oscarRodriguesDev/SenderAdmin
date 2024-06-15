'use client'
import { AtestadosProps } from "@/utils/atestado.type"
import { useContext } from "react"
import { ModalContext } from "../modal/modal"


export function AtestadoCard() {
const {handleModalVisible}=useContext(ModalContext)
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Oscar</h2>
                    <p className="text-gray-600">Caex - Sede</p>
                </div>
                <div className="space-y-2 border-b border-black">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">CPF:</span>
                        <span className="text-gray-600">06230124645</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Nome:</span>
                        <span className="text-gray-600">Oscar</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Empresa:</span>
                        <span className="text-gray-600">Caex</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Contrato:</span>
                        <span className="text-gray-600">Sede</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Data:</span>
                        <span className="text-gray-600">12/6/2024</span>
                    </div>
                </div>

                <div className="mt-6 flex justify-between text-center">
                    <button className="bg-red-400 text-white font-semibold py-2 px-4 rounded hover:bg-red-500"
                    onClick={handleModalVisible}
                         >
                        Fechar
                    </button>
                    <div className="flex flex-col items-center space-x-4">
                        <div className="flex items-center">
                            <input type="radio" id="aprovado" name="status" className="mr-2" />
                            <label htmlFor="aprovado" className="text-black">Aprovado</label>
                        </div>
                        <div className="flex items-center">
                            <input type="radio" id="reprovado" name="status" className="mr-2" />
                            <label htmlFor="reprovado" className="text-black">Reprovado</label>
                        </div>
                    </div>
                    <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                        Ver Atestado
                    </button>
                    <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                        Enviar
                    </button>




                </div>
            </div>
        </div>


    )
}