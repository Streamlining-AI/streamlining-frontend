import {  useNavigate } from 'react-router-dom';
import {CardForm} from '../types'

const Card: React.FC<CardForm> = (props:CardForm) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="flex flex-col rounded-xl drop-shadow-xl border-4 p-2"
      onClick={()=>{navigate('/model/12345')}}
    >
      <img
        alt="modelImg"
        src={props.imgUrl}
        className="w-full h-2/3 "
      />
      <p className="text-2xl break-all truncate ">{props.author}\{props.name}</p>
      <p className="break-all truncate">{props.desciption}</p>
    </button>
  );
};

export default Card;
