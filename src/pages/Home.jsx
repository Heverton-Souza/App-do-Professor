import { useState } from "react";
import { Search, ChevronRight, CalendarPlus, Menu } from "lucide-react"; // Importando o ícone de menu
import ModalFiltroHome from "../components/ModalFiltroHome";




export default function Home() {
  const [tab, setTab] = useState("atividades");
  const [focused, setFocused] = useState(false);
  const [showReminder, setShowReminder] = useState(true); // Estado para controlar a visibilidade do aviso
  const [menuVisible, setMenuVisible] = useState(false); // Estado para controlar a visibilidade do menu lateral
  const [showModalFiltro, setShowModalFiltro] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState(""); // nova state

  const abrirFiltro = (categoria) => {
    setCategoriaFiltro(categoria);
    setShowModalFiltro(true);
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
      {/* Fundo preto com blur quando o menu estiver aberto */}
      {menuVisible && (
        <div
          onClick={() => setMenuVisible(false)} // Fecha o menu ao clicar no fundo
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-30"
        />
      )}

      {/* Menu Lateral */}
      <div
        className={`fixed top-0 right-0 ps-5 h-full bg-[#B7D1D0] shadow-lg z-30 transition-transform duration-300 ${menuVisible ? "translate-x-0" : "translate-x-full"}`}
        style={{ width: "85%" }}
      >
        <div className="p-4">
          <ul className="mt-6 text-[#118693] font-medium">
            <li className="py-2 text-xl">
              <button onClick={() => setTab("atividades")}>Atividades</button>
            </li>
            <li className="py-2 text-xl">
              <button>Notas</button>
            </li>
            <li className="py-2 text-xl">
              <button>Reservar Sala</button>
            </li>
            <li className="py-2 text-xl">
              <button>Matriz Curricular</button>
            </li>
            <li className="py-2 text-xl">
              <button>Ajuda</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Barra superior e conteúdo principal */}
      <div className="bg-[#118693] m-0 p-0">
        <div className="p-5">
          <div className="flex justify-end text-white text-xl">
            <button onClick={() => setMenuVisible(true)}>
              <Menu size={24} />
            </button>
          </div>

          <h1 className="font-semibold mb-3 text-[white] text-2xl">Olá, Fernando</h1>

          {/* Condicionalmente renderiza o aviso (com fundo colorido) */}
          {showReminder && (
            <div className="bg-[#b7e3e0] text-[#118693] p-4 rounded-xl mb-4 shadow">
              <div className="flex justify-between">
                <p className="font-semibold">Fique em dia!</p>
                <i
                  className="fa-solid fa-xmark cursor-pointer"
                  onClick={() => setShowReminder(false)} // Muda o estado para false quando o "x" é clicado
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

      {/* Só exibe Search, Turmas e Alunos quando a aba for "Atividades" */}
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
              className={`absolute top-2.5 right-3 transition-colors duration-200 ${focused ? "text-[#118693]" : "text-gray-600"}`}
              size={18}
            />
          </div>

          <div className="flex gap-2 mb-4 mx-3">
            <button className="text-[#1d666e] text-xs px-3 py-1 rounded-full border border-[#1d666e]" onClick={() => abrirFiltro("disciplinas")}>
              Todas as turmas
            </button>
            <button className="text-[#1d666e] text-xs px-3 py-1 rounded-full border border-[#1d666e]" onClick={() => abrirFiltro("alunos")}>
              Todos os alunos
            </button>
          </div>
          <ModalFiltroHome isOpen={showModalFiltro} onClose={() => setShowModalFiltro(false)} categoriaSelecionada={categoriaFiltro}/>
        </div>
      )}

      {/* Conteúdo das Abas */}
      <div className="flex flex-col gap-3 mx-3">
        {tab === "atividades" ? (
          atividades.map((atividade) => (
            <div
              key={atividade.id}
              className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
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
          ))
        ) : (
          <div>
            <h1 className="mt-3 mb-4 text-xl font-semibold">Próximos Eventos</h1>
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
                <ChevronRight size={24} className="" />
              </div>
            </div>

            <div className="bg-white rounded-xl flex items-center justify-center shadow p-4 mt-4 text-lg text-gray-700">
              <i className="fa-solid fa-plus"></i>
              <p className="font-medium ms-2">Reservar sala</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
