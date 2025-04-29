import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { appointments, clients, professionals, services } = useContext(AppContext);
  
 
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);


  const todayAppointments = appointments.filter(
    (appt) => appt.date === "2025-04-29"
  );

  const totalAppointmentsToday = todayAppointments.length;
  const totalClients = clients.length;
  const newClientsThisMonth = clients.filter(client => {
    
    return client.id > Math.max(0, clients.length - 12);
  }).length;
  const availableProfessionalsToday = professionals.length; 
  const popularServices = services.length; 


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#68C3B7] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link
          to="/appointments"
          className="bg-[#68C3B7] text-white px-4 py-2 rounded-lg hover:bg-[#5aa89d] transition-colors"
        >
          Novo Agendamento
        </Link>
      </div>

      {/* Blocos de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total de Agendamentos */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Total de Agendamentos</h3>
          <p className="text-3xl font-bold text-[#68C3B7]">{appointments.length}</p>
          <p className="text-sm text-gray-500">{totalAppointmentsToday} hoje</p>
        </div>

        {/* Clientes */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Clientes</h3>
          <p className="text-3xl font-bold text-[#68C3B7]">{totalClients}</p>
          <p className="text-sm text-gray-500">{newClientsThisMonth} novos este mês</p>
        </div>

        {/* Profissionais */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Profissionais</h3>
          <p className="text-3xl font-bold text-[#68C3B7]">{professionals.length}</p>
          <p className="text-sm text-gray-500">{availableProfessionalsToday} disponíveis hoje</p>
        </div>

        {/* Serviços */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Serviços</h3>
          <p className="text-3xl font-bold text-[#68C3B7]">{services.length}</p>
          <p className="text-sm text-gray-500">{popularServices} mais populares</p>
        </div>
      </div>

      {/* Card de Agendamentos de Hoje */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Agendamentos de Hoje
        </h2>
        {todayAppointments.length > 0 ? (
          <div className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 border-b border-gray-200"
              >
                <div className="md:col-span-2">
                  <p className="font-medium text-gray-800">{appointment.clientName}</p>
                  <p className="text-sm text-gray-500">
                    Serviço: {appointment.service} | Profissional: {appointment.professional}
                  </p>
                  <p className="text-sm text-gray-500">
                    Horário: {appointment.time}
                  </p>
                </div>
                <div className="flex justify-end">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      appointment.status === "Confirmado"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "Concluído"
                        ? "bg-blue-100 text-blue-800"
                        : appointment.status === "Cancelado"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Nenhum agendamento para hoje.</p>
        )}
      </div>
    </div>
  );
};

export default Home;