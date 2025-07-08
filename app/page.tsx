import "@/app/globals.css";
import NavBar from "@/components/ui/navBar";
import PokeCard from "@/components/ui/pokeCard";

export default function Home() {
  return (
    <div className="background-image">
      <NavBar />
      <PokeCard />
    </div>
  );
}
