import { useSelector } from "react-redux";
import Header from "../components/pokedex/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonsList from "../components/pokedex/PokemonsList";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);

  const [namePokemon, setNamePokemon] = useState("");

  const [types, setTypes] = useState([]);

  const [currentType, setCurrentType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const nameTrainer = useSelector((store) => store.nameTrainer);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNamePokemon(e.target.namePokemon.value);
  };

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(namePokemon.toLowerCase())
  );

  const handleChangeType = (e) => {
    setCurrentType(e.target.value);
  };

  const paginationLogic = () => {
    // cantidad de pokemons por pagina
    const POKEMONS_PER_PAGE = 12;

    // pokemons  que se van a mostrar en la pagina actual
    const sliceStar = (currentPage - 1) * POKEMONS_PER_PAGE;
    const sliceEnd = sliceStar + POKEMONS_PER_PAGE;
    const pokemonInPage = pokemonsByName.slice(sliceStar, sliceEnd);

    //ultima pagina
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1;

    //bloque actual
    const PAGES_PER_BLOCK = 5;
    const actualBLock = Math.ceil(currentPage / PAGES_PER_BLOCK);

    // paginas que se van a mostrar en el bloque actual
    const pagesInBlock = [];
    const minPage = (actualBLock - 1) * PAGES_PER_BLOCK + 1;
    const maxPage = actualBLock * PAGES_PER_BLOCK;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i);
      }
    }

    return { pokemonInPage, lastPage, pagesInBlock };
  };

  const { lastPage, pagesInBlock, pokemonInPage } = paginationLogic();

  const handleClickPreviusPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) {
      setCurrentPage(newCurrentPage);
    }
  };

  useEffect(() => {
    if (!currentType) {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";
      axios
        .get(URL)
        .then(({ data }) => setPokemons(data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";

    axios
      .get(URL)
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentType) {
      const url = `https://pokeapi.co/api/v2/type/${currentType}/`;

      axios
        .get(url)
        .then(({ data }) => {
          const pokemonsByType = data.pokemon.map((pokemon) => pokemon.pokemon);
          setPokemons(pokemonsByType);
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    setCurrentPage(1)
  }, [namePokemon, currentType])
  

  return (
    <main>
      <Header />
      <div>
        <p className="text-[24px] my-8 xxs:ml-16 m-2">
          <span className="text-[#FE1936] font-bold">
            Welcome {nameTrainer},
          </span>{" "}
          here you can find your favorite pokemon
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 xxs:grid-cols-[500px_1fr_400px] mx-2 xxs:mx-16 "
        >
          <input
            id="namePokemon"
            type="text"
            className="bg-white h-16 shadow-lg p-2 xxs:pl-5 rounded-l-md text-[13px] xxs:text-2xl"
            placeholder="Search your pokemon"
          />
          <button className="bg-[#D93F3F] h-16 shadow-lg xxs:text-xl xxs:w-[20rem] text-[#fff] font-bold p-2 rounded-r-md">
            Search
          </button>

          <select
            onChange={handleChangeType}
            className="bg-white h-16 shadow-lg block px-2 col-span-2 xxs:col-span-1 my-5 xxs:my-0 xxs:ml-5 rounded-md "
          >
            <option value="">All</option>
            {types.map((type) => (
              <option
                className="text-md py-10"
                value={type.name}
                key={type.url}
              >
                {type.name}
              </option>
            ))}
          </select>
        </form>

        {/* paginacion */}
        <section className="flex flex-col justify-center items-center ">
          <PokemonsList
            pokemons={pokemonsByName}
            pokemonInPage={pokemonInPage}
            pagesInBlock={pagesInBlock}
            setCurrentPage={setCurrentPage}
            handleClickPreviusPage={handleClickPreviusPage}
            handleClickNextPage={handleClickNextPage}
            currentPage={currentPage}
            lastPage={lastPage}
          />
        </section>
      </div>
    </main>
  );
};
export default Pokedex;
