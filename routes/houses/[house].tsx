import axios from "npm:axios";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import CharPersonaje from "../../components/CharPersonaje.tsx";
import SeleccionarCasa from "../../components/SeleccionarCasa.tsx";

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

// Cambiamos el tipo Data para pasárselo igual que en el otro ejemplo
type Data = {
  characters: Character[];
}

export const handler: Handlers<Data> = {
  GET: async(_req: Request, ctx: FreshContext<unknown, Data>) =>{
    const house = ctx.params.house.toLowerCase();

    try {
      const response = await axios.get(`https://hp-api.onrender.com/api/characters/house/${house}`);
      const characters = response.data as Character[];
      return ctx.render({ characters });
    } catch (error) {
      console.error("Error al obtener personajes de la casa", error);
      return ctx.render({ characters: [] });
    }
  },
};

export default function HousePage({ data, params }: PageProps<Data>) {
  const house = params.house;

  return (
    <div>
      <h1>Personajes de la casa: {house.charAt(0).toUpperCase() + house.slice(1)}</h1>

      <SeleccionarCasa />
      {data.characters.length === 0 ? (
        <p>No hay personajes en esta casa (o la casa no existe).</p>
      ) : (
        <CharPersonaje characters={data.characters} />
      )}
    </div>
  );
}
