import { soltarNaoFavoritos, zerarRanking } from "../actions";
export default function AcoesEmMassa(){
    return (
        <div className="perigo">
            <form action={soltarNaoFavoritos}>
                <p>Solta todos os pokemons que <b>não</b> são favoritos</p>
                <label>
                    <input type="checkbox" name='confirmar' required />
                    Tenho certeza
                </label>
                <button type='submit'>Soltar não favoritos</button>
            </form>
            <form action={zerarRanking}>
                <p>Volta as vitorias de todos os pokemons para 0</p>
                 <label>
                    <input type="checkbox" name='confirmar' required />
                    Tenho certeza
                </label>
                 <button type='submit'>Zerar ranking</button>
            </form>
        </div>
    )


    
}