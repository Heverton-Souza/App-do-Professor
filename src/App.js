import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Agenda from "./pages/Agenda";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import AtividadesEntregues from "./pages/AtividadesEntregues";
import Disciplinas from "./pages/Disciplinas";
import MatrizCurricular from "./pages/MatrizCurricular";
import MatrizCurricular_Curso from "./pages/MartrizCurricular_Curso";
import MatrizCurricular_Disciplina from "./pages/MatrizCurricular_Disciplina";
import Aluno from "./pages/Aluno";

function App() {
  return (
    <Router basename="/App-do-Professor">
      <div className="flex flex-col justify-between bg-[#B7D1D0] h-[94vh]">
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/search" element={<Search />} />
            <Route path="/atividades/:id/entregues" element={<AtividadesEntregues />} />
            <Route path="/disciplinas" element={<Disciplinas />} />
            <Route path="/matriz_curricular" element={<MatrizCurricular />} />
            <Route path="/matriz_curricular/:id/curso" element={<MatrizCurricular_Curso />} />
            <Route path="/matriz_curricular/curso/:id/disciplina" element={<MatrizCurricular_Disciplina />} />
            <Route path="/atividades/01/entregues/aluno/01" element={<Aluno />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
