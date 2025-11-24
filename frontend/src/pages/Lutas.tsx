// front/src/pages/Lutas.tsx
import { useEffect, useState } from 'react';
import { apiGet } from '../lib/api';
import Card from '../components/Card'; // componente atualizado (dark por padrão)
import type { JSX } from 'react/jsx-runtime';

type LutaRaw = any;
type Luta = {
  id: number | string;
  nome?: string;
  local?: string;
  data?: string;
  peso?: string;
  rounds?: number;
  lutadores?: any[];
  [k: string]: any;
};

export default function Lutas(): JSX.Element {
  const [data, setData] = useState<Luta[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    apiGet<Luta[]>('/lutas')
      .then((res) => {
        if (!mounted) return;
        const normalized: Luta[] = (res && (res as any).data) ? (res as any).data : (res as any);
        const mapped = (normalized || []).map((l: LutaRaw) => ({
          id: l.id ?? l._id ?? Math.random(),
          nome: l.nome ?? l.title ?? l.titulo ?? `Luta ${l.id ?? ''}`,
          local: l.local ?? l.cidade ?? '',
          data: l.data ?? l.date ?? l.data_evento ?? null,
          peso: l.peso ?? l.categoria ?? '',
          rounds: l.rounds ?? l.rodadas ?? 3,
          lutadores: l.lutadores ?? l.fighters ?? l.participantes ?? [],
          ...l,
        }));
        setData(mapped);
        setError(null);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message ?? 'Erro ao buscar lutas');
        setData(null);
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, []);

  const formatDate = (d?: string | null) => {
    if (!d) return '';
    try { return new Date(d).toLocaleDateString(); } catch { return String(d); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Lutas</h1>
          <p className="text-neutral-400">Gerencie as lutas cadastradas</p>
        </div>
        <button className="px-4 py-2 bg-red-600 text-white rounded-md">+ Adicionar Luta</button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-neutral-800 rounded-lg animate-pulse" />
          ))}
        </div>
      )}

      {error && <div className="text-red-500 mb-4">Erro: {error}</div>}

      {!loading && !error && (
        <>
          {data && data.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {data.map((l) => (
                <Card
                  key={l.id}
                  title={l.nome}
                  subtitle={`${formatDate(l.data)} ${l.peso ? `— ${l.peso}` : ''}`}
                >
                  <div className="flex items-center justify-between text-sm text-neutral-300">
                    <div>
                      {Array.isArray(l.lutadores) && l.lutadores.length > 0 ? (
                        <div className="text-sm text-neutral-300">
                          {l.lutadores.map((f: any, idx: number) => (
                            <span key={idx} className="mr-2">{(f.nome ?? f.name ?? f)}</span>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-neutral-400">ID: {l.id}</div>
                      )}
                    </div>

                    <div className="text-sm text-neutral-400">Rounds: {l.rounds ?? 3}</div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-neutral-400">Nenhuma luta encontrada.</div>
          )}
        </>
      )}
    </div>
  );
}
