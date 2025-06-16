//CharPersonaje.tsx
import { FunctionComponent } from "preact";
import Personaje from "./Personaje.tsx";

// Definimos el tipo de varita (por claridad)
type Wand = {
  wood: string;
  core: string;
  length: number | null;
};

// Definimos el tipo de personaje completo según la API
type CharacterType = {
  id: string;
  name: string;
  image: string;
  actor: string;
  house: string;
  patronus: string;
  wand: Wand;
};

type Props = {
  characters: Array<CharacterType>;
};

const CharPersonaje: FunctionComponent<Props> = (props) => {
  return (
    <div class="characterContainer">
      {props.characters.map((ch) => (
        <Personaje character={ch} /> 
      ))}
    </div>
  );
};

export default CharPersonaje;
