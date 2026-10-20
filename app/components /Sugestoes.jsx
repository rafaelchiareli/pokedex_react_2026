import Link from "next/link";

export default function Sugestoes({pokemons}){
    return (
        <div className="sugestoes">
            {pokemons.map((p) => (
                <Link key={p.pokeId} href={`/?nome=${p.nome}`} className="sugestao">
                    <img src={p.imagem} alt={p.nome} width={64} height={64} />
                    <span>{p.nome}</span>
                </Link>
            ))}
        </div>
    )
}