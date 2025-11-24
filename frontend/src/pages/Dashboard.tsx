import { useEffect, useState } from 'react';
import { apiGet } from '../lib/api';
import StatCard from '../components/StatCards';
import EventCard from '../components/EventCards';
import { FiUsers, FiActivity, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import type { JSX } from 'react/jsx-runtime';

type Lutador = { id: number | string; nome?: string; [k: string]: any; };
type Luta = { id: number | string; nome?: string; data?: string; local?: string; [k: string]: any; };
type Card = { id: number | string; nome?: string; data?: string; imagem?: string; [k: string]: any; };

export default function Dashboard(): JSX.Element {
  const [lutadores, setLutadores] = useState<Lutador[]|null>(null);
  const [lutas, setLutas] = useState<Luta[]|null>(null);
  const [cards, setCards] = useState<Card[]|null>(null);
  const [loading, setLoading] = useState(true);
  const coverDefault = '/mnt/data/13ab4e44-f866-45e8-8812-0839bc6de169.png';

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    Promise.all([
      apiGet<Lutador[]>('/lutadores').catch(() => []),
      apiGet<Luta[]>('/lutas').catch(() => []),
      apiGet<Card[]>('/cards').catch(() => []),
    ]).then(([lut, lutasRes, crd]) => {
      if (!mounted) return;
      setLutadores(lut);
      setLutas(lutasRes);
      setCards(crd);
    }).finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const count = (arr: any[]|null) => (arr ? arr.length : 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-neutral-400">Visão geral do gerenciador de MMA</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total de Lutadores" value={loading ? '...' : count(lutadores)} icon={<FiUsers />} />
        <StatCard title="Lutas Agendadas" value={loading ? '...' : count(lutas)} icon={<FiActivity />} />
        <StatCard title="Cards Criados" value={loading ? '...' : count(cards)} icon={<FiCalendar />} />
        <StatCard title="Próximos Eventos" value={loading ? '...' : (lutas && lutas.length > 0 ? count(lutas) : 0)} icon={<FiTrendingUp />} />
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Próximos Eventos</h2>

        {loading && <div className="text-neutral-400">Carregando...</div>}

        {!loading && (!cards || cards.length === 0) && (
          <div className="text-neutral-400">Nenhum evento encontrado.</div>
        )}

        {!loading && cards && cards.length > 0 && (
          <div className="space-y-4">
            {cards.map((c) => (
              <EventCard
                key={c.id}
                title={c.nome ?? c.title ?? `Evento ${c.id}`}
                local={c.local ?? c.cidade ?? ''}
                venue={c.venue ?? ''}
                date={c.data ?? c.date}
                imageUrl={c.imagem ?? c.cover ?? coverDefault}
                fightsCount={c.lutas_count ?? 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
