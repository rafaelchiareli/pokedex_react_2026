import { alternarFavorito } from "../actions";

export default function BotaoFavorito({ pokemon }) {
    return (
        <form action={alternarFavorito} className="favorito">
            <input type="hidden" name="id" value={pokemon.id} />
            <input type="hidden" name="favorito" value={String(pokemon.favorito)} />
            <button type="submit" title="Favoritar">
                {pokemon.favorito ? "★" : "☆"}
                </button> 
        </form>
    )
}