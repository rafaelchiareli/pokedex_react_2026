import { soltar } from "../actions";
import BotaoFavorito from "./BotaoFavorito";
export default function PokemonCard({ pokemon }) {
    return (
        <div className={pokemon.shiny ? "card shiny" :"card"}>
            <BotaoFavorito pokemon={pokemon} />
            <img src={pokemon.imagem} alt={pokemon.nome} width={96} height={96} />
            <p className="nome">{pokemon.nome}</p>
            {pokemon.shiny && <p className="selo-shiny">Shiny!</p>}
            {pokemon.vitorias > 0 && <p className="vitorias">{pokemon.vitorias} vitorias</p>}
            <span className="tipo">{pokemon.tipo}</span>
            <form action={soltar}>
                <input type="hidden" name="id" value={pokemon.id} />
                <button type="submit" className="soltar">Soltar</button>
            </form>
        </div>
    );
}