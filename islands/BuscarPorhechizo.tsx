import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

// Tipo para los hechizos
type Spell = {
  id?: string;
  name: string;
  description: string;
};

const BuscarPorHechizo: FunctionComponent = () => {
  const [search, setSearch] = useState("");
  const [spells, setSpells] = useState<Spell[]>([]);

  const getSpells = async () => {
    const json = await fetch(`https://hp-api.onrender.com/api/spells`);
    const data: Spell[] = await json.json();
    const filtered = data.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
    setSpells(filtered);
  };

  useEffect(() => {
    if (search) {
      getSpells();
    } else {
      setSpells([]);
    }
  }, [search]);

  return (
    <div class="hechizo">
      <input
        type="text"
        placeholder="Introduce el nombre"
        value={search}
        onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
      />
      {spells.length === 0 && search && <p>No se encontraron hechizos.</p>}
      <ul class="hechizo">
        {spells.map((spell) => (
          <li key={spell.name}>
            <strong>{spell.name}</strong> 
          </li>
        ))}
      </ul>
    </div>
  );
};


export default BuscarPorHechizo;