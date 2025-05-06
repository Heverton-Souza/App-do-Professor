import React, { useState, useEffect } from "react";

const ModalFiltro = ({ isOpen, onClose, categoriaSelecionada, onFiltrar, onLimpar }) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    // Sempre que abrir o modal, resetar seleção
    setSelected("");
  }, [isOpen, categoriaSelecionada]);

  const filtros = {
    disciplinas: [
      "Projeto IV - Interfaces Digitais e Hipermídeas",
      "Design e sustentabilidade",
      "Computação gráfica",
      "Todas as Turmas"
    ],
    alunos: [
      "Nathália Junger",
      "Lucy Felix",
      "Júlia Marques",
      "Lara Stellet",
      "Mateus Ramos",
      "Todos os Alunos"
    ],
    status: [
      "Entregue",
      "Entregue em atraso",
      "Pendente"
    ]
  };

  if (!isOpen || !categoriaSelecionada) return null;

  const opcoes = filtros[categoriaSelecionada.toLowerCase()] || [];

  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-0 left-0 w-full h-[90%] bg-white rounded-t-2xl z-50 transition-transform animate-slide-up"
      >
        {/* Barra de arrasto */}
        <div className="w-full flex justify-center mt-3 mb-4">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Título */}
        <h2 className="text-center text-lg font-semibold text-[#118693] mb-4">
          Filtrar por {categoriaSelecionada.charAt(0).toUpperCase() + categoriaSelecionada.slice(1)}
        </h2>

        {/* Lista de filtros */}
        <div className="flex flex-col gap-4 px-6 overflow-y-auto max-h-[65%]">
          {opcoes.map((item) => (
            <label
              key={item}
              className="flex justify-between items-center text-gray-700 text-base"
            >
              {item}
              <input
                type="radio"
                name="filtro"
                value={item}
                checked={selected === item}
                onChange={(e) => setSelected(e.target.value)}
                className="accent-[#118693]"
              />
            </label>
          ))}
        </div>

        {/* Botão e link */}
        <div className="mt-auto w-full px-6 pb-6 absolute bottom-0 left-0">
          <button
            disabled={!selected}
            className={`w-full py-3 text-white text-base rounded-full font-semibold mb-2 ${
              selected ? "bg-[#118693]" : "bg-gray-300 cursor-not-allowed"
            }`}
            onClick={() => {
              onFiltrar(categoriaSelecionada, selected);
              onClose();
            }}
          >
            Aplicar
          </button>
          <p
            onClick={() => {
              setSelected("");
              onLimpar?.(categoriaSelecionada); // Executa se onLimpar for fornecido
              onClose();
            }}
            className="text-center text-sm text-[#118693] underline cursor-pointer"
          >
            Limpar
          </p>
        </div>
      </div>

      {/* Animação */}
      <style jsx>{`
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0%);
          }
        }
      `}</style>
    </div>
  );
};

export default ModalFiltro;
