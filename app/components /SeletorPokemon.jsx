export default function SeletorPokemon({nome, pokemons, valor}){
    return (
        <select name={nome} defaultValue={valor} required>
            {pokemons.map((p) => (
                <option key={p.id}value={p.id}>
                    {p.nome}
                    {p.shiny ? "(shiny)" : ""} - {p.vitorias} vitórias
                </option>
            ))}
        </select>
    );
}