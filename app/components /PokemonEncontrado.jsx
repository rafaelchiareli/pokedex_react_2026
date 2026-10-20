import { capturar } from "../actions"
export default function PokemonEncontrado({ pokemon }) {
    return (
        <div className="encontrado">
            <img src={pokemon.imagem} alt={pokemon.nome} width={120} height={120} />
            <div>
                <h2>#{pokemon.pokeId} {pokemon.nome}</h2>
                <span className="tipo">{pokemon.tipo}</span>
                <form action={capturar}>
                    <input type="hidden" name="pokeId" value={pokemon.pokeId} />
                    <input type="hidden" name="nome" value={pokemon.nome} />
                    <input type="hidden" name="imagem" value={pokemon.imagem} />
                    <input type="hidden" name="tipo" value={pokemon.tipo} />
                     <input type="hidden" name="imagemShiny" value={pokemon.imagemShiny} />
                    <button type="submit">Capturar!</button>
                </form>
            </div>
        </div>
    );
}