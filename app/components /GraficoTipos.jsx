export default function GraficoTipos({ tipos, total }) {
    if (tipos.length === 0) return <p>Nenhum pokemon capturado</p>
    return (
        <div className="grafico">
            {tipos.map((t) => {
                const quantidade = t._count.tipo;
                const porcentagem = Math.round((quantidade / total) * 100);
                return (
                    <div key={t.tipo} className="linha-tipo">
                        <span className="nome-tipo">{t.tipo}</span>
                        <div className="barra-fundo">
                            <div className="barra" style={{ width: `${porcentagem}%` }} />
                        </div>
                        <span>{quantidade} ({porcentagem})</span>
                    </div>
                )

            })}
        </div>
    )
}