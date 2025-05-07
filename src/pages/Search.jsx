import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const blocos = ["A", "B", "C", "D", "E", "F", "G"];
const dias = Array.from({ length: 31 }, (_, i) => i + 1);

const salas = [
  { id: 1, nome: "Sala 501, bloco g, 5 andar" },
  { id: 2, nome: "Sala 504, bloco g, 5 andar" },
  { id: 3, nome: "Sala 508, bloco g, 5 andar" },
  { id: 4, nome: "Sala 509, bloco g, 5 andar" },
];

const horarios = [
  "12:30 - 14:10",
  "14:10 - 15:50",
  "17:30 - 19:10",
  "19:10 - 20:50",
  "20:50 - 21:40",
];

// Simula dias indisponíveis
const indisponiveis = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29];

const diasSemana = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];

function statusDia(dia, selecionados) {
  if (indisponiveis.includes(dia)) return "indisponivel";
  if (selecionados.includes(dia)) return "selecionado";
  return "disponivel";
}

function getDiasNoMes(mes, ano) {
  return new Date(ano, mes + 1, 0).getDate();
}

function getPrimeiroDiaSemana(mes, ano) {
  // Retorna 0 para segunda-feira, 6 para domingo (ajustado para o layout)
  let dia = new Date(ano, mes, 1).getDay();
  return dia === 0 ? 6 : dia - 1;
}

