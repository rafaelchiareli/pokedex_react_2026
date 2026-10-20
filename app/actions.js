"use server";
import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { buscarStatus } from "../lib/pokeapi";
import { calcularPoder } from "../lib/batalha";
import { redirect } from "next/dist/server/api-utils";
// Salva um Pokémon no banco
export async function capturar(formData) {
    const imagemShiny = formData.get("imagemShiny");
    //sorteio chances de 1 em 20%
    const shiny = imagemShiny !== "" && Math.randon() < 1 / 20;

    await prisma.pokemon.create({
        data: {
            pokeId: Number(formData.get("pokeId")),
            nome: formData.get("nome"),
            imagem: shiny ? imagemShiny : formData.get("imagem"),
            tipo: formData.get("tipo"),
            shiny: shiny,

        },
    });
    revalidatePath("/");
}
//funcão para favoritar o pokemon
export async function alternarFavorito(formData) {
    const id = Number(formData.get("id"));
    const eraFavorito = formData.get("favorito") === "true";

    await prisma.pokemon.update({
        where: { id },
        data: { favorito: !eraFavorito },
    });
    revalidatePath("/");
}

// Remove um Pokémon do banco
export async function soltar(formData) {
    const id = Number(formData.get("id"));
    await prisma.pokemon.delete({ where: { id } });
    revalidatePath("/");
}


export async function batalhar(formData) {
    const idA = Number(formData.get("a"));
    const idB = Number(formData.get("b"));
    //um pokemon não pode lutar com ele mesmo
    if (idA === idB) redirect("/batalha?erro=1");
    //busca os dois pokemons para a batalha
    const pokemonA = await prisma.pokemon.findUnique({ where: { id: idA } })
    const pokemonB = await prisma.pokemon.findUnique({ where: { id: idB } })

    if (!pokemonA || !pokemonB) redirect("/batalha");
    //buscar os poderes dos pokemons
    const poderA = calcularPoder(await buscarStatus(pokemonA.pokeId));
    const poderB = calcularPoder(await buscarStatus(pokemonB.pokeId));

    if (poderA !== poderB ){
        const vencedor = poderA > poderB ? pokemonA : pokemonB;
        await prisma.pokemon.update({
            where : {id: vencedor.id},
            data: {vitorias : {increment: 1}}
        });

    }
    revalidatePath("/");
    redirect(`/batalha?a=${idA}&b=${idB}&poderA=${poderA}&poderB=${poderB}`);

};
