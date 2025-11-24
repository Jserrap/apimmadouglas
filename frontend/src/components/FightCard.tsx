import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

type Fighter = {
  id: number | string;
  nome?: string;
  apelido?: string;
  pais?: string;
  categoria?: string;
  cartel?: string;
  avatar?: string | null;
};

type Props = {
  id: number | string;
  fighterA: Fighter;
  fighterB: Fighter;
  weight?: string;
  rounds?: number;
  main?: boolean;
  titleFight?: boolean;
  onEdit?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
  // força usar a imagem local para evitar broken images se desejar
  forceLocalImage?: boolean;
  localImagePath?: string;
};

export default function FightCard({
  id,
  fighterA,
  fighterB,
  weight,
  rounds = 3,
  main = false,
  titleFight = false,
  onEdit,
  onDelete,
  forceLocalImage = false,
  localImagePath = '/mnt/data/26356911-5a79-4209-81d7-59d1ef6d0a53.png',
}: Props) {
  // fallback para imagens
  const [errA, setErrA] = useState(false);
  const [errB, setErrB] = useState(false);

  const srcA = forceLocalImage ? localImagePath : (fighterA.avatar ?? localImagePath);
  const srcB = forceLocalImage ? localImagePath : (fighterB.avatar ?? localImagePath);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {main && <span className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full mr-2">Luta Principal</span>}
          {titleFight && <span className="inline-block bg-yellow-600 text-black text-xs px-3 py-1 rounded-full">Luta de Título</span>}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => onEdit?.(id)} className="p-2 bg-neutral-800 rounded-md hover:bg-neutral-700"><FiEdit /></button>
          <button onClick={() => onDelete?.(id)} className="p-2 bg-neutral-800 rounded-md hover:bg-neutral-700 text-red-400"><FiTrash2 /></button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-6">
        {/* Fighter A */}
        <div className="w-48 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-neutral-800 flex-shrink-0">
            {!errA ? (
              <img
                src={srcA}
                alt={fighterA.nome}
                className="w-full h-full object-cover"
                onError={(e) => { setErrA(true); (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-700 text-neutral-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                  <path d="M12 2a3 3 0 1 1-3 3 3 3 0 0 1 3-3Zm0 7c-4 0-7 3-7 7v5h2v-5a5 5 0 0 1 10 0v5h2v-5c0-4-3-7-7-7Z" />
                </svg>
              </div>
            )}
          </div>

          <div>
            <div className="text-sm text-neutral-300 font-semibold">{fighterA.nome}</div>
            <div className="text-xs text-neutral-400"> {fighterA.apelido ? `"${fighterA.apelido}"` : ''} </div>
            <div className="text-xs text-neutral-500 mt-2">{fighterA.cartel ?? ''}</div>
            <div className="text-xs text-neutral-500">{fighterA.pais ?? ''}</div>
          </div>
        </div>

        {/* Center VS */}
        <div className="flex-1 text-center">
          <div className="text-red-400 font-bold text-lg">VS</div>
          <div className="text-sm text-neutral-400 mt-2">{weight ?? 'Peso não informado'}</div>
          <div className="text-xs text-neutral-500">{rounds} rounds</div>
        </div>

        {/* Fighter B */}
        <div className="w-48 flex items-center gap-4 justify-end">
          <div className="text-right">
            <div className="text-sm text-neutral-300 font-semibold">{fighterB.nome}</div>
            <div className="text-xs text-neutral-400"> {fighterB.apelido ? `"${fighterB.apelido}"` : ''} </div>
            <div className="text-xs text-neutral-500 mt-2">{fighterB.cartel ?? ''}</div>
            <div className="text-xs text-neutral-500">{fighterB.pais ?? ''}</div>
          </div>

          <div className="w-20 h-20 rounded-full overflow-hidden bg-neutral-800 flex-shrink-0">
            {!errB ? (
              <img
                src={srcB}
                alt={fighterB.nome}
                className="w-full h-full object-cover"
                onError={(e) => { setErrB(true); (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-700 text-neutral-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                  <path d="M12 2a3 3 0 1 1-3 3 3 3 0 0 1 3-3Zm0 7c-4 0-7 3-7 7v5h2v-5a5 5 0 0 1 10 0v5h2v-5c0-4-3-7-7-7Z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
