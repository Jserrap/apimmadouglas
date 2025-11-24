import { NavLink } from 'react-router-dom';
import { FiUsers, FiActivity, FiCalendar, FiHome } from 'react-icons/fi';
import type { JSX } from 'react/jsx-runtime';

export default function Sidebar(): JSX.Element {
  return (
    <aside className="w-64 bg-neutral-900 text-neutral-200 min-h-screen hidden md:block">
      <div className="p-4 border-b border-neutral-800 flex items-center gap-3">
        <img src="" alt="logo" className="w-10 h-10 rounded-md object-cover" />
        <div>
          <div className="text-white font-semibold">MMA Manager</div>
          <div className="text-xs text-neutral-400">Gerenciador de Eventos</div>
        </div>
      </div>

      <nav className="p-4 space-y-1">
        <NavLink
          to="/"
          end
          className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded ${isActive ? 'bg-red-600 text-white' : 'text-neutral-300 hover:bg-neutral-800'}`}>
          <FiHome /> <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/lutadores"
          className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded ${isActive ? 'bg-red-600 text-white' : 'text-neutral-300 hover:bg-neutral-800'}`}>
          <FiUsers /> <span>Lutadores</span>
        </NavLink>

        <NavLink
          to="/lutas"
          className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded ${isActive ? 'bg-red-600 text-white' : 'text-neutral-300 hover:bg-neutral-800'}`}>
          <FiActivity /> <span>Lutas</span>
        </NavLink>

        <NavLink
          to="/cards"
          className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded ${isActive ? 'bg-red-600 text-white' : 'text-neutral-300 hover:bg-neutral-800'}`}>
          <FiCalendar /> <span>Cards</span>
        </NavLink>
      </nav>
    </aside>
  );
}
