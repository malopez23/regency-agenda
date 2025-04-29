import { useState } from 'react';

const Professionals = () => {
  // Estado para gerenciar a lista de profissionais (dados fictícios)
  const [professionals, setProfessionals] = useState([
    { id: 1, name: "Ana Santos", specialty: "Corte e Coloração" },
    { id: 2, name: "Carlos Oliveira", specialty: "Barba e Corte Masculino" },
    { id: 3, name: "Beatriz Lima", specialty: "Manicure e Pedicure" },
  ]);

  // Estado para o formulário de adicionar/editar
  const [formData, setFormData] = useState({ id: null, name: "", specialty: "" });
  const [isEditing, setIsEditing] = useState(false);

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
                className="flex justify-between items-center p-4 border-b border-gray-200"
              >
                <div>
                  <p className="font-medium text-gray-800">{professional.name}</p>
                  <p className="text-sm text-gray-500">{professional.specialty}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(professional)}
                    className="text-[#68C3B7] hover:text-[#5aa89d]"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(professional.id)}
                    className="text-red-600 hover:text-red-700"
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