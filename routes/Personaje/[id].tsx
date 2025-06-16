import Header from "../../components/Header.tsx";
import axios from "npm:axios";
import { Handlers, FreshContext, PageProps } from "$fresh/server.ts";

// Tipos de datos
type Wand = { length: number | null };

type Character = {
  id: string;
  name: string;
  image: string;
  actor: string;
  house: string;
  dateOfBirth?: string | null;
  species: string;
  gender: string;
  wand: Wand;
};

// Tipo Data que devuelve el handler
type Data = {
  character: Character | null;
};

export const handler: Handlers<Data> = {
  GET: async(_req: Request, ctx: FreshContext<unknown, Data>) => { 
    const id = ctx.params.id;

    try {
      const res = await axios.get("https://hp-api.onrender.com/api/characters");
      const characters = res.data as Character[];
      const character = characters.find((c) => c.id === id) || null;

      return ctx.render({ character });
    } catch (error) {
      console.error("Error al obtener personaje", error);
      return ctx.render({ character: null });
    }
  },
};

export default function PersonajePage({ data }: PageProps<Data>) {
  const character = data.character;

  if (!character) return <h1>Personaje no encontrado</h1>;

  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p>
        <strong>Actor:</strong> {character.actor}
      </p>
      <p>
        <strong>Casa:</strong> {character.house}
      </p>
      <p>
        <strong>Cumpleaños:</strong> {character.dateOfBirth || "Desconocido"}
      </p>
      <p>
        <strong>Especie:</strong> {character.species}
      </p>
      <p>
        <strong>Género:</strong> {character.gender}
      </p>
      <p>
        <strong>Tamaño varita:</strong> {character.wand.length ?? "Desconocida"} pulgadas
      </p>
    </div>
  );
}
