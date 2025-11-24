import { FiEdit, FiTrash2 } from 'react-icons/fi';

type Props = {
  id: number | string;
  nome?: string;
  apelido?: string;
  pais?: string;
  categoria?: string;
  cartel?: string;
  avatarUrl?: string | null;
  onEdit?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
};

export default function LutadorCard({
  id,
  nome,
  apelido,
  pais,
  categoria,
  cartel,
  onEdit,
  onDelete,
}: Props) {
  // fallback local image (sua imagem enviada)

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-card">
      <div className="h-44 w-full relative bg-neutral-800">
        {/* imagem: se falhar, o CSS vai esconder o broken-icon e mostramos fundo */}
        <img
            src="/lutador.jpg"
            alt={nome}
            className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg text-white font-semibold">{nome}</h3>
        {apelido && <div className="text-sm text-neutral-400">"{apelido}"</div>}

        <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
          <div className="text-neutral-400">País:</div>
          <div className="text-right text-neutral-200">{pais ?? '-'}</div>

          <div className="text-neutral-400">Categoria:</div>
          <div className="text-right text-neutral-200">{categoria ?? '-'}</div>

          <div className="text-neutral-400">Cartel:</div>
          <div className="text-right text-neutral-200">{cartel ?? '-'}</div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => onEdit?.(id)}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-neutral-100 rounded-md flex-1 hover:bg-neutral-700"
            title="Editar"
          >
            <FiEdit /> <span className="text-sm">Editar</span>
          </button>

          <button
            onClick={() => onDelete?.(id)}
            className="w-10 h-10 inline-flex items-center justify-center bg-neutral-800 rounded-md text-red-400 hover:bg-neutral-700"
            title="Excluir"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
}
