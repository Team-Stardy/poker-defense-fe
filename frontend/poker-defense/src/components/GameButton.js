import './GameButton.css';

const GameButton = ({ text, onClick }) => {
  return (
    <div className="game-button-wrapper">
      <div className="outer-oval"></div>
      <button className="inner-oval" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default GameButton;