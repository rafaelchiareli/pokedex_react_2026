export function calcularPoder(statusPokemon){
    const base = statusPokemon.hp + statusPokemon.ataque + statusPokemon.defesa;

//calcula um numero da sorte
    const sorte = Math.floor(Math.random() * 50);
    return base + sorte;
}

