import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Send } from "lucide-react";

export default function AtividadesEntregues() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#c7dbdb] px-4 py-2flex flex-col justify-between">
      <div>
        {/* Topo com botão de voltar */}
        <div className="flex items-center py-4 mb-4">
          <button onClick={() => navigate("/atividades/01/entregues")} className="text-gray-600 font-bold me-5">
            <ChevronLeft size={30} />
          </button>
          <h1 className="text-2xl text-gray-900 font-semibold">Atividades entregues</h1>
        </div>

        {/* Cabeçalho da entrega */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center">
            <img
              src="/imagens/perfil_alunos_04.png"
              alt="Lucy"
              className="w-12 h-12 rounded-full me-3"
            />
            <div>
              <p className="text-2xl font-semibold text-gray-900">Lucy</p>
              <p className="text-sm text-gray-500">Entregue em atraso</p>
            </div>
          </div>
          <div>
            <i class="fa-solid fa-ellipsis-vertical text-gray-900 text-lg"></i>
          </div>
        </div>

        {/* Anexos */}
        <div className="mb-5">
          <p className="text-smfont-semibold text-gray-900 mb-1 ps-5">Anexos</p>
          <div className="space-y-3">
            <div className="bg-[#E2FFFE] rounded-xl shadow px-3 py-2 flex items-end justify-between gap-4">
              <img
                src="/imagens/anexos (2).png"
                alt="Anexo A"
                className="w-[165px] h-[75px] rounded"
              />
              <p className="text-gray-800 text-sm">Anexo_Atividade_A.pdf</p>
            </div>
            <div className="bg-[#E2FFFE] rounded-xl shadow px-3 py-2 flex items-end justify-between gap-4">
              <img
                src="/imagens/anexos (1).png"
                alt="Anexo A"
                className="w-[165px] h-[75px] rounded"
              />
              <p className="text-gray-800 text-sm">Anexo_Atividade_B.link</p>
            </div>
          </div>
        </div>

        {/* Comentários particulares */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-900 mb-1 ps-5 ">Comentários particulares</p>
          <div className="px-2 py-5 border-2 rounded-xl border-[#118693] shadow p-4 text-sm text-gray-600 mb-2">
            <p className="text-justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo laboriosam quae veniam nostrum molestias inventore, temporibus amet consequuntur deleniti facilis officiis voluptatibus nemo omnis illo sed ullam. Vel, culpa eligendi?</p>
            <button className="w-full mt-5 text-sm text-gray-600 border-2 rounded-xl border-[#118693] py-0.5 px-3 flex justify-between">
            <p className="text-[#118693]">Responder comentário</p>
            <Send className="mt-0.5 text-[#118693] font-thin" size={18} />
            </button>
          </div>
        </div>

        {/* Atribuir nota */}
        <div className="mb-9 bg-white rounded-xl">
          <div className="bg-[#78CCD5] rounded-t-xl py-1.5 px-3">
            <p className="text-xl font-semibold text-gray-800">Atribuir nota</p>
          </div>
          <div className="py-3 px-3">
            <input
              type="text"
              placeholder="Digite a nota da atividade"
              className="w-full rounded-xl px-4 py-0.5 border border-[#118693] focus:outline-none placeholder:text-sm placeholder:text-[#118693]"
            />
          </div>
        </div>
      </div>

      {/* Botão Salvar */}
      <div>
        <button className="bg-[#1f7c85] text-white w-full py-3 rounded-xl font-semibold text-lg">
          Salvar
        </button>
      </div>
    </div>
  );
}