import { prisma } from "../lib/prisma";
import { buscarPokemon, buscarPorInicio } from "../lib/pokeapi";
import Link from 'next/link'
import { registrarVisto } from "../lib/vistos";
import BuscaForm from "./components /BuscaForm";
import MinhaPokedex from "./components /MinhaPokedex";
import PokemonEncontrado from "./components /PokemonEncontrado";
import Sugestoes from "./components /Sugestoes";


export const dynamic = "force-dynamic";
export default async function Home({ searchParams }) {
  const { nome } = await searchParams;

  // busca os pokemons pelo nome ou pelo texto  na api
  const encontrado = nome ? await buscarPokemon(nome) : null;
  if (encontrado) await registrarVisto(encontrado);
  const sugetoes = nome ? await buscarPorInicio(nome) : [];

  // 2. Busca no nosso banco todos os Pokémon capturados
  const meusPokemons = await prisma.pokemon.findMany({
    orderBy: [{ favorito: "desc" }, { pokeId: "asc" }]
  });
  // 3. Monta a tela com os componentes
  return (
    <main>
      <h1>Minha Pokédex</h1>
      <Link href={"/batalha"} className='botao-link'>Ir para a batalha</Link>
      <Link href={"/estatisticas"} className="botao-link">Estatisticas</Link>
      <BuscaForm />
      {nome && !encontrado && sugetoes.length === 0 && (
        <p className="erro">Não achamos nenhum Pokémon com nome comçando com {nome}.</p>
      )}
      {encontrado && <PokemonEncontrado pokemon={encontrado} />}
      {sugetoes.length > 0 && (
        <>
          <h3>Começam com "{nome}"</h3>
          <Sugestoes pokemons={sugetoes} />
        </>
      )}
      <h2>Meus Pokémon ({meusPokemons.length})</h2>
      <MinhaPokedex pokemons={meusPokemons} />
    </main>
  );
}