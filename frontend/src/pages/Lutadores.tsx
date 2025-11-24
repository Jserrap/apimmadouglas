import { useEffect, useState } from 'react';
import { apiGet } from '../lib/api';
import LutadorCard from '../components/LutadorCard';
import type { JSX } from 'react/jsx-runtime';

type Lutador = {
  id: number | string;
  nome?: string;
  apelido?: string;
  pais?: string;
  categoria?: string;
  cartel?: string;
  avatar?: string | null;
  [k: string]: any;
};

export default function Lutadores(): JSX.Element {
  const [data, setData] = useState<Lutador[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    apiGet<Lutador[]>('/lutadores')
      .then((res) => {
        if (!mounted) return;
        // normaliza envelope { data: [...] } se for o caso
        const normalized = (res && (res as any).data) ? (res as any).data : res;
        setData(normalized);
        setError(null);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || 'Erro ao buscar lutadores');
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  // Placeholders simples para loading
  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Lutadores</h1>
            <p className="text-neutral-400">Gerencie os lutadores cadastrados</p>
          </div>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md">+ Adicionar Lutador</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-80 bg-neutral-800 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Lutadores</h1>
          <p className="text-neutral-400">Gerencie os lutadores cadastrados</p>
        </div>
        <button className="px-4 py-2 bg-red-600 text-white rounded-md">+ Adicionar Lutador</button>
      </div>

      {error && <div className="text-red-500 mb-4">Erro: {error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(data || []).map((l) => (
          <LutadorCard
            key={l.id}
            id={l.id}
            nome={l.nome}
            apelido={l.apelido}
            pais={l.pais}
            categoria={l.categoria}
            cartel={l.cartel}
            avatarUrl={l.avatar ?? null}
            onEdit={(id) => {
              // hook: aqui você pode abrir modal ou navegar para /lutadores/:id/edit
              console.log('editar', id);
              // ex: navigate(`/lutadores/${id}/edit`)
            }}
            onDelete={(id) => {
              // hook: chamar API de delete e atualizar lista
              if (!confirm('Confirmar exclusão do lutador?')) return;
              // exemplo rápido: remova localmente (melhor implementar DELETE no backend)
              setData((prev) => prev ? prev.filter(item => item.id !== id) : prev);
            }}
          />
        ))}
      </div>

      {(!data || data.length === 0) && <div className="text-neutral-400 mt-6">Nenhum lutador encontrado.</div>}
    </div>
  );
}
