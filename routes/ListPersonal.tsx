import CharPersonaje from "../components/CharPersonaje.tsx";
import axios from "npm:axios";

// Tipos (los mismos de antes, los puedes centralizar luego en un fichero types.ts)
type Wand = {
  wood: string;
  core: string;
  length: number | null;
};

type Character = {
  id: string;
  name: string;
  image: string;
  actor: string;
  house: string;
  patronus: string;
  wand: Wand;
};

export default async function Staff() {
  try {
    const response = await axios.get("https://hp-api.onrender.com/api/characters/staff");
    const data = response.data as Character[];

    return (
      <div>
        <h1>Lista de Personal</h1>
        <CharPersonaje characters={data} />
      </div>
    );
  } catch (error) {
    console.error("Error al cargar el staff", error);
    return (
      <div>
        <h1>Ha ocurrido un error cargando el personal 🧨</h1>
      </div>
    );
  }
}
