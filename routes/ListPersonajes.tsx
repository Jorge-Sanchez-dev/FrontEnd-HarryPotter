// routes/ListPersonajes.tsx

import axios from "npm:axios";
import CharPersonaje from "../components/CharPersonaje.tsx";


// Definimos el tipo de personaje simplificado
type Character = {
  id: string;
  name: string;
  house: string;
  image: string;
};

export default async function ListPersonajes() {
  try {
    // Hacemos la petición con axios
    const response = await axios.get("https://hp-api.onrender.com/api/characters");

    // Obtenemos los datos
    const data = response.data;

    // Mapear sólo los campos que queremos
    const personajes: Character[] = data.map((p: any) => ({
      id: p.id,
      name: p.name,
      house: p.house,
      image: p.image,
    }));

    return (
      <div>
        <h1>Lista de Personajes</h1>
        <CharPersonaje characters={data} />
      </div>
    );

  } catch (error) {
    console.error("Error al cargar los personajes", error);
    return (
      <div>
        <h1>Ha ocurrido un error cargando los personajes 🧨</h1>
      </div>
    );
  }
}
