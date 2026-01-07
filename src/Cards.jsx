import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { fetchFood } from "./fetchFood.jsx";
import "./Cards.css";

export default function Cards() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchFood(5).then(setDishes); // grab a bunch so you can swipe
    console.log(dishes);
  }, []);

  const onSwipe = (dir, name) =>
    setDishes(prev => prev.filter(d => d.name !== name));

  // top card (for the on-click buttons)
  const topDish = dishes[dishes.length - 1];

  return (
    <div className="page">
      <h2 className="heading">TasteMatch</h2>

      {/* card stack */}
      <div className="deck">
        {dishes.map((dish, i) => (
          <TinderCard
            key={dish.name}
            className="swipe-layer"
            onSwipe={dir => onSwipe(dir, dish.name)}
            preventSwipe={["up", "down"]}
          >
            <div
              className="card"
              style={{
                backgroundImage: `url(${dish.url})`,
                zIndex: dishes.length - i,
                // slight stagger so lower cards peek out
                transform: `translateY(-${(dishes.length - 1 - i) * 6}px)
                            scale(${1 - (dishes.length - 1 - i) * 0.02})`,
              }}
            >
              <div className="card-text">
                <h3>{dish.name}</h3>
                <p>{dish.description.slice(0, 90)}</p>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      {/* action buttons */}
      {topDish && (
        <div className="buttons">
          <button
            className="btn dislike"
            onClick={() => onSwipe("left", topDish.name)}
            aria-label="Dislike"
          >
            ✕
          </button>
          <button
            className="btn like"
            onClick={() => onSwipe("right", topDish.name)}
            aria-label="Like"
          >
            ❤
          </button>
        </div>
      )}
    </div>
  );
}
