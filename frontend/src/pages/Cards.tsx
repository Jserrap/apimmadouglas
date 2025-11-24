import { useEffect, useState } from 'react';
import { apiGet } from '../lib/api';
import Card from '../components/Card';
import type { JSX } from 'react/jsx-runtime';

type CardType = { id: number | string; title?: string; subtitle?: string; nome?: string; data?: string; [k: string]: any; };

function formatDate(d?: string) {
  if (!d) return '';
  try { return new Date(d).toLocaleString(); } catch { return d; }
}

export default function Cards(): JSX.Element {
  const [data, setData] = useState<CardType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    apiGet<CardType[]>('/cards')
      .then((res) => { if (!mounted) return; setData(res); setError(null); })
      .catch((err) => { if (!mounted) return; setError(err.message || 'Erro ao buscar cards'); })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Cards</h2>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg animate-pulse h-28" />
          ))}
        </div>
      )}

      {error && <p className="text-red-500">Erro: {error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data || []).map((card) => (
            <Card
              key={card.id}
              title={card.nome ?? card.title ?? `Card ${card.id}`}
              subtitle={card.subtitle ?? (card.data ? formatDate(card.data) : '')}
              // meta={card}
            >
              {/* resumo compacto: exibição de campos chave */}
              <div className="text-xs text-gray-600">
                {card.categoria && <div>Categoria: {card.categoria}</div>}
                {card.local && <div>Local: {card.local}</div>}
                {card.data && <div>Data: {formatDate(card.data)}</div>}
              </div>
            </Card>
          ))}
        </div>
      )}

      {data && data.length === 0 && <p className="text-gray-500 mt-4">Nenhum card encontrado.</p>}
    </div>
  );
}
