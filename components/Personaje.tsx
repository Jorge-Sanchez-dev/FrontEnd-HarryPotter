//Personaje.tsx
//href={`/Personaje/${character.id}`}
import { FunctionComponent } from "preact";


type Wand = {
  wood: string;
  core: string;
  length: number | null;
};

type CharacterProps = {
  character: {
    id: string;
    name: string;
    image: string;
    actor: string;
    house: string;
    patronus: string;
    wand: Wand;
  };
};

const Personaje: FunctionComponent<CharacterProps> = ({ character }) => {
  return (
    <a href={`/Personaje/${character.id}`} class="character">
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p><strong>Actor:</strong> {character.actor}</p>
      <p><strong>Casa:</strong> {character.house || "SIN CASA"}</p>
    </a>
  );
};

export default Personaje;
