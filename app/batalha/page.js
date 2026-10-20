import Link from 'next/link';
import { prisma } from '../../lib/prisma';
import EscolherLutadores from '../components /EscolherLutadores';
import ResultadoBatalha from '../components /ResultadoBatalha';
import Ranking from '../components /Ranking';

export const dynamic = 'force-dynamic';

export default async function Batalha({ searchParams }) {
    const { a, b, poderA, poderB, erro } = await searchParams;
    //todos os pokemons, do que mais venceu para o que menos venceu
    const pokemons = await prisma.pokemon.findMany({
        orderBy: { vitorias: "desc" }
    });

    // sem 2 pokemons , não existe batalha
    if (pokemons.length < 2) {
        return (
            <main>
                <h1>Batalha de Pokemons</h1>
                <p>Capture ao menos 2 pokemons para batalhar</p>
                <Link href={"/"}>Voltar para a Pokedex</Link>
            </main>
        );
    }
    //Se uma batalha acabou de acontecer, achar os 2 lutadores na lista
    const pokemonA = pokemons.find((p) => p.id == Number(a));
    const pokemonB = pokemons.find((p) => p.id == Number(b));

    return (
        <main>
            <Link href={"/"}>Voltar para a pokedex</Link>
            <h1>Batalha de Pokemons</h1>
            <EscolherLutadores pokemons={pokemons}
                a={a ?? pokemons[0].id}
                b={b ?? pokemons[1].id}
            />

            {erro && <p className='erro'>Escolha dois Pokemons diferentes!</p>}
            {pokemonA && pokemonB && poderA && (
                <ResultadoBatalha
                    pokemonA={pokemonA}
                    pokemonB={pokemonB}
                    poderA={Number(poderA)}
                    poderB={Number(poderB)}
                />
            )}
            <h2>Ranking de vitórias</h2>
            <Ranking pokemons={pokemons.slice(0,10)} />
        </main>


    )
}