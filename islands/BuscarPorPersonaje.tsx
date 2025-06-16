import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

// Tipos
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

const BuscarPorPersonaje: FunctionComponent = () => {
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);

  const getCharacters = async () => {
    const json = await fetch(`https://hp-api.onrender.com/api/characters`);
    const data: Character[] = await json.json();
    const filtered = data.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
    setCharacters(filtered);
  };

  useEffect(() => {
    if (search) {
      getCharacters();
    } else {
      setCharacters([]);
    }
  }, [search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Introduce el nombre"
        value={search}
        onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
      />
      
      <ul>
        {characters.map(e => <li key={e.id}>{e.name}</li>)}
      </ul>
    </div>
  );
};

export default BuscarPorPersonaje;
