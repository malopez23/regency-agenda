import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Services = () => {
  // Usar dados do Context
  const { services, setServices } = useContext(AppContext);

  // Estado para o formulário de adicionar/editar
  const [formData, setFormData] = useState({ id: null, name: "", duration: "", price: "" });
  const [isEditing, setIsEditing] = useState(false);
  // Estado para controlar o modal
  const [showModal, setShowModal] = useState(false);
  // Estado para controle de carregamento
  const [loading, setLoading] = useState(true);

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 segundo de delay
    return () => clearTimeout(timer);
  }, []);

  // Função para adicionar ou editar um serviço
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Editar serviço existente
      setServices(
        services.map((service) =>
          service.id === formData.id
            ? { ...service, name: formData.name, duration: formData.duration, price: formData.price }
            : service
        )
      );
      setIsEditing(false);
    } else {
      // Adicionar novo serviço
      const newService = {
        id: services.length + 1,
        name: formData.name,
        duration: formData.duration,
        price: formData.price,
      };
      setServices([...services, newService]);
    }
    // Mostrar o modal após o envio
    setShowModal(true);
    setFormData({ id: null, name: "", duration: "", price: "" });
  };

  // Função para preencher o formulário ao editar
  const handleEdit = (service) => {
    setFormData(service);
    setIsEditing(true);
  };

  // Função para remover um serviço
  const handleDelete = (id) => {
    setServices(services.filter((service) => service.id !== id));
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
      <h1 className="text-3xl font-bold text-gray-900">Serviços</h1>

      {/* Formulário para Adicionar/Editar */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {isEditing ? "Editar Serviço" : "Adicionar Serviço"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome do Serviço</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#68C3B7] focus:border-[#68C3B7]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duração</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#68C3B7] focus:border-[#68C3B7]"
              placeholder="Ex.: 45 minutos"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preço (R$)</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#68C3B7] focus:border-[#68C3B7]"
              placeholder="Ex.: 80,00"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#68C3B7] text-white px-4 py-2 rounded-lg hover:bg-[#5aa89d] transition-colors"
          >
            {isEditing ? "Salvar Alterações" : "Adicionar Serviço"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData({ id: null, name: "", duration: "", price: "" });
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
              Serviço concluído com sucesso!
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

      {/* Lista de Serviços */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de Serviços</h2>
        {services.length > 0 ? (
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 border-b border-gray-200"
              >
                {/* Informações do Serviço */}
                <div className="md:col-span-2">
                  <p className="font-medium text-gray-800">{service.name}</p>
                  <div className="text-sm text-gray-500 flex flex-col md:flex-row md:space-x-2">
                    <span>Duração: {service.duration}</span>
                    <span className="hidden md:inline">|</span>
                    <span>Preço: R$ {service.price}</span>
                  </div>
                </div>
                {/* Botões Editar e Remover */}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-[#68C3B7] hover:text-[#5aa89d] px-2 py-1"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-red-600 hover:text-red-700 px-2 py-1"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Nenhum serviço cadastrado.</p>
        )}
      </div>
    </div>
  );
};

export default Services;