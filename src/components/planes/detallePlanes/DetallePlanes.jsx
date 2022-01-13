import React from "react";
import Plan from "./plan/Plan";

const DetallePlanes = () => {
  const planes = [1, 2, 3];

  return (
    <article className="planes__container">
      {/* <Plan /> */}
      {planes.map((plan) => (
        <Plan key={plan} index={plan} />
      ))}
    </article>
  );
};

export default DetallePlanes;
