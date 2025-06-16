import { FunctionComponent } from "preact";

const SeleccionarCasa: FunctionComponent = () => {
  const houses = ["gryffindor", "slytherin", "hufflepuff", "ravenclaw"];

  return (
    <div class="housesContainer">
      {houses.map((house) => (
        <a class="houseButton" href={`/houses/${house}`}>
          {house.charAt(0).toUpperCase() + house.slice(1)}
        </a>
      ))}
    </div>
  );
};

export default SeleccionarCasa;
