import { useDispatch } from "react-redux";
import FooterHome from "../components/Home/FooterHome";
import { setNameTrainer } from "../store/slices/nameTrainer.slice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  const navigate =useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameTrainer = e.target.nameTrainer.value;
    dispatch(setNameTrainer(nameTrainer));
    navigate("/pokedex")
    
  };

  return (
    <main className="grid grid-rows-[1fr_auto] min-h-screen">
      {/* Seccion superior */}
      <section className="flex flex-col justify-center items-center">
        <div>
          <img src="/images/logo.png" alt="" />
        </div>
        <h3 className="text-[#FE1936] font-bold text-[40px] mt-10">Hello Trainer!</h3>
        <p className="text-[20px] mb-10">For start, give me your name</p>

        <form onSubmit={handleSubmit} className="w-full text-center">
          <input required id="nameTrainer" type="text" className="h-12 shadow-lg p-2 px-5 text-[20px] inline-block" placeholder="Your Name:"/>
          <button className="bg-red-500 h-12 text-[#fff] text-[20px] shadow-lg p-2 w-20">Start!</button>
        </form>
      </section>

      {/* Seccion inferior */}
      <section>
        <FooterHome />
      </section>
    </main>
  );
};
export default Home;
