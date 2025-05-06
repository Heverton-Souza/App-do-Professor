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

function App() {
  return (
    <Router>
      <div className="flex flex-col justify-between bg-[#B7D1D0] min-h-screen">
        <div className="h-dvh flex-1 overflow-y-auto">
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
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
