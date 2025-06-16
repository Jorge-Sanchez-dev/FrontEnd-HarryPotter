//BuscarPersonaje.tsx
import CharPersonaje from "../components/CharPersonaje.tsx";
import axios from "npm:axios";
import { Handlers, PageProps } from "$fresh/server.ts";


// Tipos de los personajes (los puedes centralizar en un fichero aparte si lo deseas)
type Wand = { wood: string; core: string; length: number | null; };

type Character = {
  id: string;
  name: string;
  image: string;
  actor: string;
  house: string;
  patronus: string;
  wand: Wand;
};

// Cambiamos el tipo para devolver también el término de búsqueda
type SearchData = { characters: Character[]; query: string };

export const handler: Handlers<SearchData | null> = {
  async POST(req, ctx) {
    const formData = await req.formData();
    const query = formData.get("name")?.toString().toLowerCase();
    if (!query) return ctx.render(null);

    try {
      const response = await axios.get("https://hp-api.onrender.com/api/characters");
      const allCharacters = response.data as Character[];
      const filtered = allCharacters.filter((char) =>
        char.name.toLowerCase().includes(query)
      );
      return ctx.render({ characters: filtered, query });
    } catch (err) {
      console.error("Error al obtener personajes", err);
      return ctx.render({ characters: [], query });
    }
  },

  GET(_, ctx) {
    return ctx.render(null);
  },
};

export default function BuscarPersonaje({ data }: PageProps<SearchData | null>) {
  return (
    <div>
      <h1>Buscar Personaje</h1>

      <form method="POST">
        <input type="text" name="name" placeholder="Introduce el nombre" required />
        <button type="submit">Buscar</button>
      </form>

      {data && (
        <>
          <h2>Resultados para: "{data.query}"</h2>
          {data.characters.length === 0 ? (
            <p>No se encontraron personajes.</p>
          ) : (
            <CharPersonaje characters={data.characters} />
          )}
        </>
      )}
    </div>
  );
}
