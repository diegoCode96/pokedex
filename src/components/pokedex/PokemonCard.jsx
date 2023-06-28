import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const pokeLineargradients = {
  grass: "bg-gradient-to-t from-[#CAE099] to-[#7EC6C5] text-",
  fire: "bg-gradient-to-t from-[#E8AE1B] to-[#F96D6F]",
  water: "bg-gradient-to-t from-[#82B2F1] to-[#133258]",
  bug: "bg-gradient-to-t from-[#AAFFA8] to-[#62DB60]",
  normal: "bg-gradient-to-t from-[#7C3F4C] to-[#735259]",
  fighting: "bg-gradient-to-t from-[#CB735D] to-[#96402A]",
  poison: "bg-gradient-to-t from-fuchsia-600 to-fuchsia-800",
  ghost: "bg-gradient-to-t from-violet-600 to-violet-800",
  rock: "bg-gradient-to-t from-stone-500 to-stone-600",
  dark: "bg-gradient-to-t from-zinc-600 to-zinc-900",
  ice: "bg-gradient-to-t from-blue-200 to-blue-400",
  steel: "bg-gradient-to-t from-[#728881] to-[#5E736C]",
  dragon: "bg-gradient-to-t from-[#56A4AE] to-[#478A93]",
  psychic: "bg-gradient-to-t from-[#C23867] to-[#971B45]",
  electric: "bg-gradient-to-t from-[#7075D9] to-[#0C1395]",
  ground: "bg-gradient-to-t from-[#895C1A] to-[#654008]",
  fairy: "bg-gradient-to-t from-rose-300 to-rose-500",
  flying: "bg-gradient-to-t from-sky-300 to-rose-300",
};

const pokeBorderColor = {
  grass: "border-[9px] border-green-300 rounded-xl",
  fire: "border-[9px] border-orange-500 rounded-xl",
  water: "border-[9px] border-blue-400 rounded-xl",
  bug: "border-[9px] border-green-400 rounded-xl",
  normal: "border-[9px] border-[#7C3F4C] rounded-xl",
  fighting: "border-[9px] border-orange-700 rounded-xl",
  poison: "border-[9px] border-fuchsia-600 rounded-xl",
  ghost: "border-[9px] border-violet-800 rounded-xl",
  rock: "border-[9px] border-stone-600 rounded-xl",
  dark: "border-[9px] border-zinc-600 rounded-xl",
  ice: "border-[9px] border-blue-300 rounded-xl",
  steel: "border-[9px] border-[#5E736C] rounded-xl", 
  dragon: "border-[9px] border-[#56A4AE] rounded-xl",
  psychic: "border-[9px] border-[#C23867] rounded-xl",
  electric: "border-[9px] border-[#0C1395] rounded-xl",
  ground: "border-[9px] border-[#654008] rounded-xl",
  fairy: "border-[9px] border-rose-500 rounded-xl",
  flying:"border-[9px] border-rose-300 rounded-xl",
};

const pokeTextColors = {
  grass: "text-[#416460]",
  fire: "text-orange-500",
  water: "text-blue-400",
  bug: "text-green-400",
  normal: "text-[#7C3F4C]",
  fighting: "text-orange-700",
  poison: "text-fuchsia-600",
  ghost: "text-violet-800",
  rock: "text-stone-600",
  dark: "text-zinc-600",
  ice: "text-blue-300",
  steel: "text-[#5E736C]",
  dragon: "text-[#56A4AE]",
  psychic: "text-[#C23867]",
  electric: "text-[#0C1395]",
  ground: "text-[#654008]",
  fairy: "text-rose-500",
  flying: "text-rose-300",
};

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);

  const formatTypesPokemons = (types = []) => {
    const nameTypes = types.map((type) => type.type.name);
    const titleTypes = nameTypes.join(" / ");
    return titleTypes;
  };

  useEffect(() => {
    axios.get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err))
  }, []);




  return (
    <Link to={`/pokedex/${pokemon?.name}`} className={` ${pokeBorderColor[pokemon?.types[0].type.name]} w-72`}>
      {/* seccion superior */}
      <section
        className={`relative h-36  ${
          pokeLineargradients[pokemon?.types[0].type.name]
        }`}
      >
        <div className="absolute px-12 -bottom-12 right-1 ">
          <img
            className="w-50 h-40 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100"
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt={pokemon?.name}
          />
        </div>
      </section>

      {/* seccion inferior */}
      <section
        className={`${pokeTextColors[pokemon?.types[0].type.name]} text-center`}
      >
        <h3 className="mt-11 text-2xl capitalize font-medium">
          {pokemon?.name}
        </h3>
        <h5 className=" capitalize text-black">
          {formatTypesPokemons(pokemon?.types)}
        </h5>
        <span className="text-xs text-[#9F9F9F]">Type</span>
        <hr />
        <section className="grid grid-cols-2 gap-5 p-4">
          {/* Generar la lista de stats */}
          {pokemon?.stats.slice(0, 4).map((stat) => (
            <div key={stat.stat.url}>
              <h6 className="text-xs uppercase text-[#9F9F9F]">
                {stat.stat.name}
              </h6>
              <span
                className={`font-bold text-lg ${
                  pokeTextColors[pokemon?.types[0].type.name]
                }`}
              >
                {stat.base_stat}
              </span>
            </div>
          ))}
        </section>
      </section>
    </Link>
  );
};
export default PokemonCard;
