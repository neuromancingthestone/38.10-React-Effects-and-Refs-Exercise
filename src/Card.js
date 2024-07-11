import React, {useState} from "react";

// Basic dumb component that displays the card
// with the passed data in val

const Card = ({val}) => {
  const [{ angle, xPos, yPos }] = useState({
    angle: Math.random() * 90 - 45,
    xPos: Math.random() * 40 - 20,
    yPos: Math.random() * 40 - 20,
  });

  const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;

  return (
    <div className="Card">
      <img src={val.image} alt="" style={{transform}} />
    </div>
  )
}

export default Card;