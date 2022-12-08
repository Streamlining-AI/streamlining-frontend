import {CardForm} from '../types'

const Card: React.FC<CardForm> = (props:CardForm) => {
  return (
    <button
      type="button"
      className="flex flex-col bg-pink-600 rounded-xl drop-shadow-xl"
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
