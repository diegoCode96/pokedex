import { useParams } from "react-router-dom";
import Header from "../components/pokedex/Header";
import { useEffect, useState } from "react";
import axios from "axios";

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
};

const PokemonId = () => {
  const [pokemon, setPokemon] = useState(null);
  console.log(pokemon);
  const { pokemonName } = useParams();

  const percentProgresStat = (baseStat) => {
    const STAT_MAX = 255;
    return `${(baseStat * 100) / 255}%`;
  };

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;

    axios
      .get(url)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <Header />

      <section className="-mt-6 pb-6">
        <article
          className={`relative h-32 mt-28 flex justify-center mb-6 ${
            pokeLineargradients[pokemon?.types[0].type.name]
          }`}
        >
          <div className="absolute w-[13rem] -top-20">
            <img
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
            />
          </div>
        </article>

        {/* informacion detalle de pokemon */}
        <section className="  xxs:mx-48">
          <article className="flex flex-col justify-center items-center">
            <div className="border-[1px] border-gray-300 inline-block">
              <span
                className={`p-2 text-4xl ${
                  pokeTextColors[pokemon?.types[0].type.name]
                }`}
              >
                #{pokemon?.order}
              </span>
            </div>
            <div className="grid grid-cols-[2fr_1fr_2fr] mx-2 xxs:mx-0">
              <div className=" col-span-1 flex justify-center items-center">
                <div className="w-full xxs:w-[16rem] h-[2px] bg-gray-300"></div>
              </div>
              <h2
                className={`pt-4 text-4xl font-bold capitalize text-center xxs:px-5 ${
                  pokeTextColors[pokemon?.types[0].type.name]
                }`}
              >
                {pokemon?.name}
              </h2>
              <div className=" col-span-1 flex justify-center items-center">
                <div className="w-full xxs:w-[16rem] h-[2px] bg-gray-300"></div>
              </div>
            </div>
            <section className="mt-4 capitalize grid grid-cols-2 gap-8">
              <div className="flex flex-col justify-center items-center">
                <h4>weight</h4>
                <span
                  className={`p-1 text-xl font-bold ${
                    pokeTextColors[pokemon?.types[0].type.name]
                  }`}
                >
                  {pokemon?.weight}
                </span>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h4>height</h4>
                <span
                  className={`p-1 text-xl font-bold ${
                    pokeTextColors[pokemon?.types[0].type.name]
                  }`}
                >
                  {pokemon?.height}
                </span>
              </div>
            </section>
          </article>

          <article className="grid grid-cols-1  xxs:gap-y-0 gap-x-16 xxs:grid-cols-2 mt-8 xxs:mt-6 mx-2 xxs:mx-0">
            {/* seccion tipo */}
            <section className="grid grid-cols-2 grid-rows-3 gap-2">
              <div className="flex justify-center items-center col-span-2 mb-4">
                <h2
                  className={`text-[28px] capitalize p-1 text-xl font-bold ${
                    pokeTextColors[pokemon?.types[0].type.name]
                  }`}
                >
                  type
                </h2>
              </div>

              {pokemon?.types.map((type) => (
                <span
                  key={type.type.url}
                  className="text-gray-100 xxs:text-[20px] py-1 px-14 capitalize bg-slate-700 rounded-md shadow-lg col-span-1 flex justify-center items-center "
                >
                  {type.type.name}
                </span>
              ))}
            </section>
            {/* seccion habilidades */}
            <section className="grid grid-cols-2 grid-rows-3 gap-2">
              <div className="flex justify-center items-center col-span-2 mb-4">
                <h2
                  className={`text-[28px] capitalize p-1 text-xl font-bold ${
                    pokeTextColors[pokemon?.types[0].type.name]
                  }`}
                >
                  skills
                </h2>
              </div>

              {pokemon?.abilities.map((ability) => (
                <span
                  key={ability.ability.url}
                  className="text-gray-800 xxs:text-[18px]  capitalize  rounded-md shadow-lg col-span-1 flex justify-center items-center border-[1px] border-[#000] "
                >
                  {ability.ability.name}
                </span>
              ))}
            </section>
          </article>

          <article className="my-16">
            {/* stats */}
            <section className="px-2 xxs:px-0">
              <div className="grid grid-cols-[1fr_5fr_1fr] gap-2 mb-8">
                <div className="flex justify-start items-center">
                  <h4 className="capitalize font-bold text-3xl text-center ">
                    stats
                  </h4>
                </div>
                <div className="flex items-center mt-2">
                  <div className="bg-gray-300 w-full h-[1.5px]"></div>
                </div>
                <div className="xxs:w-[5rem] w-[4rem] xxs:ml-8">
                  <img src="/images/pokeball.png" alt="" />
                </div>
              </div>
              <section>
                {pokemon?.stats.map((stat) => (
                  <article key={stat.stat.url}>
                    <section className="flex justify-between items-center font-bold ">
                      <h5 className="text-md capitalize">{stat.stat.name}</h5>
                      <span className="text-[14px]">{stat.base_stat}/255</span>
                    </section>
                    {/* barra de progreso */}
                    <section className="bg-gray-300 h-8 rounded-md overflow-hidden mb-5">
                      <div
                        style={{ width: percentProgresStat(stat.base_stat) }}
                        className={`h-full ${
                          pokeLineargradients[pokemon?.types[0].type.name]
                        }`}
                      ></div>
                    </section>
                  </article>
                ))}
              </section>
            </section>
          </article>
          <article className="mx-2 xxs:mx-0">
          <div className="grid grid-cols-[1fr_5fr_1fr] gap-2 mb-8">
                <div className="flex justify-start items-center">
                  <h4 className="capitalize font-bold text-3xl text-center ">
                    movements
                  </h4>
                </div>
                <div className="flex items-center mt-2">
                  <div className="bg-gray-300 w-full h-[1.5px]"></div>
                </div>
                <div className="xxs:w-[5rem] w-[4rem] xxs:ml-8">
                  <img src="/images/pokeball.png" alt="" />
                </div>
              </div>
            <section className="flex flex-wrap gap-5">
            {pokemon?.moves.map((move) => (
                <span
                  key={move.move.url}
                  className="text-gray-800 xxs:text-[14px] py-2 px-4 capitalize  rounded-full shadow-md col-span-1 flex justify-center items-center font-bold  bg-[#E5E5E5]"
                >
                  {move.move.name}
                </span>
              ))}
            </section>
          </article>
        </section>
      </section>
    </main>
  );
};
export default PokemonId;