export default function Search() {
  const [step, setStep] = useState(1);
  const [blocosSelecionados, setBlocosSelecionados] = useState([]);
  const [datasSelecionadas, setDatasSelecionadas] = useState([]);
  const [salaSelecionada, setSalaSelecionada] = useState(null);
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showNewQuery, setShowNewQuery] = useState(false);
  const [mesAtual, setMesAtual] = useState(2); // Março = 2 (0-based)
  const [anoAtual, setAnoAtual] = useState(2025);

  const diasNoMes = getDiasNoMes(mesAtual, anoAtual);
  const primeiroDiaSemana = getPrimeiroDiaSemana(mesAtual, anoAtual);

  const mudarMes = (delta) => {
    let novoMes = mesAtual + delta;
    let novoAno = anoAtual;
    if (novoMes < 0) {
      novoMes = 11;
      novoAno -= 1;
    } else if (novoMes > 11) {
      novoMes = 0;
      novoAno += 1;
    }
    setMesAtual(novoMes);
    setAnoAtual(novoAno);
    setDatasSelecionadas([]); // Limpa seleção ao trocar de mês (opcional)
  };

  // Etapa 1: Busca/inserção de dados
  if (step === 1) {
    return (
      <div style={styles.bg}>
        <div style={styles.container}>
          <Header />
          <div style={styles.card}>
            <div style={styles.label}>Bloco</div>
            <div style={styles.sublabel}>Selecione um ou mais blocos:</div>
            <div style={styles.blocosGrid}>
              {blocos.map((b) => (
                <label key={b} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={blocosSelecionados.includes(b)}
                    onChange={() =>
                      setBlocosSelecionados((prev) =>
                        prev.includes(b)
                          ? prev.filter((x) => x !== b)
                          : [...prev, b]
                      )
                    }
                    style={styles.checkbox}
                  />
                  <span style={styles.blocoLetra}>{b}</span>
                </label>
              ))}
            </div>
          </div>
          <div style={styles.card}>
            <div style={styles.label}>Data</div>
            <div style={styles.sublabel}>Selecione até 5 datas de sua preferência:</div>
            {/* Cabeçalho do mês com setas */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: 6
            }}>
              <span
                style={{ color: "#888", fontSize: 24, cursor: "pointer" }}
                onClick={() => mudarMes(-1)}
              >{"<"}</span>
              <span style={{ fontWeight: 500, fontSize: 16 }}>
                {new Date(anoAtual, mesAtual).toLocaleString("pt-BR", { month: "long", year: "numeric" }).replace(/^./, str => str.toUpperCase())}
              </span>
              <span
                style={{ color: "#888", fontSize: 24, cursor: "pointer" }}
                onClick={() => mudarMes(1)}
              >{">"}</span>
            </div>
            {/* Dias da semana */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              marginBottom: 4,
              fontSize: 13,
              color: "#888",
              textAlign: "center",
              fontWeight: 500,
              letterSpacing: 1,
            }}>
              {diasSemana.map((dia) => (
                <div key={dia}>{dia}</div>
              ))}
            </div>
            {/* Dias do mês (com espaços em branco no início) */}
            <div style={styles.diasGrid}>
              {Array.from({ length: primeiroDiaSemana }).map((_, i) => (
                <div key={"vazio" + i} />
              ))}
              {Array.from({ length: diasNoMes }, (_, i) => {
                const d = i + 1;
                const status = statusDia(d, datasSelecionadas);
                let bg = "#fff", color = "#008080", border = "2px solid #008080";
                if (status === "indisponivel") {
                  bg = "#f3f3f3"; color = "#bbb"; border = "2px solid #eee";
                }
                if (status === "selecionado") {
                  bg = "#008080"; color = "#fff"; border = "2px solid #008080";
                }
                return (
                  <button
                    key={d}
                    onClick={() => {
                      if (status === "indisponivel") return;
                      if (datasSelecionadas.includes(d)) {
                        setDatasSelecionadas(datasSelecionadas.filter((x) => x !== d));
                      } else if (datasSelecionadas.length < 5) {
                        setDatasSelecionadas([...datasSelecionadas, d]);
                      }
                    }}
                    disabled={status === "indisponivel"}
                    style={{
                      ...styles.diaBtn,
                      background: bg,
                      color,
                      border,
                      cursor: status === "indisponivel" ? "not-allowed" : "pointer",
                    }}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
            {/* Legenda */}
            <div style={styles.legenda}>
              <Legenda cor="#f3f3f3" borda="#eee" texto="Não disponível" />
              <Legenda cor="#fff" borda="#008080" texto="Disponível" />
              <Legenda cor="#008080" borda="#008080" texto="Selecionado" />
            </div>
          </div>
          <div style={styles.btnRow}>
            <button
              style={styles.btnCancelar}
              onClick={() => {
                setBlocosSelecionados([]);
                setDatasSelecionadas([]);
              }}
            >
              Cancelar
            </button>
            <button
              style={styles.btnPrincipal}
              disabled={blocosSelecionados.length === 0 || datasSelecionadas.length === 0}
              onClick={() => setStep(2)}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Etapa 2: Seleção de sala
  if (step === 2) {
    return (
      <div style={styles.bg}>
        <div style={styles.container}>
          <Header />
          {salas.map((s) => (
            <div
              key={s.id}
              style={{
                ...styles.salaCard,
                border: salaSelecionada === s.id ? "2px solid #008080" : "none",
              }}
              onClick={() => setSalaSelecionada(s.id)}
            >
              <div style={{ fontWeight: 600 }}>{s.nome}</div>
              <div style={{ color: "#888", fontSize: 13 }}>5 horários disponíveis</div>
            </div>
          ))}
          <div style={styles.btnRow}>
            <button style={styles.btnCancelar} onClick={() => setStep(1)}>
              Voltar
            </button>
            <button
              style={styles.btnPrincipal}
              disabled={!salaSelecionada}
              onClick={() => setStep(3)}
            >
              Agendar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Etapa 3: Seleção de horários
  if (step === 3) {
    return (
      <div style={styles.bg}>
        <div style={styles.container}>
          <Header titulo="Agendamento" />
          <div style={styles.salaCard}>
            <div style={{ fontWeight: 600 }}>
              {salas.find((s) => s.id === salaSelecionada)?.nome}
            </div>
            <div style={{ color: "#888", fontSize: 13 }}>5 horários disponíveis</div>
            <div style={styles.horariosGrid}>
              {horarios.map((h, idx) => (
                <label key={h} style={styles.checkboxHorarioLabel}>
                  <input
                    type="checkbox"
                    checked={horariosSelecionados.includes(idx)}
                    onChange={() => {
                      setHorariosSelecionados((prev) =>
                        prev.includes(idx)
                          ? prev.filter((i) => i !== idx)
                          : [...prev, idx]
                      );
                    }}
                    style={styles.checkbox}
                  />
                  <span>{h}</span>
                </label>
              ))}
            </div>
          </div>
          <div style={styles.btnRow}>
            <button style={styles.btnCancelar} onClick={() => setStep(2)}>
              Voltar
            </button>
            <button
              style={styles.btnPrincipal}
              disabled={horariosSelecionados.length === 0}
              onClick={() => setShowOverlay(true)}
            >
              Agendar
            </button>
          </div>
          {/* Overlay de agendamento concluído */}
          {showOverlay && (
            <div style={styles.overlay}>
              <div style={styles.overlayCard}>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
                  Agendamento concluído!
                </div>
                <div style={{ color: "#222", fontSize: 15, marginBottom: 16 }}>
                  Confira sua seleção ou clique em OK para nova agenda.
                </div>
                <button
                  style={styles.btnPrincipal}
                  onClick={() => {
                    setShowOverlay(false);
                    setShowNewQuery(true);
                  }}
                >
                  Ok
                </button>
              </div>
            </div>
          )}
          {/* Overlay: deseja realizar nova consulta */}
          {showNewQuery && (
            <div style={styles.overlayLight}>
              <div style={styles.overlayCardLight}>
                <div style={{ marginBottom: 16, fontWeight: 500 }}>
                  Deseja realizar uma nova consulta?
                </div>
                <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                  <button
                    style={styles.btnCancelar}
                    onClick={() => setShowNewQuery(false)}
                  >
                    Não
                  </button>
                  <button
                    style={styles.btnPrincipal}
                    onClick={() => {
                      setStep(1);
                      setBlocosSelecionados([]);
                      setDatasSelecionadas([]);
                      setSalaSelecionada(null);
                      setHorariosSelecionados([]);
                      setShowNewQuery(false);
                    }}
                  >
                    Sim
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

// Componentes auxiliares
function Header({ titulo = "Consulta de salas" }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        height: 40,
        marginBottom: 16,
        justifyContent: "center",
        width: "100%",
      }}
    >
      {/* Seta de voltar */}
      <span
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          left: 0,
          fontSize: 24,
          fontWeight: 700,
          color: "#222",
          cursor: "pointer",
          paddingLeft: 4,
        }}
      >
        {"<"}
      </span>
      {/* Título centralizado */}
      <span style={{ fontSize: 18, fontWeight: 600, color: "#222" }}>
        {titulo}
      </span>
    </div>
  );
}

function Legenda({ cor, borda, texto }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <span style={{
        display: "inline-block",
        width: 14, height: 14,
        background: cor,
        border: `2px solid ${borda}`,
        borderRadius: "50%"
      }} />
      {texto}
    </span>
  );
}

// Estilos
const styles = {
  bg: {
    background: "#bdd3d3",
    minHeight: "100vh",
    padding: 16,
  },
  container: {
    maxWidth: 420,
    margin: "0 auto",
    paddingBottom: 32,
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    boxShadow: "0 2px 8px #0001",
    border: "none",
  },
  label: { fontWeight: 600, marginBottom: 8, fontSize: 16 },
  sublabel: { color: "#555", fontSize: 14, marginBottom: 12 },
  blocosGrid: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 8 },
  checkboxLabel: { display: "flex", alignItems: "center", gap: 4 },
  checkbox: { accentColor: "#008080", width: 18, height: 18 },
  blocoLetra: { fontSize: 17, fontWeight: 500 },
  dataHeader: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 },
  seta: { color: "#888", fontSize: 18, fontWeight: 700, cursor: "pointer" },
  diasGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 6,
    marginBottom: 10,
  },
  diaBtn: {
    width: 36, height: 36,
    borderRadius: "50%",
    fontWeight: 600,
    outline: "none",
    fontSize: 16,
    transition: "all .2s",
    border: "2px solid #008080",
    background: "#fff",
    color: "#008080",
  },
  legenda: {
    display: "flex",
    gap: 14,
    fontSize: 13,
    alignItems: "center",
    marginTop: 8,
  },
  btnRow: { display: "flex", gap: 16, marginTop: 12 },
  btnCancelar: {
    flex: 1,
    background: "#fff",
    color: "#008080",
    border: "2px solid #008080",
    borderRadius: 12,
    padding: "12px 0",
    fontWeight: 600,
    fontSize: 17,
    cursor: "pointer",
    marginRight: 8,
  },
  btnPrincipal: {
    flex: 1,
    background: "#008080",
    color: "#fff",
    border: "2px solid #008080",
    borderRadius: 12,
    padding: "12px 0",
    fontWeight: 600,
    fontSize: 17,
    cursor: "pointer",
    minWidth: 100,
  },
  salaCard: {
    background: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    boxShadow: "0 2px 8px #0001",
    cursor: "pointer",
    transition: "border .2s",
  },
  horariosGrid: {
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  checkboxHorarioLabel: { display: "flex", alignItems: "center", gap: 8, fontSize: 16 },
  overlay: {
    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
    background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 999,
  },
  overlayCard: {
    background: "#6cc", padding: 20, margin:30, borderRadius: 16, textAlign: "center", minWidth: 250,
    boxShadow: "0 4px 24px #0003",
  },
  overlayLight: {
    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
    background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000,
  },
  overlayCardLight: {
    background: "#fff", padding: 24, borderRadius: 12, textAlign: "center", minWidth: 220,
    boxShadow: "0 4px 24px #0002",
  },
};