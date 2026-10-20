import { batalhar } from "../actions";
import SeletorPokemon from "./SeletorPokemon";

export default function EscolherLutadores({pokemons, a, b}){
    return(

        <form action={batalhar} className="escolher">
            <SeletorPokemon nome="a" pokemons={pokemons} valor={a} />
            <span className="vs">VS</span>
             <SeletorPokemon nome="b" pokemons={pokemons} valor={b} />
             <button type='submit'>Batalhar</button>
        </form>
    )
}