import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Clients = () => {
  // Usar dados do Context
  const { clients, setClients } = useContext(AppContext);

  // Estado para o formulário de adicionar/editar
  const [formData, setFormData] = useState({ id: null, name: "", phone: "" });
  const [isEditing, setIsEditing] = useState(false);
  // Estado para controlar o modal
  const [showModal, setShowModal] = useState(false);

  // Função para adicionar ou editar um cliente
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Editar cliente existente
      setClients(
        clients.map((client) =>
          client.id === formData.id
            ? { ...client, name: formData.name, phone: formData.phone }
            : client
        )
      );
      setIsEditing(false);
    } else {
      // Adicionar novo cliente
      const newClient = {
        id: clients.length + 1,
        name: formData.name,
        phone: formData.phone,
      };
      setClients([...clients, newClient]);
    }
    // Mostrar o modal após o envio
    setShowModal(true);
    setFormData({ id: null, name: "", phone: "" });
  };

  // Função para preencher o formulário ao editar
  const handleEdit = (client) => {
    setFormData(client);
    setIsEditing(true);
  };

  // Função para remover um cliente
  const handleDelete = (id) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>

      {/* Formulário para Adicionar/Editar */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {isEditing ? "Editar Cliente" : "Adicionar Cliente"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome do Cliente</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#68C3B7] focus:border-[#68C3B7]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Telefone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#68C3B7] focus:border-[#68C3B7]"
              placeholder="Ex.: (11) 98765-4321"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#68C3B7] text-white px-4 py-2 rounded-lg hover:bg-[#5aa89d] transition-colors"
          >
            {isEditing ? "Salvar Alterações" : "Adicionar Cliente"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData({ id: null, name: "", phone: "" });
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
              Cliente adicionado com sucesso!
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

      {/* Lista de Clientes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de Clientes</h2>
        {clients.length > 0 ? (
          <div className="space-y-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 border-b border-gray-200"
              >
                <div className="md:col-span-2">
                  <p className="font-medium text-gray-800">{client.name}</p>
                  <p className="text-sm text-gray-500">Telefone: {client.phone}</p>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(client)}
                    className="text-[#68C3B7] hover:text-[#5aa89d] px-2 py-1"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="text-red-600 hover:text-red-700 px-2 py-1"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Nenhum cliente cadastrado.</p>
        )}
      </div>
    </div>
  );
};

export default Clients;