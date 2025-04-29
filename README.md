# 💇‍♀️ Regency - Agenda Inteligênte
Uma aplicação web moderna para gerenciamento de agendamentos de um salão de beleza, com múltiplos profissionais, desenvolvida em React + Vite.

## ✨ Funcionalidades
Cadastro de Profissionais: Nome, função, cor de identificação, horário de trabalho.

Cadastro de Serviços: Nome, descrição, duração, preço e categoria.

Cadastro de Clientes: Nome, telefone, email (opcional) e observações.

Agendamento de Horários:

Seleção de profissional, serviço, data e horário disponível.

Associação do agendamento ao cliente.

Status de agendamento: Agendado, Confirmado, Concluído e Cancelado.

Visualização de Agenda:

Visualização diária e semanal.

Filtros por profissional.

Detalhes dos agendamentos (cliente, serviço, horário, profissional).

Gerenciamento de Agendamentos:

Remarcar, cancelar e alterar status.

Dashboard:

Estatísticas e agendamentos do dia.

## 🖥️ Estrutura de Páginas
Dashboard: Visão geral e estatísticas.

Agenda: Visualização detalhada diária/semanal.

Agendamentos: Lista e gerenciamento de agendamentos.

Profissionais: Cadastro e listagem de profissionais.

Serviços: Cadastro e listagem de serviços.

Clientes: Cadastro e listagem de clientes.

## 📋 Regras de Negócio
Um agendamento pertence a apenas um profissional.

Um profissional não pode ter dois agendamentos no mesmo horário.

A duração do serviço é considerada para evitar conflitos.

Disponibilidade do profissional deve ser validada antes do agendamento.

Cada agendamento possui um status: Agendado, Confirmado, Concluído ou Cancelado.

## 🛠️ Tecnologias Utilizadas
React + Vite — Estrutura do projeto e desempenho otimizado.

TailwindCSS — Estilização moderna e responsiva.

React Hook Form — Gerenciamento de formulários.

date-fns — Manipulação de datas e horários.

LocalStorage — Persistência de dados para prototipagem rápida.

## 🎯 Extras
Visualização de calendário semanal/mensal.

Notificações visuais para status de agendamentos.

Estatísticas dos serviços mais realizados.

Exportação de relatórios.

## 📱 Design da Interface
Responsivo para celulares e desktops.

Sistema de cores para:

Identificar profissionais.

Representar o status dos agendamentos.

Interface amigável e moderna.

Botões de ação para interagir diretamente com cada agendamento.

## 🧹 Boas Práticas
Código limpo e organizado.

Componentes reutilizáveis.

Separação clara de responsabilidades.

Utilização de boas práticas de React e arquitetura escalável.

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório
`https://github.com/malopez23/regency-agenda.git`

### 2. Acesse a pasta do projeto
`cd regency-agenda`

### 3. Instale as dependências
`npm install`

### 4. Rode o projeto
`npm run dev`

A aplicação estará disponível em http://localhost:5173.