import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Estado para gerenciar profissionais
  const [professionals, setProfessionals] = useState([
    { id: 1, name: "Ana Santos", specialty: "Corte e Coloração" },
    { id: 2, name: "Carlos Oliveira", specialty: "Barba e Corte Masculino" },
    { id: 3, name: "Beatriz Lima", specialty: "Manicure e Pedicure" },
  ]);

  // Estado para gerenciar serviços
  const [services, setServices] = useState([
    { id: 1, name: "Corte Feminino", duration: "45 minutos", price: "80,00" },
    { id: 2, name: "Barba", duration: "30 minutos", price: "40,00" },
    { id: 3, name: "Manicure", duration: "60 minutos", price: "50,00" },
  ]);

  // Estado para gerenciar agendamentos
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      clientName: "Maria Silva",
      service: "Corte Feminino",
      professional: "Ana Santos",
      date: "2025-04-29",
      time: "09:00",
      status: "Confirmado",
    },
    {
      id: 2,
      clientName: "João Pedro",
      service: "Barba",
      professional: "Carlos Oliveira",
      date: "2025-04-29",
      time: "10:30",
      status: "Agendado",
    },
    {
      id: 3,
      clientName: "Paula Mendes",
      service: "Manicure",
      professional: "Beatriz Lima",
      date: "2025-04-29",
      time: "14:00",
      status: "Concluído",
    },
  ]);

  return (
    <AppContext.Provider
      value={{
        professionals,
        setProfessionals,
        services,
        setServices,
        appointments,
        setAppointments,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};