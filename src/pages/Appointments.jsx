import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Appointments = () => {
  // Usar dados do Context
  const { professionals, services, appointments, setAppointments } = useContext(AppContext);

  // Estado para o formulário de adicionar/editar
  const [formData, setFormData] = useState({
    id: null,
    clientName: "",
    service: "",
    professional: "",
    date: "",
    time: "",
    status: "Agendado",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Função para adicionar ou editar um agendamento
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Editar agendamento existente
      setAppointments(
        appointments.map((appt) =>
          appt.id === formData.id ? { ...formData } : appt
        )
      );
      setIsEditing(false);
    } else {
      // Adicionar novo agendamento
      const newAppointment = {
        id: appointments.length + 1,
        ...formData,
      };
      setAppointments([...appointments, newAppointment]);
    }
    setFormData({
      id: null,
      clientName: "",
      service: "",
      professional: "",
      date: "",
      time: "",
      status: "Agendado",
    });
  };

  // Função para preencher o formulário ao editar
  const handleEdit = (appointment) => {
    setFormData(appointment);
    setIsEditing(true);
  };

  // Função para remover um agendamento
  const handleDelete = (id) => {
    setAppointments(appointments.filter((appt) => appt.id !== id));
  };

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
              onChange={(e) => setFormData({ ...formData, professional: e.target.value })}
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
                  service: "",
                  professional: "",
                  date: "",
                  time: "",
                  status: "Agendado",
                });
              }}
              className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

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