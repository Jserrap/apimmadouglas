import { NavLink } from 'react-router-dom';
import type { JSX } from 'react/jsx-runtime';

export default function Navbar(): JSX.Element {
  return (
    <header className="bg-white border-b">
      <div className="container-max mx-auto flex items-center justify-between h-16">
        <NavLink to="/" className="flex items-center gap-3">
          {/* se quiser usar sua imagem como logo, descomente a linha de <img> e comente o bloco MMA */}
          {/* <img src="/mnt/data/99e1090d-0494-41b9-b2ad-775b962da898.png" alt="logo" className="w-10 h-10 rounded-md object-cover" /> */}
          <div className="w-10 h-10 bg-primary-500 rounded-md flex items-center justify-center text-white font-semibold">MMA</div>
          <div>
            <div className="text-lg font-semibold text-gray-900">Projeto MMA</div>
            <div className="text-xs text-gray-500 -mt-0.5">Dashboard mínimo</div>
          </div>
        </NavLink>

        <nav className="flex items-center gap-4 text-sm">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `px-3 py-1 rounded ${isActive ? 'bg-primary-50 text-primary-600 font-medium' : 'hover:bg-neutral-100'}`}
          >Home</NavLink>

          <NavLink
            to="/cards"
            className={({ isActive }) => `px-3 py-1 rounded ${isActive ? 'bg-primary-50 text-primary-600 font-medium' : 'hover:bg-neutral-100'}`}
          >Cards</NavLink>

          <NavLink
            to="/lutas"
            className={({ isActive }) => `px-3 py-1 rounded ${isActive ? 'bg-primary-50 text-primary-600 font-medium' : 'hover:bg-neutral-100'}`}
          >Lutas</NavLink>

          <NavLink
            to="/lutadores"
            className={({ isActive }) => `px-3 py-1 rounded ${isActive ? 'bg-primary-50 text-primary-600 font-medium' : 'hover:bg-neutral-100'}`}
          >Lutadores</NavLink>
        </nav>
      </div>
    </header>
  );
}
