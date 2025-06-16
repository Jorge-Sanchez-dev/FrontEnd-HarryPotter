// routes/students.tsx  (si lo haces profesional)
import CharPersonaje from "../components/CharPersonaje.tsx";
import axios from "https://esm.sh/axios@1.6.8";

// Definimos los tipos (puedes moverlo a un fichero types.ts si lo reutilizas)
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

export default async function Students() {
  try {
    const response = await axios.get("https://hp-api.onrender.com/api/characters/students");
    const data = response.data as Character[];

    return (
      <div>
        <h1>Lista de Estudiantes</h1>
        <CharPersonaje characters={data} />
      </div>
    );
  } catch (error) {
    console.error("Error al cargar los estudiantes", error);
    return (
      <div>
        <h1>Ha ocurrido un error cargando los estudiantes 🧨</h1>
      </div>
    );
  }
}
