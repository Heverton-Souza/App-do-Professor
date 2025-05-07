import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";

export default function AtividadesEntregues() {
  const navigate = useNavigate();
  const [expandedPeriod, setExpandedPeriod] = useState(null); // novo estado

  const togglePeriod = (id) => {
    setExpandedPeriod(expandedPeriod === id ? null : id);
  };

  return (
    <div>
      <div className="flex justify-start py-4 px-2 mb-4">
        <button onClick={() => navigate("/matriz_curricular/1/curso")} className="text-gray-600 font-bold me-5 flex content-top">
          <ChevronLeft size={30} />
        </button>
        <div>
          <h1 className="text-2xl text-gray-900 font-normal me-3">Projeto IV - Interfaces Digitais e Hipermídeas</h1>
        </div>
      </div>

      <div className="flex flex-col gap-4 mx-3">
        <div className="rounded-lg mb-2 mt-4 px-5 py-2 bg-[#60C1CC] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] ">
          <div className="flex justify-between border-b mb-2 pb-1 border-[#118693]">
              <p className="text-black font-semibold">Identificação do componente curricular</p>
          </div>
          <div className="flex justify-between border-b mb-2 pb-1 border-[#118693]">
            <p className="text-[#118693]">Componente curricular</p>
            <p className="text-[#118693]">UX/UI</p>
          </div>
          <div className="flex justify-between border-b mb-2 pb-1 border-[#118693]">
            <p className="text-black">Carga horária total</p>
            <p className="text-black">96h, 80h/a</p>
          </div>
          <div className="flex justify-between border-b mb-2 pb-1 border-[#118693]">
            <p className="text-black">Carga horária/Aula Semanal</p>
            <p className="text-black">4,8h, 4h/a</p>
          </div>
          <div className="flex justify-between mb-4 pb-1">
            <p className="text-black">Professor</p>
            <p className="text-[#118693]">Julio Cezar Negri Ramos</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mx-3">
        <div className="rounded-lg mb-2 mt-4 px-5 py-3 bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] ">
          <div className="border-b mb-2 pb-1 border-[#118693]">
            <p className="text-black font-semibold mb-2">Ementa</p>
            <p className="text-gray-500 text-sm text-justify pb-3">Introduzir o estudante aos aspectos visuais e comunicativos dos produtos gráficos do Design Gráfico, a saber: Tipográfico; estudo sobre geração de rascunhos, demanda de briefings e formas de finalização sem uso dos aplicativos computacionais; desenvolvimento do conceito, da representação e da forma de defesa de apresentação ; conhecimento de Computação Gráfica, Cores e Formas, Planejamento Visual; compreender o ambiente Web e suas peculiaridades; interfaces web e aplicativos, UI (Design de Interação) e UX (Design de Experiência), prototipagem. </p>
          </div>
          <div className="border-b mb-2 pb-1 border-[#118693]">
            <p className="text-black font-semibold mb-2">Objetivos</p>
            <ul className="text-gray-500 text-sm pb-3 list-disc list-inside">
              <li>Promover o entendimento aos alunos para compreensão dos aspectos visuais e comunicativos das interfaces gráficas, incluindo questões ligadas à cores, formas, tipografias</li>
              <li>Conhecer as etapas de desenvolvimento de um projeto de UX/UI na sua totalidade</li>
              <li>Introduzir conceitos de computação gráfica tais como geração de imagens e padronização dos elementos.</li>
            </ul>
          </div>
          <div className="border-b mb-2 pb-1 border-[#118693]">
            <p className="text-black font-semibold mb-2">Conteúdo</p>
            <ul className="text-gray-500 text-sm pb-3 list-disc list-inside">
              <li><span className="font-semibold">Interfaces Digitais e Hipermídias:</span><br/>- O ambiente web, desktop e mobile;<br/>- Navegadores de internet;</li><br/>
              <li><span className="font-semibold">Tecnologia Digital:</span><br/>- Formatos de arquivo para o ambiente web;<br/>- Layouts para desktop, mobile e fluidos (responsivos);</li><br/>
              <li><span className="font-semibold">Ergonomia e Usabilidade:</span><br/>Planejamento e desenvolvimento de interfaces gráficas para o ambiente web:<br/>- Aplicações e funcionalidades básicas;</li>
            </ul>
          </div>
          <div className="border-b mb-2 pb-1 border-[#118693]">
            <p className="text-black font-semibold mb-2">Bibliografia:</p>
            <p className="text-gray-500 text-sm text-justify pb-3">LOWDERMILK, Travis. Design Centrado no Usuário. 1. ed. São Paulo: Novatec, 2013.

ROGERS, Yvonne; SHARP, Helen; PREECE, Jenny. Design de Interação: Além da Interação Humano-Computador. 3. ed. São Paulo: Bookman,2013.

MORAES, Anamaria de; SANTA ROSA, José Guilherme. Avaliação e Projetono Design de Interfaces. 2. ED. São Palo: Editora 2AB,2012.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
