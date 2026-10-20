import PokemonCard from "./PokemonCard";

export default function MinhaPokedex({ pokemons }) {
    if (pokemons.length === 0) {
        return <p>Você ainda não capturou nenhum Pokémon.</p>;
    }
    return (
        <div className="grade">
            {pokemons.map((p) => (
                <PokemonCard key={p.id} pokemon={p} />
            ))}
        </div>
    )
}
