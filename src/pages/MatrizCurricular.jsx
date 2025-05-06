import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, Menu } from "lucide-react";

export default function AtividadesEntregues() {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(false);
  const [showReminder, setShowReminder] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  
    // Função para navegação
    const irParaCurso = (cursoId) => {
      navigate(`/matriz_curricular/${cursoId}/curso`);
    };
  

  const cursos = [
    {
      id: 1,
      nome: "Bacharelado em Design Gráfico",
      periodo: "2021/2",
      num_periodos: "8 períodos",
    },
    {
      id: 2,
      nome: "Engenharia Mecânica",
      periodo: "2021/2",
      num_periodos: "8 períodos",
    },
  ];


  return (
    <div>
      <div className="flex justify-start py-4 px-2 mb-9">
        <button onClick={() => navigate("/")} className="text-gray-600 font-bold me-5 flex content-top">
          <ChevronLeft size={30} />
        </button>
        <div>
          <h1 className="text-2xl text-gray-900 font-semibold">Matriz Curricular</h1>
        </div>
      </div>

      <div className="mb-3 mt-5 mx-3 relative">
          <input
            type="text"
            placeholder="Pesquise por disciplina ou aluno"
            className="w-full h-[40px] rounded-full pl-4 pr-10 py-2 border border-gray-300 focus:outline-none bg-[#ebfcfb] focus:border-[#118693] focus:placeholder:text-[#118693] transition-colors duration-200"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <Search
            className={`absolute top-2.5 right-3 transition-colors duration-200 ${focused ? "text-[#118693]" : "text-gray-600"}`}
            size={18}
          />
      </div>

      <div className="flex gap-3 mb-6 mx-3 justify-center">
        <button className=" text-black text-xs px-3 py-0.5 rounded-full border border-black">
          Curso<i className="fa-solid fa-chevron-down text-[10px] ms-5"></i>
        </button>
        <button className="text-black text-xs px-3 py-0.5 rounded-full border border-black">
          Período<i className="fa-solid fa-chevron-down text-[10px] ms-5"></i>
        </button>
        <button className="text-black text-xs px-3 py-0.5 rounded-full border border-black">
          Disciplina<i className="fa-solid fa-chevron-down text-[10px] ms-4"></i>
        </button>
        <button className="text-black text-xs px-3 py-0.5 rounded-full border border-black">
          CH<i className="fa-solid fa-chevron-down text-[10px] ms-3"></i>
        </button>
      </div>


      {/* Exibição das Atividades (Cards) */}
      <div className="flex flex-col gap-3 mx-3">
      {cursos.map((curso) => (
        <div key={curso.id} onClick={() => irParaCurso(curso.id)} className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <p className="font-medium">{curso.nome}</p>
              <p className="text-sm text-gray-500">
                {curso.periodo}; {curso.num_periodos}
              </p>
            </div>
          </div>
          <div className="content-center text-gray-800">
            <ChevronRight size={24} />
          </div>
        </div>
      ))}

      </div>
    </div>
  );
}



const getEntregaClass = (entrega) => {
  switch (entrega) {
    case "Entregue":
      return "text-gray-500";
    case "Entregue em atraso":
      return "text-blue-500";
    case "Pendente":
      return "text-red-500";
    default:
      return "text-gray-500"; // fallback
  }
};
