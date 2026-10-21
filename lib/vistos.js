import {prisma} from '../lib/prisma'

//marca um pokemon vomo visto, se ja foi visto antes, soma +1 em vezes
export async function registrarVisto(pokemon){
    await prisma.visto.upsert({
        where : {pokeId: pokemon.pokeId},
        update : { vezes: { increment: 1}},
        create : {
            pokeId :pokemon.pokeId,
            nome:pokemon.nome,
            imagem:pokemon.imagem
        },
    })
}

