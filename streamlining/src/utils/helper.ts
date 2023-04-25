import axios from "axios";
import { Config } from "../config";
import { toast } from "react-hot-toast";

const uploadImg = async (file: FileList) => {
  try {
    let img = new FormData();
    img.append("uploadFile", file[0]);
    const { status, data } = await axios.post(
      `${Config.REACT_APP_Backend_URL}upload`,
      img,
      {
        headers: {
          "Content-Type": `multipart/form-data;`,
        },
      }
    );
    if (status === 500 || status === 400)
      throw new Error(data["message"] as string);
    const result =
      `${Config.REACT_APP_Backend_URL}`.slice(0, -1) + data.image_url;
    return result;
  } catch (error) {
    toast.error(`${(error as Error).message}`)
  }
};
export default uploadImg;
