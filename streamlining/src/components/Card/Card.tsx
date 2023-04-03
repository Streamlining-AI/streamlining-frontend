import {CardForm} from './types'

const Card: React.FC<CardForm> = (props:CardForm) => {
  
  return (
    <a
      className="flex flex-col h-80 p-2"
      href={`/model/${props.id}`}
    >
      <img
        alt="modelImg"
        src={props.imgUrl}
        className="object-cover object-center w-full h-60 "
      />
      <h3 className="text-2xl break-all truncate ">{props.author}\{props.name}</h3>
      <h4 className="break-all truncate">{props.desciption}</h4>
    </a>
  );
};

export default Card;
