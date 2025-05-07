import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import periodos from "../data/Periodos.json";


export default function AtividadesEntregues() {
  const navigate = useNavigate();
  const [expandedPeriod, setExpandedPeriod] = useState(null); // novo estado

  const togglePeriod = (id) => {
    setExpandedPeriod(expandedPeriod === id ? null : id);
  };
  
  const irParaDisciplina = (disciplinaId) => {
    navigate(`/matriz_curricular/curso/${disciplinaId}/disciplina`);
  };

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
                  <div key={index} onClick={() => disciplina.id === 17 && irParaDisciplina(17)} className="flex justify-between border-b mb-2 pb-1 border-[#118693]">
                    <div>
                      <p className="text-black">{disciplina.nome}</p>
                      <p className="text-xs text-gray-700">Prof</p>
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
