import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { JSX } from 'react/jsx-runtime';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Home = lazy(() => import('../pages/Home'));
const Cards = lazy(() => import('../pages/Cards'));
const Lutas = lazy(() => import('../pages/Lutas'));
const Lutadores = lazy(() => import('../pages/Lutadores'));

function NotFound(): JSX.Element {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-semibold mb-4">404 — Página não encontrada</h2>
      <p className="text-gray-600 mb-6">A rota que você tentou acessar não existe.</p>
      <a href="/" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Voltar para Home</a>
    </div>
  );
}

function LoadingFallback(): JSX.Element {
  return (
    <div className="py-12 flex items-center justify-center">
      <div className="text-gray-500 text-sm">Carregando...</div>
    </div>
  );
}

export default function AppRoutes(): JSX.Element {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/lutas" element={<Lutas />} />
        <Route path="/lutadores" element={<Lutadores />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
