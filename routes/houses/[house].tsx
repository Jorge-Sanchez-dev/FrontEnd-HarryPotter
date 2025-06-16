import Header from "../../components/Header.tsx";
import CharPersonaje from "../../components/CharPersonaje.tsx";
import axios from "https://esm.sh/axios@1.6.8";
import { Handlers, PageProps } from "$fresh/server.ts";
import SeleccionarCasa from "../../components/SeleccionarCasa.tsx";

// Tipos de personaje (si no los tienes ya centralizados)
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

// SSR: usamos Handlers de Fresh
export const handler: Handlers<Character[]> = {
  async GET(_req, ctx) {
    const house = ctx.params.house.toLowerCase();

    try {
      const response = await axios.get(`https://hp-api.onrender.com/api/characters/house/${house}`);
      const data = response.data as Character[];
      return ctx.render(data);
    } catch (error) {
      console.error("Error al obtener personajes de la casa", error);
      return ctx.render([]);
    }
  },
};

export default function HousePage({ data, params }: PageProps<Character[]>) {
  const house = params.house;

  return (
    <div>
      <h1>Personajes de la casa: {house.charAt(0).toUpperCase() + house.slice(1)}</h1>

      <SeleccionarCasa />
      {data.length === 0 ? (
        <p>No hay personajes en esta casa (o la casa no existe).</p>
      ) : (
        <CharPersonaje characters={data} />
      )}
    </div>
  );
}
