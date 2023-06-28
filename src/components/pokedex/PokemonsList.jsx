import PokemonCard from "./PokemonCard";

const PokemonsList = ({
  pokemons,
  pokemonInPage,
  pagesInBlock,
  setCurrentPage,
  handleClickPreviusPage,
  handleClickNextPage,
  currentPage,
  lastPage,
}) => {
  return (
    <>
      <section className="mx-2 mt-14 flex flex-wrap justify-center gap-5 pb-24">
        {pokemonInPage.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
      </section>
      <footer className="mb-10">
        <ul className="flex flex-wrap gap-1 justify-center items-center">
        <li
            onClick={() =>setCurrentPage(1)}
            className="cursor-pointer flex justify-center items-center w-10 h-10 bg-red-500 font-bold text-[#fff]"
          >
            {"<<"}
          </li>
          <li
            onClick={handleClickPreviusPage}
            className="cursor-pointer flex justify-center items-center w-10 h-10 bg-red-500 font-bold text-[#fff]"
          >
            {"<"}
          </li>
          {pagesInBlock.map((numberPage) => (
            <li
              onClick={() => setCurrentPage(numberPage)}
              className={`flex justify-center items-center first:bg-red-500 first:text-[#fff]  w-10 h-10 p font-bold rounded-md hover:bg-red-500 hover:text-[#fff] text-[#000] cursor-pointer ${numberPage === currentPage && "bg-red-500 text-[#fff]"}`}
              key={numberPage}
            >
              {numberPage}
            </li>
          ))}
          <li
            onClick={handleClickNextPage}
            className="cursor-pointer flex justify-center items-center w-10 h-10 bg-red-500 font-bold text-[#fff]"
          >
            {">"}
          </li>
          <li
            onClick={() =>setCurrentPage(lastPage)}
            className="cursor-pointer flex justify-center items-center w-10 h-10 bg-red-500 font-bold text-[#fff]"
          >
            {">>"}
          </li>
        </ul>
      </footer>
    </>
  );
};
export default PokemonsList;
