
import axios from "npm:axios";

// Tipo de hechizo
type Spell = {
  id: string;
  name: string;
  description: string;
};

export default async function ListaHechizos() {
  try {
    const response = await axios.get("https://hp-api.onrender.com/api/spells");
    const spells = response.data as Spell[];

    return (
      <div>
        <h1>Lista de Hechizos</h1>
        <div class="spellContainer">
          {spells.map((spell) => (
            <div class="spellCard" key={spell.id}>
              <h2>{spell.name}</h2>
              <p>{spell.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error al cargar los hechizos", error);
    return (
      <div>
        <h1>Error cargando los hechizos 🧨</h1>
      </div>
    );
  }
}
