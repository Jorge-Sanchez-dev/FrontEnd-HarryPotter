import Header from "../../components/Header.tsx";
import axios from "npm:axios";
import { Handlers, PageProps } from "$fresh/server.ts";

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

export const handler: Handlers<Character | null> = {
  async GET(_, ctx) {
    const id = ctx.params.id;
    const res = await axios.get("https://hp-api.onrender.com/api/characters");
    const characters = res.data as Character[];
    const character = characters.find((c) => c.id === id);
    return ctx.render(character || null);
  },
};

export default function PersonajePage({ data }: PageProps<Character | null>) {
  if (!data) return <h1>Personaje no encontrado</h1>;

  return (
    <div>
      <h1>{data.name}</h1>
      <img src={data.image} alt={data.name} />
      <p>
        <strong>Actor:</strong> {data.actor}
      </p>
      <p>
        <strong>Casa:</strong> {data.house}
      </p>
      <p>
        <strong>Cumpleaños:</strong> {data.dateOfBirth || "Desconocido"}
      </p>
      <p>
        <strong>Especie:</strong> {data.species}
      </p>
      <p>
        <strong>Género:</strong> {data.gender}
      </p>
      <p>
        <strong>Tamaño varita:</strong> {data.wand.length ?? "Desconocida"}{" "}
        pulgadas
      </p>
    </div>
  );
}
