import react from 'react'
export default function BuscaForm() {
    return (
        <form className="busca">
            <input name="nome" placeholder="Digite um Pokémon. Ex: pikachu" required />
            <button type="submit">Buscar</button>
        </form>
    );
}