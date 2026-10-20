export default function Ranking({ pokemons }) {
    return (
        <ol className="ranking">
            {pokemons.map((p) => (
                <li key={p.id}>
                    <img src={p.imagem} alt={p.nome} width={48} height={48} />
                    <span className="nome">{p.nome}</span>
                    <strong>{p.vitorias} vitórias</strong>
                </li>
            ))}
        </ol>
    )
}