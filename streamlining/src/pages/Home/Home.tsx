import { Link } from "react-router-dom";
import { useUser } from "../../state/user/hooks";
import mhee from "../../assets/mhee.jpg";
import boat from "../../assets/boat.jpg";
import PersonCard from "./components/PersonCard";

const Home: React.FC = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-col w-full h-full  ">
      <div className="flex flex-col w-3/5 h-screen gap-y-5 pt-32 pb-16 pl-5 pr-5 justify-center">
        {/* Article */}
        <div className="flex">
          <h1 className="text-6xl">
            Streamlining AI Inference for Model Sharing and Collaboration.
          </h1>
        </div>
        <div className="flex w-4/5">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <button
          type="button"
          className="flex pr-4 pl-4 pt-2 pb-2 bg-sl-orange rounded-full self-start text-white"
        >
          {user ? (
            <Link to="/dashboard">Dashboard</Link>
          ) : (
            <Link to="/login">Let’s Join Us!</Link>
          )}
        </button>
      </div>
      <div className="flex flex-col h-screen p-5 ">
        <div className="flex flex-col w-full h-1/2 items-center gap-4">
          <h1 className="text-3xl">Advisor</h1>
          <div className="inline-flex w-72 gap-10">
            <PersonCard
              name="Akkarit Sangpetch"
              role="Teacher Advisor"
              img="https://avatars.githubusercontent.com/u/7629231?v=4"
              github="https://github.com/akkarit"
            />
            
          </div>
        </div>
        <div className="flex flex-col w-full h-1/2 items-center gap-4">
          <h1 className="text-3xl">Creater</h1>
          <div className="inline-flex w-2/5 gap-10">
            <PersonCard
              name="Nawapol Krudpun"
              role="Member"
              img={boat}
              github="https://github.com/arbruzaz"
            />
            <PersonCard
              name="Nitipat Boongate"
              role="Member"
              img={mhee}
              github="https://github.com/nitipat009"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
