import "./ResponseCard.scss";

interface IRespondeCardProps {
  //prompt value from response object
  prompt: string;
  //response value from response object
  response: string;
  //error value from response object
  error?: string;
  //mood value from response object
  mood: string;
  //favorite value from response object
  favorite: boolean;
  //timestamp value from response object
  timestamp: number;
  //id value from response object
  id: string;
  //function to update favorite value in response object. Accepts id value of object to update.
  toggleFavorite: (id: string) => void;
}

const ResponseCard: React.FC<IRespondeCardProps> = ({
  prompt,
  response,
  error,
  mood,
  favorite,
  timestamp,
  id,
  toggleFavorite,
}) => {
  const handleClick = () => {
    toggleFavorite(id);
  };
  const faveIcon = (
    <svg
      className={
        favorite ? "response__heart response__heart--fave" : "response__heart"
      }
      viewBox="-2 -2 37 35"
      onClick={handleClick}
    >
      <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" />
    </svg>
  );

  return (
    <div className="response">
      <p>{new Date(timestamp).toLocaleString()}</p>
      <p className="response__prompt">{prompt}</p>
      <p>
        {">>> "}
        {response}
      </p>
      {error && <p className="response__error">Error: {error}</p>}
      <div className="response__tags">
        <p className="response__mood">{mood}</p>
        {faveIcon}
      </div>
    </div>
  );
};

export default ResponseCard;
