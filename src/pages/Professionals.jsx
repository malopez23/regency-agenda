import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Professionals = () => {
  // Usar dados do Context
  const { professionals, setProfessionals } = useContext(AppContext);

  // Estado para o formulário de adicionar/editar
  const [formData, setFormData] = useState({ id: null, name: "", specialty: "" });
  const [isEditing, setIsEditing] = useState(false);
  // Estado para controle de carregamento
  const [loading, setLoading] = useState(true);

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 segundo de delay
    return () => clearTimeout(timer);
  }, []);

  // Função para adicionar ou editar um profissional
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Editar profissional existente
      setProfessionals(
        professionals.map((prof) =>
          prof.id === formData.id
            ? { ...prof, name: formData.name, specialty: formData.specialty }
            : prof
        )
      );
      setIsEditing(false);
    } else {
      // Adicionar novo profissional
      const newProfessional = {
        id: professionals.length + 1,
        name: formData.name,
        specialty: formData.specialty,
      };
      setProfessionals([...professionals, newProfessional]);
    }
    setFormData({ id: null, name: "", specialty: "" });
  };

  // Função para preencher o formulário ao editar
  const handleEdit = (professional) => {
    setFormData(professional);
    setIsEditing(true);
  };

  // Função para remover um profissional
  const handleDelete = (id) => {
    setProfessionals(professionals.filter((prof) => prof.id !== id));
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
      <h1 className="text-3xl font-bold text-gray-900">Profissionais</h1>

      {/* Formulário para Adicionar/Editar */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {isEditing ? "Editar Profissional" : "Adicionar Profissional"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#68C3B7] focus:border-[#68C3B7]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Especialidade</label>
            <input
              type="text"
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#68C3B7] focus:border-[#68C3B7]"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#68C3B7] text-white px-4 py-2 rounded-lg hover:bg-[#5aa89d] transition-colors"
          >
            {isEditing ? "Salvar Alterações" : "Adicionar Profissional"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData({ id: null, name: "", specialty: "" });
              }}
              className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      {/* Lista de Profissionais */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de Profissionais</h2>
        {professionals.length > 0 ? (
          <div className="space-y-4">
            {professionals.map((professional) => (
              <div
                key={professional.id}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 border-b border-gray-200"
              >
                <div className="md:col-span-2">
                  <p className="font-medium text-gray-800">{professional.name}</p>
                  <p className="text-sm text-gray-500">
                    Especialidade: {professional.specialty}
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(professional)}
                    className="text-[#68C3B7] hover:text-[#5aa89d] px-2 py-1"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(professional.id)}
                    className="text-red-600 hover:text-red-700 px-2 py-1"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Nenhum profissional cadastrado.</p>
        )}
      </div>
    </div>
  );
};

export default Professionals;