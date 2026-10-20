export default function Lutador({pokemon, poder, venceu}){
    return (
        <div className={venceu ? "lutador vencedor" : "lutador"}>
            <img src={pokemon.imagem} alt={pokemon.nome} width={120} height={120} />
            <p className="nome">{pokemon.nome}</p>
            <p className="poder">Poder: {poder}</p>
            <p>Vitórias: {pokemon.vitorias}</p>
        </div>
    
    )
}