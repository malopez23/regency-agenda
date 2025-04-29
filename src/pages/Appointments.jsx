import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Appointments = () => {
  // Usar dados do Context
  const { professionals, services, clients, setClients, appointments, setAppointments } = useContext(AppContext);

  // Estado para o formulário de adicionar/editar
  const [formData, setFormData] = useState({
    id: null,
    clientName: "",
    clientPhone: "",
    service: "",
    professional: "",
    date: "",
    time: "",
    status: "Agendado",
  });
  const [isEditing, setIsEditing] = useState(false);
  // Estado para controlar o modal
  const [showModal, setShowModal] = useState(false);
  // Estado para controlar a escolha entre cliente existente e novo
  const [clientOption, setClientOption] = useState("existing"); // "existing" ou "new"
  // Estado para controle de carregamento
  const [loading, setLoading] = useState(true);

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 segundo de delay
    return () => clearTimeout(timer);
  }, []);

  // Função para adicionar ou editar um agendamento
  const handleSubmit = (e) => {
    e.preventDefault();

    let finalClientName = formData.clientName;

    // Se for um novo cliente, adicionar ao Context
    if (clientOption === "new") {
      const newClient = {
        id: clients.length + 1,
        name: formData.clientName,
        phone: formData.clientPhone,
      };
      setClients([...clients, newClient]);
      finalClientName = newClient.name;
    }

    if (isEditing) {
      // Editar agendamento existente
      setAppointments(
        appointments.map((appt) =>
          appt.id === formData.id ? { ...formData, clientName: finalClientName } : appt
        )
      );
      setIsEditing(false);
    } else {
      // Adicionar novo agendamento
      const newAppointment = {
        id: appointments.length + 1,
        clientName: finalClientName,
        service: formData.service,
        professional: formData.professional,
        date: formData.date,
        time: formData.time,
        status: formData.status,
      };
      setAppointments([...appointments, newAppointment]);
    }

    // Mostrar o modal após o envio
    setShowModal(true);
    setFormData({
      id: null,
      clientName: "",
      clientPhone: "",
      service: "",
      professional: "",
      date: "",
      time: "",
      status: "Agendado",
    });
    setClientOption("existing");
  };

  // Função para preencher o formulário ao editar
  const handleEdit = (appointment) => {
    // Verificar se o cliente do agendamento existe na lista de clientes
    const clientExists = clients.find((client) => client.name === appointment.clientName);
    setFormData({
      ...appointment,
      clientPhone: clientExists ? clientExists.phone : "",
    });
    setClientOption(clientExists ? "existing" : "new");
    setIsEditing(true);
  };

  // Função para remover um agendamento
  const handleDelete = (id) => {
    setAppointments(appointments.filter((appt) => appt.id !== id));
  };

  // Exibir tela de carregamento enquanto loading for true
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
      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-900">Agendamentos</h1>

      {/* Formulário para Adicionar/Editar */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {isEditing ? "Editar Agendamento" : "Novo Agendamento"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Escolha entre cliente existente e novo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Cliente
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="clientOption"
                  value="existing"
                  checked={clientOption === "existing"}
                  onChange={() => setClientOption("existing")}
                  className="mr-2 focus:ring-[#68C3B7]"
                />
                Selecionar cliente existente
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="clientOption"
                  value="new"
                  checked={clientOption === "new"}
                  onChange={() => setClientOption("new")}
                  className="mr-2 focus:ring-[#68C3B7]"
                />
                Cadastrar novo cliente
              </label>
            </div>
          </div>

          {/* Campos de cliente */}
          {clientOption === "existing" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome do Cliente</label>
              <select
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#68C3B7] focus:border-[#68C3B7]"
                required
              >
                <option value="">Selecione um cliente</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.name}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome do Cliente</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#68C3B7] focus:border-[#68C3B7]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Telefone</label>
                <input
                  type="text"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#68C3B7] focus:border-[#68C3B7]"
                  placeholder="Ex.: (11) 98765-4321"
                  required
                />
              </div>
            </>
          )}

          {/* Outros campos do formulário */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Serviço</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#68C3B7] focus:border-[#68C3B7]"
              required
            >
              <option value="">Selecione um serviço</option>
              {services.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profissional</label>
            <select
              value={formData.professional}
              onChange={(e) => setFormData({ ...formData, properofessional: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#68C3B7] focus:border-[#68C3B7]"
              required
            >
              <option value="">Selecione um profissional</option>
              {professionals.map((prof) => (
                <option key={prof.id} value={prof.name}>
                  {prof.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#68C3B7] focus:border-[#68C3B7]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Horário</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#68C3B7] focus:border-[#68C3B7]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#68C3B7] focus:border-[#68C3B7]"
              required
            >
              <option value="Agendado">Agendado</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-[#68C3B7] text-white px-4 py-2 rounded-lg hover:bg-[#5aa89d] transition-colors"
          >
            {isEditing ? "Salvar Alterações" : "Adicionar Agendamento"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  id: null,
                  clientName: "",
                  clientPhone: "",
                  service: "",
                  professional: "",
                  date: "",
                  time: "",
                  status: "Agendado",
                });
                setClientOption("existing");
              }}
              className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      {/* Modal de Confirmação */}
      {showModal && (
        <div className="fixed inset-0 h-screen bg-gray-300 bg-opacity-30 flex items-center justify-center z-[60]">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Agendamento concluído com sucesso!
            </h3>
            <button
              onClick={() => setShowModal(false)}
              className="bg-[#68C3B7] text-white px-4 py-2 rounded-lg hover:bg-[#5aa89d] transition-colors w-full"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Lista de Agendamentos */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de Agendamentos</h2>
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
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
                    Data: {appointment.date} | Horário: {appointment.time}
                  </p>
                </div>
                <div className="flex justify-end items-center space-x-2">
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
                  <button
                    onClick={() => handleEdit(appointment)}
                    className="text-[#68C3B7] hover:text-[#5aa89d] px-2 py-1"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="text-red-600 hover:text-red-700 px-2 py-1"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Nenhum agendamento cadastrado.</p>
        )}
      </div>
    </div>
  );
};

export default Appointments;