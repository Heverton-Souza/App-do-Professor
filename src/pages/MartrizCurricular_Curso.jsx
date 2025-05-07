import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";

export default function AtividadesEntregues() {
  const navigate = useNavigate();
  const [expandedPeriod, setExpandedPeriod] = useState(null); // novo estado

  const togglePeriod = (id) => {
    setExpandedPeriod(expandedPeriod === id ? null : id);
  };

  const periodos = [
    {
      id: 1,
      nome: "1° Período - Núcleo básico 1",
      cor: "#E2FFFE",
      carga_horaria: "500",
      requisitos: "Nenhum",
      disciplinas: [
        "Criatividade", "Desenhos", "História da Arte", "História do Design", "Oficina da Cor", "Plástica 1", "Produção e Interpretação de Textos", "Representações Técnicas", "Teoria da Percepção e Semiótica"
      ]
    },
    {
      id: 2,
      nome: "2° Período - Núcleo básico 2",
      cor: "#E2FFFE",
      carga_horaria: "500",
      requisitos: "Plástica I",
      disciplinas: [
        "Computação Gráfica", "Ergonomia", "Liguagem Fotográfica e Cinematográfica", "Metodologia de Projetos", "Oficina da Forma", "Oficina de Portfólio", "Teoria da Comunicação e Informação", "Teoria da Comunicação e Informação"
      ]
    },
    {
      id: 3,
      nome: "3° Período",
      cor: "#60C1CC",
      carga_horaria: "460",
      requisitos: "Núcleo básico",
      disciplinas: []
    },
    {
      id: 2,
      nome: "3° Período",
      cor: "#60C1CC",
      carga_horaria: "460",
      requisitos: "Núcleo básico",
      disciplinas: []
    },
    {
      id: 3,
      nome: "4° Período",
      cor: "#60C1CC",
      carga_horaria: "380",
      requisitos: "Núcleo básico",
      disciplinas: []
    },
    {
      id: 4,
      nome: "5° Período",
      cor: "#60C1CC",
      carga_horaria: "340",
      requisitos: "Núcleo básico",
      disciplinas: []
    },
    {
      id: 5,
      nome: "6° Período",
      cor: "#60C1CC",
      carga_horaria: "340",
      requisitos: "Núcleo básico",
      disciplinas: []
    },
    {
      id: 6,
      nome: "7° Período",
      cor: "#60C1CC",
      carga_horaria: "340",
      requisitos: "Núcleo básico",
      disciplinas: []
    },
    {
      id: 7,
      nome: "8° Período - Conclusão do curso 2",
      cor: "#118693",
      carga_horaria: "480",
      requisitos: "Todas as disciplinas anteriores e complementares",
      disciplinas: []
    },
  ];

  return (
    <div>
      <div className="flex justify-start py-4 px-2 mb-4">
        <button onClick={() => navigate("/matriz_curricular")} className="text-gray-600 font-bold me-5 flex content-top">
          <ChevronLeft size={30} />
        </button>
        <div>
          <h1 className="text-2xl text-gray-900 font-semibold">Matriz curricular</h1>
        </div>
      </div>

      <div className="mb-7 mx-4 text-lg font-medium">
        <h2>Bacharelado em Design Gráfico</h2>
      </div>

      {/* Cards de Períodos */}
      <div className="flex flex-col gap-4 mx-3">
        {periodos.map((periodo) => (
          <div key={periodo.id} style={{ backgroundColor: periodo.cor }} className="rounded-[16px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] px-4 py-3 ">
            <div
              onClick={() => togglePeriod(periodo.id)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div>
                <p className="font-medium">{periodo.nome}</p>
                <p className={`text-sm ${periodo.cor !== "#E2FFFE" ? "text-white" : "text-gray-500"}`}>
                  CH: {periodo.carga_horaria}h; Requisitos: {periodo.requisitos}
                </p>
              </div>
              <div className="content-center text-gray-800 ms-2">
                {expandedPeriod === periodo.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </div>

            {/* Disciplinas */}
            {expandedPeriod === periodo.id && periodo.disciplinas.length > 0 && (
              <div className="rounded-lg mb-2 mc-curso-disciplinas mt-4">
                {periodo.disciplinas.map((disciplina, index) => (
                  <div key={index} className="flex justify-between border-b mb-2 pb-1 border-[#118693]">
                    <div>
                      <p className="text-gray-800">{disciplina}</p>
                      <p className="text-xs text-gray-500">Prof</p>
                    </div>
                    <div>
                      <ChevronRight size={18}/>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
