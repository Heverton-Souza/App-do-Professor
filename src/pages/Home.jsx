import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight, Menu, CalendarCheck, Plus } from "lucide-react";
import ModalFiltroHome from "../components/ModalFiltroHome";

export default function Home() {
  const navigate = useNavigate();
  const [mostrarBotaoReserva, setMostrarBotaoReserva] = useState(false);
  const [tab, setTab] = useState("atividades");
  const [focused, setFocused] = useState(false);
  const [showReminder, setShowReminder] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showModalFiltro, setShowModalFiltro] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  const [filtrosAtivos, setFiltrosAtivos] = useState({
    disciplinas: "",
    alunos: "",
  });

  const irParaEntregas = (atividadeId) => {
    navigate(`/atividades/${atividadeId}/entregues`);
  };

  const abrirFiltro = (categoria) => {
    setCategoriaFiltro(categoria);
    setShowModalFiltro(true);
  };

  const onFiltra = (categoria, valor) => {
    setFiltrosAtivos((prev) => ({
      ...prev,
      [categoria]: valor,
    }));
    setShowModalFiltro(false);
  };

  // Dados de exemplo das atividades
  const atividades = [
    {
      id: 1,
      nome: "Projeto IV – Interface...",
      periodo: "2024/2",
      entregas: "3 entregues",
      imagem: "/imagens/icons_home_01.png",
      turma: "Turma A",
      aluno: "João Silva",
    },
    {
      id: 2,
      nome: "Design e sustentabilidade",
      periodo: "2024/2",
      entregas: "nenhuma entregue",
      imagem: "/imagens/icons_home_02.png",
      turma: "Turma B",
      aluno: "Maria Souza",
    },
    {
      id: 3,
      nome: "Computação gráfica",
      periodo: "2024/2",
      entregas: "1 entregue",
      imagem: "/imagens/icons_home_03.png",
      turma: "Turma A",
      aluno: "João Silva",
    },
  ];

  return (
    <div>
      {/* Menu Lateral */}
      {menuVisible && (
        <div
          onClick={() => setMenuVisible(false)}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-30"
        />
      )}

      <div
        className={`fixed top-0 right-0 ps-5 h-full bg-[#B7D1D0] shadow-lg z-30 transition-transform duration-300 ${menuVisible ? "translate-x-0" : "translate-x-full"}`}
        style={{ width: "85%" }}
      >
        <div className="p-4">
          <ul className="mt-6 text-[#118693] font-medium">
            <li className="py-2 text-xl">
              <button onClick={() => navigate("/disciplinas")}>Atividades</button>
            </li>
            <li className="py-2 text-xl">
              <button>Notas</button>
            </li>
            <li className="py-2 text-xl">
              <button>Reservar Sala</button>
            </li>
            <li className="py-2 text-xl">
              <button onClick={() => navigate("/matriz_curricular")}>Matriz Curricular</button>
            </li>
            <li className="py-2 text-xl">
              <button>Ajuda</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Barra superior */}
      <div className="bg-[#118693] m-0 p-0">
        <div className="p-5">
          <div className="flex justify-end text-white text-xl">
            <button onClick={() => setMenuVisible(true)}>
              <Menu size={24} />
            </button>
          </div>

          <h1 className="font-semibold mb-3 text-[white] text-2xl">Olá, Fernando</h1>

          {showReminder && (
            <div className="bg-[#b7e3e0] text-[#118693] p-4 rounded-xl mb-4 shadow">
              <div className="flex justify-between">
                <p className="font-semibold">Fique em dia!</p>
                <i
                  className="fa-solid fa-xmark cursor-pointer"
                  onClick={() => setShowReminder(false)}
                />
              </div>
              <p className="text-sm">Lembre de atribuir notas às atividades dos seus alunos até 1 de abril.</p>
            </div>
          )}
        </div>

        {/* Abas: Atividades e Agenda */}
        <div className="relative flex mb-2 border-b border-gray-300">
          <button
            className="flex-1 py-2 text-white text-center font-medium relative z-10"
            onClick={() => setTab("atividades")}
          >
            Atividades
          </button>
          <button
            className="flex-1 py-2 text-white text-center font-medium relative z-10"
            onClick={() => setTab("agenda")}
          >
            Agenda
          </button>

          <div
            className={`absolute bottom-0 w-1/2 h-1 bg-white transition-transform duration-300 ease-in-out`}
            style={{
              transform: tab === "atividades" ? "translateX(0%)" : "translateX(100%)",
            }}
          />
        </div>
      </div>

      {/* Filtros de busca e Modal */}
      {tab === "atividades" && (
        <div>
          <div className="mb-3 mt-5 mx-3 relative">
            <input
              type="text"
              placeholder="Pesquise por disciplina ou aluno"
              className="w-full rounded-full pl-4 pr-10 py-2 border border-gray-300 focus:outline-none bg-[#ebfcfb] focus:border-[#118693] focus:placeholder:text-[#118693] transition-colors duration-200"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            <Search
              className={`absolute top-3 right-3 transition-colors duration-200 ${focused ? "text-[#118693]" : "text-gray-600"}`}
              size={18}
            />
          </div>

          <div className="flex gap-2 mb-4 mx-3">
            <button className="text-black text-xs px-3 py-0.5 rounded-full border border-black" onClick={() => abrirFiltro("disciplinas")}>
              Todas as turmas<i className="fa-solid fa-chevron-down text-[10px] ms-1"></i>
            </button>
            <button className="text-black text-xs px-3 py-0.5 rounded-full border border-black" onClick={() => abrirFiltro("alunos")}>
              Todos os alunos<i className="fa-solid fa-chevron-down text-[10px] ms-1"></i>
            </button>
          </div>
          <ModalFiltroHome
            isOpen={showModalFiltro}
            onClose={() => setShowModalFiltro(false)}
            onFiltra={onFiltra} // Aqui é onde aplicamos o filtro
            categoriaSelecionada={categoriaFiltro}
          />
        </div>
      )}

      {/* Conteúdo das atividades */}
      <div className="flex flex-col gap-3 mx-3">
      {tab === "atividades" ? (
          <div className="flex flex-col gap-3 mx-3">
            {atividades.map((atividade) => (
              <div
                key={atividade.id}
                className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
                onClick={() => irParaEntregas(atividade.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl w-10 h-10 rounded-full">
                    <img className="w-100 h-100" src={`${atividade.imagem}`} alt="" />
                  </div>
                  <div>
                    <p className="font-medium">{atividade.nome}</p>
                    <p className="text-sm text-gray-500">{atividade.periodo}; {atividade.entregas}</p>
                  </div>
                </div>
                <span className="text-2xl text-gray-400">›</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-3 mx-3">
            <h1 className="mb-4 text-xl font-semibold">Próximos Eventos</h1>
            <div className="bg-white rounded-xl flex justify-between content-center shadow p-4">
              <div>
                <h3 className="font-medium text-xl">24 de março</h3>
                <div className="flex">
                  <span className="bg-[#60C1CC] rounded-full text-white text-sm px-3 py-0.5 flex items-center justify-center me-2">
                    Reserva
                  </span>
                  <span className="text-gray-600">Sala 501</span>
                </div>
              </div>
              <div className="content-center text-gray-800">
                <ChevronRight size={24} />
              </div>
            </div>

            {/* Botões flutuantes */}
            <div className="absolute bottom-16 right-2 flex flex-col items-center gap-2 z-10">
              {mostrarBotaoReserva && (
                <div className="relative group">
                  <button
                    className="bg-white shadow rounded-full px-3 py-3 flex items-center text-sm text-gray-500"
                  >
                    <CalendarCheck size={20} />
                  </button>
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 rounded text-sm text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Reservar Sala
                  </div>
                </div>
              )}
              <button
                className="bg-[#60C1CC] text-[#118693] rounded-full shadow w-14 h-14 flex items-center justify-center text-3xl"
                onClick={() => setMostrarBotaoReserva(!mostrarBotaoReserva)}
              >
                <Plus size={28} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
