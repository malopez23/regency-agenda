import { Link } from 'react-router-dom';

const Home = () => {
  // Dados fictícios
  const totalAgendamentos = 28;
  const clientes = 156;
  const profissionais = 8;
  const servicos = 24;

  const agendamentosHoje = [
    { cliente: "Maria Silva", servico: "Corte Feminino", horario: "09:00", profissional: "Ana Santos", status: "Confirmado" },
    { cliente: "João Pedro", servico: "Barba", horario: "10:30", profissional: "Carlos Oliveira", status: "Agendado" },
    { cliente: "Paula Mendes", servico: "Manicure", horario: "14:00", profissional: "Beatriz Lima", status: "Concluído" },
  ];

  return (
    <div className="space-y-6">
      {/* Título e Botão */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link
          to="/appointments"
          className="bg-[#68C3B7] text-white px-4 py-2 rounded-lg hover:bg-[#5aa89d] transition-colors"
        >
          Novo Agendamento
        </Link>
      </div>

      {/* Resumo (Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Total de Agendamentos</h3>
          <p className="text-2xl font-bold text-[#68C3B7]">{totalAgendamentos}</p>
          <p className="text-sm text-gray-500">5 hoje</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Clientes</h3>
          <p className="text-2xl font-bold text-[#68C3B7]">{clientes}</p>
          <p className="text-sm text-gray-500">12 novos este mês</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Profissionais</h3>
          <p className="text-2xl font-bold text-[#68C3B7]">{profissionais}</p>
          <p className="text-sm text-gray-500">6 disponíveis hoje</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Serviços</h3>
          <p className="text-2xl font-bold text-[#68C3B7]">{servicos}</p>
          <p className="text-sm text-gray-500">3 mais populares</p>
        </div>
      </div>

      {/* Agendamentos de Hoje */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Agendamentos de Hoje</h2>
        <div className="space-y-4">
          {agendamentosHoje.map((agendamento, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 items-center p-4 border-b border-gray-200"
            >
              {/* Coluna Esquerda: Cliente e Serviço */}
              <div>
                <p className="font-medium text-gray-800">{agendamento.cliente}</p>
                <p className="text-sm text-gray-500">{agendamento.servico}</p>
              </div>
              {/* Coluna Central: Horário e Profissional */}
              <div className="text-center">
                <p className="font-medium text-gray-800">{agendamento.horario}</p>
                <p className="text-sm text-gray-500">{agendamento.profissional}</p>
              </div>
              {/* Coluna Direita: Status */}
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    agendamento.status === "Confirmado"
                      ? "bg-green-100 text-green-800"
                      : agendamento.status === "Concluído"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {agendamento.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Links de Navegação */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/agenda"
          className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-gray-50 transition-colors"
        >
          <p className="text-lg font-semibold text-gray-800">Agenda</p>
          <p className="text-sm text-gray-500">Visualize todos os agendamentos</p>
        </Link>
        <Link
          to="/clients"
          className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-gray-50 transition-colors"
        >
          <p className="text-lg font-semibold text-gray-800">Clientes</p>
          <p className="text-sm text-gray-500">Gerencie seus clientes</p>
        </Link>
        <Link
          to="/services"
          className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-gray-50 transition-colors"
        >
          <p className="text-lg font-semibold text-gray-800">Serviços</p>
          <p className="text-sm text-gray-500">Gerencie seus serviços</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;