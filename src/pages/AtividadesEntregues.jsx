import React, { useState } from "react"; // Adicionando import do React e useState
import { useNavigate } from "react-router-dom"; // Adicionando import de useNavigate
import { Search, ChevronLeft, ChevronRight } from "lucide-react"; // Importando os ícones corretamente
import ModalFiltroHome from "../components/ModalFiltroHome"; // Verifique o caminho do seu componente

export default function AtividadesEntregues() {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(false);
  const [showModalFiltro, setShowModalFiltro] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  const [filtrosAtivos, setFiltrosAtivos] = useState({
    alunos: "",
    status: "",
  });

  const abrirFiltro = (categoria) => {
    setCategoriaFiltro(categoria);
    setShowModalFiltro(true);
  };

  const aplicarFiltro = (categoria, valor) => {
    setFiltrosAtivos((prev) => ({
      ...prev,
      [categoria]: valor,
    }));
    setShowModalFiltro(false);
  };

  const limparFiltro = (categoria) => {
    setFiltrosAtivos((prev) => ({
      ...prev,
      [categoria]: "",
    }));
    setShowModalFiltro(false);
  };

  const alunos = [
    {
      id: 1,
      nome: "Nathália Junger",
      entrega: "Entregue",
      titulo_trabalho: "(título da atividade)",
      imagem: "/imagens/perfil_alunos_03.png",
    },
    {
      id: 2,
      nome: "Lucy Felix",
      entrega: "Entregue em atraso",
      titulo_trabalho: "(título da atividade)",
      imagem: "/imagens/perfil_alunos_04.png",
    },
    {
      id: 3,
      nome: "Júlia Marques",
      entrega: "Entregue em atraso",
      titulo_trabalho: "(título da atividade)",
      imagem: "/imagens/perfil_alunos_02.png",
    },
    {
      id: 4,
      nome: "Lara Stellet",
      entrega: "Pendente",
      titulo_trabalho: "(título da atividade)",
      imagem: "/imagens/perfil_alunos_01.png",
    },
  ];

  // Filtra os alunos com base nos filtros aplicados
  const alunosFiltrados = alunos.filter((aluno) => {
    if (
      (filtrosAtivos.alunos && aluno.nome !== filtrosAtivos.alunos) ||
      (filtrosAtivos.status && aluno.entrega !== filtrosAtivos.status)
    ) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <div className="flex justify-start py-4 px-2 mb-3">
        <button
          onClick={() => navigate("/disciplinas")}
          className="text-gray-600 font-bold me-5 flex content-top"
        >
          <ChevronLeft size={30} />
        </button>
        <div>
          <h1 className="text-2xl text-gray-900 font-semibold">Atividades Entregues</h1>
          <div className="overflow-hidden whitespace-nowrap">
            <div className="animate-marquee text-[#118693] text-m">
              Projeto IV - Interfaces Digitais e Hipermídia
            </div>
          </div>
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

      <div className="flex gap-2 mb-4 mx-3">
        <button
          className="text-black text-xs px-3 py-0.5 rounded-full border border-black"
          onClick={() => abrirFiltro("alunos")}
        >
          {filtrosAtivos.alunos || "Todos os Alunos"}
          <i className="fa-solid fa-chevron-down text-[10px] ms-1"></i>
        </button>
        <button
          className="text-black text-xs px-3 py-0.5 rounded-full border border-black"
          onClick={() => abrirFiltro("status")}
        >
          {filtrosAtivos.status || "Status"}
          <i className="fa-solid fa-chevron-down text-[10px] ms-1"></i>
        </button>
      </div>

      <ModalFiltroHome
        isOpen={showModalFiltro}
        onClose={() => setShowModalFiltro(false)}
        categoriaSelecionada={categoriaFiltro}
        onFiltrar={aplicarFiltro}
        onLimpar={limparFiltro}
      />

      {/* Exibe a mensagem quando não houverem atividades filtradas */}
      {alunosFiltrados.length === 0 ? (
        <div className="flex justify-center items-end h-64">
          <p className="text-gray-600 text-xl text-center">Nenhuma Atividade<br/>entregue</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mx-3">
          {alunosFiltrados.map((atividade) => (
            <div
              key={atividade.id}
              onClick={() => navigate("/atividades/01/entregues/aluno/01")} 
              className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl w-10 h-10 rounded-full">
                  <img className="w-100 h-100" src={`${process.env.PUBLIC_URL}${atividade.imagem}`} alt="" />
                </div>
                <div>
                  <p className="font-medium">{atividade.nome}</p>
                  <p className="text-sm text-gray-500">
                    <span className={getEntregaClass(atividade.entrega)}>
                      {atividade.entrega}
                    </span>
                    , {atividade.titulo_trabalho}
                  </p>
                </div>
              </div>
              <div className="content-center text-gray-800">
                <ChevronRight size={24} />
              </div>
            </div>
          ))}
        </div>
      )}
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
      return "text-gray-500";
  }
};
