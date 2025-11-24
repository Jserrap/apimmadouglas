import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <section className="bg-white rounded-lg border p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Projeto MMA</h1>
        <p className="text-gray-600 mb-4">Painel mínimo para navegar entre Cards, Lutas e Lutadores. Interface leve e responsiva.</p>

        <div className="flex flex-wrap gap-3">
          <Link to="/cards" className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">Ver Cards</Link>
          <Link to="/lutas" className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-neutral-50">Ver Lutas</Link>
          <Link to="/lutadores" className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-neutral-50">Ver Lutadores</Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold mb-2">Visão rápida</h3>
          <p className="text-sm text-gray-600">Acesse rapidamente os dados principais do backend e navegue entre as páginas.</p>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold mb-2">Conectar API</h3>
          <p className="text-sm text-gray-600">As rotas são <code className="text-xs bg-neutral-100 px-1 rounded">/api/cards</code>, <code className="text-xs bg-neutral-100 px-1 rounded">/api/lutas</code> e <code className="text-xs bg-neutral-100 px-1 rounded">/api/lutadores</code>.</p>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold mb-2">Ajuda rápida</h3>
          <p className="text-sm text-gray-600">Se algo estiver vazio, verifique o back (CORS / DB) e as respostas JSON.</p>
        </div>
      </section>
    </div>
  );
}
