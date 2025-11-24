import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.luta.deleteMany();
  await prisma.card.deleteMany();
  await prisma.lutador.deleteMany();

  const lutadoresData = [
    { nome: 'José Aldo', pais: 'Brasil', categoria: 'Peso Pena' },
    { nome: 'Conor McGregor', pais: 'Irlanda', categoria: 'Peso Leve' },
    { nome: 'Khabib Nurmagomedov', pais: 'Rússia', categoria: 'Peso Leve' },
    { nome: 'Amanda Nunes', pais: 'Brasil', categoria: 'Peso Galo' },
    { nome: 'Israel Adesanya', pais: 'Nigéria', categoria: 'Peso Médio' },
    { nome: 'Jon Jones', pais: 'EUA', categoria: 'Peso Meio-Pesado' }
  ];

  const createdLutadores = [];
  for (const l of lutadoresData) {
    const created = await prisma.lutador.create({ data: l });
    createdLutadores.push(created);
  }

  // 2) CARDS
  const cardsData = [
    { nome: 'UFC 300', data: new Date('2024-10-03T19:00:00Z') },
    { nome: 'UFC 301', data: new Date('2024-11-15T20:00:00Z') }
  ];

  const createdCards = [];
  for (const c of cardsData) {
    const created = await prisma.card.create({ data: c });
    createdCards.push(created);
  }

  // 3) LUTAS (ligando por IDs)
  // cria algumas lutas usando os lutadores e cards criados acima
  const lutasData = [
    {
      lutadorAId: createdLutadores[0].id, // José Aldo
      lutadorBId: createdLutadores[1].id, // Conor
      cardId: createdCards[0].id,
      resultado: 'nocaute'
    },
    {
      lutadorAId: createdLutadores[2].id, // Khabib
      lutadorBId: createdLutadores[1].id, // Conor
      cardId: createdCards[0].id,
      resultado: 'finalização'
    },
    {
      lutadorAId: createdLutadores[3].id, // Amanda
      lutadorBId: createdLutadores[4].id, // Israel
      cardId: createdCards[1].id,
      resultado: 'decisão'
    },
    {
      lutadorAId: createdLutadores[5].id, // Jon Jones
      lutadorBId: createdLutadores[4].id, // Israel
      cardId: createdCards[1].id,
      resultado: 'sem resultado'
    },
    {
      lutadorAId: createdLutadores[0].id,
      lutadorBId: createdLutadores[3].id,
      cardId: createdCards[0].id,
      resultado: 'decisão'
    },
    {
      lutadorAId: createdLutadores[1].id,
      lutadorBId: createdLutadores[5].id,
      cardId: createdCards[1].id,
      resultado: 'nocaute'
    }
  ];

  for (const l of lutasData) {
    await prisma.luta.create({ data: l });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
