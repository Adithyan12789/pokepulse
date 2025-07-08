"use client";

import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Badge,
  Flex,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Container,
} from "@chakra-ui/react";
import { FaRulerVertical, FaWeight, FaStar } from "react-icons/fa";
import NavBar from "@/components/ui/navBar";
import { Button } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";
import CatchPokemon from "./catchPokemon";


interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonSprites {
  other: {
    ["official-artwork"]: {
      front_default: string;
    };
  };
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: PokemonSprites;
  types: PokemonType[];
}

type PokemonDetailProps = {
  pokemon: Pokemon;
};

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

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const [catching, setCatching] = useState<null | PokemonDetails>(null);

  const capitalizedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const router = useRouter();

  return (
    <div className="background-image">
      <NavBar />

      {catching && (
        <CatchPokemon
          trigger={!!catching}
          name={catching.name}
          image={catching.sprites.front_default}
          onComplete={() => setCatching(null)}
        />
      )}

      <Box
        minH="100vh"
        pt={24}
        pb={12}
        px={4}
        bgGradient="linear(to-br, yellow.900, gray.900)"
      >
        <Container maxW="6xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={10}
            align="center"
            bg="gray.800"
            p={8}
            borderRadius="2xl"
            boxShadow="dark-lg"
            border="1px solid"
            borderColor="yellow.400"
            transition="0.3s"
            _hover={{
              transform: "scale(1.01)",
              boxShadow: "0 0 30px rgba(234, 179, 8, 0.4)",
            }}
          >
            {/* Image Section */}
            <Box flex="1" textAlign="center">
              <Image
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                boxSize={{ base: "220px", md: "300px" }}
                objectFit="contain"
                mb={{ base: 6, md: 0 }}
              />
            </Box>

            {/* Info Section */}
            <Box flex="2" color="gray.100">
              <Heading size="2xl" color="yellow.300" mb={2}>
                {capitalizedName}
              </Heading>

              <Text fontSize="lg" color="gray.400" mb={4}>
                ID: #{pokemon.id}
              </Text>

              <HStack mb={6} gap={4} wrap="wrap">
                {pokemon.types.map((t: PokemonType) => (
                  <Badge
                    key={t.type.name}
                    colorScheme="yellow"
                    px={3}
                    py={1}
                    fontSize="md"
                    borderRadius="full"
                    textTransform="capitalize"
                  >
                    {t.type.name}
                  </Badge>
                ))}
              </HStack>

              <SimpleGrid columns={{ base: 1, sm: 3 }} gap={4} mt={4}>
                <StatCard
                  label="Height"
                  value={`${pokemon.height}`}
                  icon={FaRulerVertical}
                />
                <StatCard
                  label="Weight"
                  value={`${pokemon.weight}`}
                  icon={FaWeight}
                />
                <StatCard
                  label="Base XP"
                  value={`${pokemon.base_experience}`}
                  icon={FaStar}
                />

                <Flex mt={8} gap={4} wrap="wrap">
                  <Button
                    colorScheme="yellow"
                    variant="solid"
                    onClick={() => router.push("/")}
                  >
                    <MdArrowBack style={{ marginRight: "0.5em" }} />
                    Back to Home
                  </Button>

                  <Button
                    colorScheme="orange"
                    variant="outline"
                    _hover={{ bg: "orange.600", color: "white" }}
                    onClick={() =>
                      setCatching({
                        id: pokemon.id,
                        name: pokemon.name,
                        height: pokemon.height,
                        weight: pokemon.weight,
                        base_experience: pokemon.base_experience,
                        sprites: {
                          front_default: pokemon.sprites.other["official-artwork"].front_default,
                        },
                        types: pokemon.types.map((t) => ({
                          type: { name: t.type.name }
                        })),
                      })
                    }
                  >
                    Catch
                  </Button>
                </Flex>
              </SimpleGrid>
            </Box>
          </Flex>
        </Container>
      </Box>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: import("react-icons").IconType;
}) {
  return (
    <Flex
      bg="gray.700"
      p={4}
      borderRadius="lg"
      align="center"
      boxShadow="md"
      border="1px solid"
      borderColor="yellow.500"
      transition="0.2s"
      _hover={{ bg: "gray.600", transform: "translateY(-2px)" }}
    >
      <Icon as={icon} boxSize={6} color="yellow.300" mr={4} />
      <VStack align="start" gap={0}>
        <Text fontSize="sm" color="gray.400">
          {label}
        </Text>
        <Text fontWeight="bold" fontSize="lg" color="gray.100">
          {value}
        </Text>
      </VStack>
    </Flex>
  );
}