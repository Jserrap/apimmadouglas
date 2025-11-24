import { useState } from 'react';

type Props = {
  title: string;
  local?: string;
  venue?: string;
  date?: string;
  imageUrl?: string | null;
  fightsCount?: number;
  // opcional: se quiser forçar usar a imagem local que você subiu
  forceLocalImage?: boolean;
  localImagePath?: string; // ex: '/mnt/data/13ab4e44-f866-45e8-8812-0839bc6de169.png'
};

export default function EventCard({
  title,
  local,
  venue,
  date,
  imageUrl,
  fightsCount,
  forceLocalImage = false,
  localImagePath = '/mnt/data/13ab4e44-f866-45e8-8812-0839bc6de169.png',
}: Props) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // se forceLocalImage for true, usaremos o caminho local que você enviou
  const effectiveImage = forceLocalImage ? localImagePath : imageUrl;

  const dateStr = date ? new Date(date).toLocaleDateString() : '';

  const IconFallback = (
    <div className="w-full h-full flex items-center justify-center bg-neutral-700 text-neutral-300">
      {/* ícone simples e neutro */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 opacity-80" fill="currentColor">
        <path d="M12 2a3 3 0 1 1-3 3 3 3 0 0 1 3-3Zm0 7c-4 0-7 3-7 7v5h2v-5a5 5 0 0 1 10 0v5h2v-5c0-4-3-7-7-7Z" />
        <path d="M7 14h10v2H7z" />
      </svg>
    </div>
  );

  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 flex gap-4 items-center">
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-neutral-800">
        {/* Renderiza imagem SOMENTE se houver URL efetiva e não houve erro */}
        {effectiveImage && !imageError ? (
          <img
            src={effectiveImage}
            alt={title}
            className={`w-full h-full object-cover ${imageLoaded ? '' : 'hidden'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(false);
            }}
          />
        ) : (
          IconFallback
        )}

        {/* se a imagem existe mas ainda está carregando, mostramos um placeholder neutro */}
        {effectiveImage && !imageLoaded && !imageError && (
          <div className="absolute w-20 h-20 rounded-md flex items-center justify-center bg-neutral-700 text-neutral-400">
            <div className="w-8 h-8 rounded bg-neutral-600 animate-pulse" />
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="text-white font-semibold">{title}</div>
        <div className={`text-sm text-neutral-400`}>
          {local}{venue ? ` — ${venue}` : ''}
        </div>
        <div className="text-sm text-red-400 mt-2 font-semibold">
          {dateStr}
          <span className="text-neutral-400 ml-3">{fightsCount ?? 0} luta(s)</span>
        </div>
      </div>
    </div>
  );
}
