export default function MaisVistos({ vistos }) {
    if (vistos.length === 0) return <p>Busque algums pokemons primeiro</p>

    return (
        <div>
            <ol className="ranking">
                {vistos.map((v) => (
                    <li key={v.id}>
                        <img src={v.imagem} alt={v.nome} height={48} width={48}></img>
                        <span className="nome">{v.nome}</span>
                        <stron>
                            {v.vezes} {v.vezes === 1 ? "vez" : "vezes"}
                        </stron>
                    </li>
                ))}
            </ol>
        </div>
    )
}