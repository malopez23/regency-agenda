import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Professionals from './pages/Professionals';
import Services from './pages/Services';

const Agenda = () => <h1 className="text-2xl font-bold">Página Agenda</h1>;
const Appointments = () => <h1 className="text-2xl font-bold">Página Agendamentos</h1>;
const Clients = () => <h1 className="text-2xl font-bold">Página Clientes</h1>;

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/professionals" element={<Professionals />} />
        <Route path="/services" element={<Services />} />
        <Route path="/clients" element={<Clients />} />
      </Route>
    </Routes>
  );
}

export default App;