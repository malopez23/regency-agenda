import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-indigo-600 text-white p-4">
                <ul className="flex space-x-4">
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? 'font-bold underline' : ''}>
                        Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/agenda" className={({ isActive }) => isActive ? 'font-bold underline' : ''}>
                        Agenda
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/appointments" className={({ isActive }) => isActive ? 'font-bold underline' : ''}>
                        Agendamentos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/professionals" className={({ isActive }) => isActive ? 'font-bold underline' : ''}>
                        Profissionais
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/services" className={({ isActive }) => isActive ? 'font-bold underline' : ''}>
                        Serviços
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/clients" className={({ isActive }) => isActive ? 'font-bold underline' : ''}>
                        Clientes
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;