import { Link } from "react-router-dom";
import { useUser } from "../../state/user/hooks";
import mhee from "../../assets/mhee.jpg";
import boat from "../../assets/boat.jpg";
import PersonCard from "./components/PersonCard";

const Home: React.FC = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-col w-full h-full  ">
      <section className="flex flex-col w-full xl:w-3/5 h-screen gap-y-5 pt-32 pb-16 pl-5 pr-5 justify-center">
        {/* Article */}
        <div className="flex">
          <h1 className="text-4xl md:text-6xl">
            Streamlining AI Inference for Model Sharing and Collaboration.
          </h1>
        </div>
        <div className="flex w-full xl:w-4/5">
          <p>
            โครงงานนี้จัดทำเพื่อพัฒนาเว็บแอพพลิเคชันที่สามารถใช้นำเสนอและทดสอบโมเดลปัญญาประดิษฐ์ผ่านบริการเว็บ
            ทั้งนี้เพื่อให้ผู้ที่สนใจสามารถศึกษาและทดลองใช้งานโมเดลปัญญาประดิษฐ์ได้ง่าย
            ส่งเสริมให้เกิดชุมชนนักพัฒนาให้สามารถทดสอบการใช้งานโมเดลปัญญาประดิษฐ์ในวงกว้างได้มากยิ่งขึ้น
            โดยนักพัฒนาสามารถอัพโหลดโมเดลปัญญาประดิษฐ์ผ่านการจัดการระบบคอนเทนเนอร์
            เช่น Kubernetes หรือ Docker เป็นต้น
            ทำให้สามารถจัดการทรัพยากรและไลบรารีที่จำเป็นต่อการใช้งาน
            รวมถึงให้บริการในลักษณะของบริการซอฟต์แวร์เพื่อทดแทนการติดตั้งทดสอบโมเดลโดยตรงซึ่งอาจจะยุ่งยาก
            โดยทีมงานวางแผนจะใช้เครื่องมือเช่น COG
            ซึ่งเป็นซอฟต์แวร์โอเพนซอร์สเป็นพื้นฐานในการใช้รันโมเดลปัญญาประดิษฐ์
            มาใช้งานร่วมกับหน่วยรับข้อมูลเข้า เช่น
            กล้องที่เชื่อมต่อกับคอมพิวเตอร์ รวมถึงโมเดลประเภทการแบ่งประเภท
            หรือการจัดแบ่งพื้นที่ภาพ
            เพื่อให้นักพัฒนาหรือผู้ที่สนใจสามารถทดสอบโมเดลที่เกี่ยวกับการใช้งานด้าน
            Computer Vision ได้สะดวกมากขึ้น
            ทำให้สามารถแลกเปลี่ยนเรียนรู้และศึกษาทำงานร่วมกันได้
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
      </section>
      <section className="flex flex-col h-screen p-5 ">
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
          <div className="grid grid-cols-1 w-72 md:grid-cols-2 md:w-2/5 gap-10">
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
      </section>
    </div>
  );
};

export default Home;
