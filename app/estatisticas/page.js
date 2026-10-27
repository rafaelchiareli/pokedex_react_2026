import Link from 'next/link'
import { prisma } from '../../lib/prisma'
import CartaoNumero from '../components /CartaoNumero';
import GraficoTipos from '../components /GraficoTipos';
import MaisVistos from '../components /MaisVistos';
import AcoesEmMassa from '../components /AcoesEmMassa';



export const dynamic = 'force-dynamic';

export default async function Estatisticas({ searchParams }) {
    const { soltos, zerados } = await searchParams;
    //1 contagens simples
    const total = await prisma.pokemon.count();
    const totalShiny = await prisma.pokemon.count({
        where: { shiny: true }
    });
    const totalFavoritos = await prisma.pokemon.count({
        where: { favorito: true }
    });
    const totalVistos = await prisma.visto.count();

    //especies diferentes
    const especies = await prisma.pokemon.groupBy({
        by: ["pokeId"]
    });

    //vitorias
    const vitorias = await prisma.pokemon.aggregate({
        _sum: { vitorias: true },
        _max: { vitorias: true }
    });

    //quantos pokemons de cada tipo
    const porTipo = await prisma.pokemon.groupBy({
        by: ["tipo"],
        _count: { tipo: true },
        orderBy: { _count: { tipo: "desc" } }
    });

    //pokemons mais buscados
    const maisVistos = await prisma.visto.findMany({
        orderBy: { vezes: "desc" },
        take: 5
    });

    return (
        <main>
            <Link href="/"> Voltar para a Home</Link>
            <h1>Estatisticas</h1>
            {soltos && <p className='Aviso'>{soltos} Pokemon foram soltos</p>}
            {zerados && <p className='Aviso'>o ranking de {zerados} foi reiniciado</p>}
            <div className='numeros'>
                <CartaoNumero titulo="Capturados" valor={total} />
                <CartaoNumero titulo="Espécies" valor={especies.length} />
                <CartaoNumero titulo="Vistos" valor={totalVistos} />
                <CartaoNumero titulo="Shiny" valor={totalShiny} />
                <CartaoNumero titulo="Favoritos" valor={totalFavoritos} />
                <CartaoNumero titulo="Batahas vencidades" valor={vitorias._sum.vitorias ?? 0} />
                <CartaoNumero titulo="Recorde de vitorias" valor={vitorias._max.vitorias ?? 0} />
            </div>
            <h2>Pokemons por Tipo</h2>
            <GraficoTipos tipos={porTipo} total={total} />
            <h2>Mais vistos na busca</h2>
            <MaisVistos vistos={maisVistos} />
            <h2>Zona de perigo</h2>
            <AcoesEmMassa />
        </main>
    )
}

