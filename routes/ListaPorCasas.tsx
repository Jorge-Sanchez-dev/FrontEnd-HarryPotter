
export default function Houses() {
  const houses = ["gryffindor", "slytherin", "hufflepuff", "ravenclaw"];

  return (
    <div>
      <h1>Selecciona una casa</h1>

      <div class="housesContainer">
        {houses.map((house) => (
          <form action={`/houses/${house}`} method="get">
            <button class="houseButton" type="submit">
              {house.charAt(0).toUpperCase() + house.slice(1)} {/* Pone la primera letra en mayúscula */}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
