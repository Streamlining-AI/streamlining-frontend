import axios from "axios";
const uploadImg = async (file: FileList) => {
  let img = new FormData();
  img.append("uploadFile", file[0]);
  const { status, data } = await axios.post(
    `${process.env.REACT_APP_Backend_URL}upload`,
    img,
    {
      headers: {
        "Content-Type": `multipart/form-data;`,
      },
    }
  );
  if (status === 500 || status === 400) throw new Error(data["message"]);
  const result =
    `${process.env.REACT_APP_Backend_URL}`.slice(0, -1) + data.image_url;
  return result;
};
export default uploadImg;


