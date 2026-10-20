// Busca um Pokémon na PokéAPI e devolve só o que vamos usar
export async function buscarPokemon(nome) {
    const url = `https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase().trim()}`;
    const resposta = await fetch(url);
    // Se o Pokémon não existir, a API responde com erro
    if (!resposta.ok) return null;
    const dados = await resposta.json();
    return {
        pokeId: dados.id,
        nome: dados.name,
        imagem: dados.sprites.front_default ?? "",
        tipo: dados.types[0].type.name,
        imagemShiny: dados.sprites.front_shiny ?? ""
    };
}

//ENDEREÇO ONDE FICAM AS IMAGENS DOS POKEMONS
const SPRITES = "http://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

let todosOsPokemons = null;

async function listarTodos() {
    //se ja baixamos antes, ele devolve o que está armazenado
    if (todosOsPokemons) return todosOsPokemons;
    const resposta = await fetch("https://pokeapi.co/api/pokemon?limit=2000");
    if (!resposta.ok) return [];
    const dados = await resposta.json();

    todosOsPokemons = dados.results
        .map((p) => {
            //a url termina com o numero: .../pokemon/25/
            const id = Number(p.url.split("/").at(-2));
            return {
                pokeId: id,
                nome: p.name,
                imagem: `${SPRITES}/${id}.png`
            }
        }).filter((p) => p.pokeId < 10000);
    return todosOsPokemons;
}
//busca o pokemon por parte do texto na API
export async function buscarPorInicio(texto){
    const inicio = texto.toLowerCase().trim();
    if (inicio.length === 0) return [];
    const todos = await listarTodos();
    return todos.filter((p) => p.name.startsWith(inicio)).slice(0,12);
}

//busca os status do pokemon na API (HP, ataque e defesa)
export async function buscarStatus(pokeId){
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
    if (!resposta.ok) return {hp:0, ataque: 0, defesa: 0};
    const dados = await resposta.json();

    return {
        hp: dados.stats[0].base_stat,
        ataque: dados.stats[1].base_stat,
        defesa: dados.stats[2].base_stat,
    };
}

