import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const Home = () => <h1 className="text-2xl font-bold">Página Início</h1>;
const Agenda = () => <h1 className="text-2xl font-bold">Página Agenda</h1>;
const Appointments = () => <h1 className="text-2xl font-bold">Página Agendamentos</h1>;
const Professionals = () => <h1 className="text-2xl font-bold">Página Profissionais</h1>;
const Services = () => <h1 className="text-2xl font-bold">Página Serviços</h1>;
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