import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Doc: React.FC = () => {
  const doc: string = `
  # Documentation
  
  ## Getting started
  
  ในส่วนนี้จะกล่าวถึงการใช้งาน **Streamlining-AI** (Streamlining AI Inference for Model Sharing and Collaboration)
    โดยจุดประสงค์ของทางทีมงานจะแบ่งผู้ใช้ออกเป็น 2 ประเภทด้วยกัน

*   **ผู้ใช้ทั่วไป** (Guest) ทดสอบและนำโมเดลต่างๆบนเว็ปแอพลิเคชั่นของเราไปใช้
*   **นักวิจัย** (Publisher) เผยแพร่โมเดลต่างๆและทดสอบบนเว็ปแอพลิเคชั่นของเราเพื่อเก็บข้อมูล

  ## Structure Machine Learning Model
  โครงสร้างของ Source Code จะประกอบไปด้วย 3 ส่วน
  1) ไฟล์ cog.yaml เป็นการกำหนดต้นแบบ Object สำหรับการสร้าง Docker Image
  2) ไฟล์ predict.py เป็น Interface สำหรับการ Inference Machine Learning Model
  3) ไฟล์ config.json เป็นการกำหนดรูปแบบ Input ของ Machine Learning Model



    `;

    

  return (
    <div className="flex flex-col w-full h-screen prose pt-16 ">
      <ReactMarkdown className="pl-5 pr-5 w-screen h-full" children={doc} />
      <img className="pl-5 pr-5 w-screen h-full" src="https://media.discordapp.net/attachments/805509134765391892/1098102172333396018/Picture1.png" alt="example" width="512"/>
    </div>
  );
};

export default Doc;
