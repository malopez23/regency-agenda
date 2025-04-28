import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FiHome, FiCalendar, FiClock, FiUsers, FiScissors, FiMenu, FiX } from 'react-icons/fi';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-[#FBF8EF]">
      {/* Header para Mobile */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-gray-200 shadow-md z-50 flex items-center justify-between p-4">
        <button
          className="text-[#68C3B7]"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <div className="text-2xl font-bold text-[#68C3B7] flex-1 text-center">
          Regency Agenda
        </div>
        <div className="w-6" /> {/* Espaço vazio à direita para balancear o layout */}
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-200 text-gray-900 flex flex-col transform transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:w-64`}
      >
        <div className="p-4 text-2xl font-bold text-[#68C3B7] border-b border-gray-300 md:block hidden">
          Regency Agenda
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 p-4">
            <li>
              <NavLink
                to="/"
                className="flex items-center p-2 rounded-lg transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <FiHome
                      className={`mr-3 transition-colors ${
                        isActive ? 'text-[#68C3B7]' : 'group-hover:text-[#68C3B7]'
                      }`}
                    />
                    <span>Início</span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/agenda"
                className="flex items-center p-2 rounded-lg transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <FiCalendar
                      className={`mr-3 transition-colors ${
                        isActive ? 'text-[#68C3B7]' : 'group-hover:text-[#68C3B7]'
                      }`}
                    />
                    <span>Agenda</span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/appointments"
                className="flex items-center p-2 rounded-lg transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <FiClock
                      className={`mr-3 transition-colors ${
                        isActive ? 'text-[#68C3B7]' : 'group-hover:text-[#68C3B7]'
                      }`}
                    />
                    <span>Agendamentos</span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/professionals"
                className="flex items-center p-2 rounded-lg transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <FiUsers
                      className={`mr-3 transition-colors ${
                        isActive ? 'text-[#68C3B7]' : 'group-hover:text-[#68C3B7]'
                      }`}
                    />
                    <span>Profissionais</span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className="flex items-center p-2 rounded-lg transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <FiScissors
                      className={`mr-3 transition-colors ${
                        isActive ? 'text-[#68C3B7]' : 'group-hover:text-[#68C3B7]'
                      }`}
                    />
                    <span>Serviços</span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/clients"
                className="flex items-center p-2 rounded-lg transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <FiUsers
                      className={`mr-3 transition-colors ${
                        isActive ? 'text-[#68C3B7]' : 'group-hover:text-[#68C3B7]'
                      }`}
                    />
                    <span>Clientes</span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay para Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64 mt-16 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;