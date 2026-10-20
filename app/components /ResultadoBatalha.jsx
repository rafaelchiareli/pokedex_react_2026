import Lutador from "./Lutador";
export default function ResultadoBatalha({pokemonA, pokemonB, poderA, poderB}){

    const empate = poderA === poderB;
    const vencedor = poderA> poderB ? pokemonA : pokemonB;

    return (
        <div className="resultado">
            <div className="arena">
                <Lutador pokemon={pokemonA} poder={poderA} venceu={poderA > poderB} />
                <span className="vs">VS</span>
                <Lutador pokemon={pokemonB} poder={poderB} venceu={poderA < poderB} />
            </div>
            <h2>{empate ? "Empate!" : `${vencedor.nome} venceu`}</h2>
        </div>
    )
}