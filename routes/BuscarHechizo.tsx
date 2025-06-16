import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import axios from "npm:axios";

// Tipo para los hechizos
type Spell = {
  id?: string;
  name: string;
  description: string;
};

// Tipo del handler
type SearchData = { spells: Spell[]; query: string };

export const handler: Handlers<SearchData | null> = {
  async POST(req, ctx) {
    const formData = await req.formData();
    const query = formData.get("name")?.toString().toLowerCase();
    if (!query) return ctx.render(null);

    try {
      const response = await axios.get("https://hp-api.onrender.com/api/spells");
      const allSpells = response.data as Spell[];

      const filtered = allSpells.filter((spell) =>
        spell.name.toLowerCase().includes(query)
      );

      return ctx.render({ spells: filtered, query });
    } catch (err) {
      console.error("Error al obtener hechizos", err);
      return ctx.render({ spells: [], query });
    }
  },

  GET(_, ctx) {
    return ctx.render(null);
  },
};

export default function BuscarHechizo({ data }: PageProps<SearchData | null>) {
  return (
    <div>
      <h1>Buscar Hechizo</h1>

      <form method="POST">
        <input type="text" name="name" placeholder="Introduce el nombre" required />
        <button type="submit">Buscar</button>
      </form>

      {data && (
        <>
          <h2>Resultados para: "{data.query}"</h2>
          {data.spells.length === 0 ? (
            <p>No se encontraron hechizos.</p>
          ) : (
            <ul>
              {data.spells.map((spell) => (
                <li key={spell.name}>
                  <strong>{spell.name}:</strong> {spell.description}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
