import { notFound } from "next/navigation";
import PokemonDetail from "@/components/ui/pokemonDetail";

interface Params {
  params: {
    id: string;
  };
}

export default async function PokemonDetailPage({ params: { id } }: Params) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    notFound();
  }

  const pokemon = await res.json();
  return <PokemonDetail pokemon={pokemon} />;
}
