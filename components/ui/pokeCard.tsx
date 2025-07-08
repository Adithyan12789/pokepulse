// PokeCard.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Image,
  Text,
  Container,
  SimpleGrid,
  Heading,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import SearchAndFilter from "./searchAndFilter";
import CatchPokemon from "./catchPokemon";

interface PokemonListResult {
  name: string;
  url: string;
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResult[];
}

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

const PokeCard = () => {
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0"
  );
  const [catching, setCatching] = useState<null | PokemonDetails>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const router = useRouter();

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const res = await fetch(currentUrl);
        const data: PokemonListResponse = await res.json();

        const pokemonDetails: PokemonDetails[] = await Promise.all(
          data.results.map(async (poke) => {
            const detailsRes = await fetch(poke.url);
            return (await detailsRes.json()) as PokemonDetails;
          })
        );

        setPokemons(pokemonDetails);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
      setLoading(false);
    };

    fetchPokemons();
  }, [currentUrl]);

  // Apply search and filter logic
  const filteredPokemons = pokemons.filter((pokemon) => {
    const nameMatches = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const typeMatches =
      filter === "All" ||
      pokemon.types.some(
        (t) => t.type.name.toLowerCase() === filter.toLowerCase()
      );
    return nameMatches && typeMatches;
  });

  return (
    <Container maxW="7xl" px="4" py="8">
      <Heading textAlign="center" size="2xl" mb="5" mt="10" color="yellow.400">
        Pokémon Explorer
      </Heading>

      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
      />

      {catching && (
        <CatchPokemon
          trigger={!!catching}
          name={catching.name}
          image={catching.sprites.front_default}
          onComplete={() => setCatching(null)}
        />
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" h="60">
          {/* <Spinner size="xl" color="yellow.400" /> */}
        </Box>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap="8" mb="12">
            {filteredPokemons.map((pokemon) => (
              <Box
                key={pokemon.id}
                bg="blackAlpha.800"
                border="1px solid"
                borderColor="yellow.700"
                shadow="xl"
                transition="transform 0.3s"
                _hover={{
                  transform: "scale(1.05)",
                  boxShadow: "0 0 20px rgba(202, 138, 4, 0.5)",
                }}
                borderRadius="md"
                overflow="hidden"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box textAlign="center" bg="rgba(250, 204, 21, 0.8)" py="4">
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    boxSize="96px"
                    mx="auto"
                  />
                </Box>
                <Box flex="1" px="6" py="4">
                  <Heading
                    size="md"
                    mb="2"
                    textTransform="capitalize"
                    color="yellow.400"
                  >
                    {pokemon.name}
                  </Heading>
                  <Text color="gray.200">
                    Type: {pokemon.types.map((t) => t.type.name).join(", ")}
                  </Text>
                  <Text color="gray.200">Height: {pokemon.height}</Text>
                  <Text color="gray.200">Weight: {pokemon.weight}</Text>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  px="6"
                  py="4"
                >
                  <Button
                    colorScheme="yellow"
                    size="sm"
                    onClick={() => setCatching(pokemon)}
                  >
                    Catch
                  </Button>

                  <Button
                    variant="outline"
                    colorScheme="yellow"
                    size="sm"
                    onClick={() => router.push(`/pokemon/${pokemon.name}`)}
                  >
                    View
                  </Button>
                </Box>
              </Box>
            ))}
          </SimpleGrid>

          <Box display="flex" justifyContent="center" gap="4">
            <Button
              onClick={() => prevUrl && setCurrentUrl(prevUrl)}
              disabled={!prevUrl}
              colorScheme="yellow"
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={() => nextUrl && setCurrentUrl(nextUrl)}
              disabled={!nextUrl}
              colorScheme="yellow"
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default PokeCard;
