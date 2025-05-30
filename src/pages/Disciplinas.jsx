import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, Menu } from "lucide-react";
import ModalFiltroHome from "../components/ModalFiltroHome";

export default function AtividadesEntregues() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("atividades");
  const [focused, setFocused] = useState(false);
  const [showReminder, setShowReminder] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showModalFiltro, setShowModalFiltro] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  const irParaEntregas = (atividadeId) => {
    navigate(`/atividades/${atividadeId}/entregues`);
  };
  

  const abrirFiltro = (categoria) => {
    setCategoriaFiltro(categoria);
    setShowModalFiltro(true);
  };

  const [filtrosAtivos, setFiltrosAtivos] = useState({
    disciplinas: "",
    alunos: "",
    status: "",
  });
  const aplicarFiltro = (categoria, valor) => {
    setFiltrosAtivos((prev) => ({
      ...prev,
      [categoria]: valor,
    }));
    setShowModalFiltro(false);
  };
  

  const atividades = [
    {
      id: 1,
      nome: "Projeto IV – Interface...",
      periodo: "2024/2",
      entregas: "3 entregues",
      imagem: "/imagens/icons_home_01.png"
    },
    {
      id: 2,
      nome: "Design e sustentabilidade",
      periodo: "2024/2",
      entregas: "nenhuma entregue",
      imagem: "/imagens/icons_home_02.png"
    },
    {
      id: 3,
      nome: "Computação gráfica",
      periodo: "2024/2",
      entregas: "1 entregues",
      imagem: "/imagens/icons_home_03.png"
    },
  ];


  return (
    <div>
      <div className="flex justify-start py-4 px-2 mb-9">
        <button onClick={() => navigate("/")} className="text-gray-600 font-bold me-5 flex content-top">
          <ChevronLeft size={30} />
        </button>
        <div>
          <h1 className="text-2xl text-gray-900 font-semibold">Atividades Entregues</h1>
        </div>
      </div>

      <div className="mb-3 mt-5 mx-3 relative">
          <input
            type="text"
            className="w-full h-[40px] rounded-full pl-4 pr-10 py-2 border border-gray-300 focus:outline-none bg-[#ebfcfb] focus:border-[#118693] focus:placeholder:text-[#118693] transition-colors duration-200"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <Search
            className={`absolute top-2.5 right-3 transition-colors duration-200 ${focused ? "text-[#118693]" : "text-gray-600"}`}
            size={18}
          />
      </div>

      <div className="flex gap-2 mb-6 mx-3">
        <button className="text-black text-xs px-3 py-0.5 rounded-full border border-black" onClick={() => abrirFiltro("disciplinas")}>
          Todas as Turmas<i className="fa-solid fa-chevron-down text-[10px] ms-1"></i>
        </button>
        <button className="text-black text-xs px-3 py-0.5 rounded-full border border-black" onClick={() => abrirFiltro("alunos")}>
          Todos os Alunos<i className="fa-solid fa-chevron-down text-[10px] ms-1"></i>
        </button>
      </div>
      <ModalFiltroHome
        isOpen={showModalFiltro}
        onClose={() => setShowModalFiltro(false)}
        categoriaSelecionada={categoriaFiltro}
        onFiltrar={aplicarFiltro}
        onLimpar={(categoria) => {
          setFiltrosAtivos((prev) => ({
            ...prev,
            [categoria]: "",
          }));
          setShowModalFiltro(false);
        }}
      />


      {/* Exibição das Atividades (Cards) */}
      <div className="flex flex-col gap-3 mx-3">
      {atividades.filter((atividade) => {
        if (
          (filtrosAtivos.disciplinas && atividade.nome !== filtrosAtivos.disciplinas) ||
          (filtrosAtivos.status && !atividade.entregas.toLowerCase().includes(filtrosAtivos.status.toLowerCase())) ||
          (filtrosAtivos.alunos && atividade.nome !== filtrosAtivos.alunos)
        ) {
          return false;
        }
        return true; }).map((atividade) => (
        <div key={atividade.id} className="bg-white rounded-xl shadow p-4 flex items-center justify-between" onClick={() => irParaEntregas(atividade.id)}>
          <div className="flex items-center gap-3">
            <div className="text-2xl w-10 h-10 rounded-full">
              <img className="w-100 h-100" src={`${process.env.PUBLIC_URL}${atividade.imagem}`} alt="" />
            </div>
            <div>
              <p className="font-medium">{atividade.nome}</p>
              <p className="text-sm text-gray-500">
                {atividade.periodo}; {atividade.entregas}
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
