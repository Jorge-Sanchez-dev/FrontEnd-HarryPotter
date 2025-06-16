import { FunctionComponent } from "preact";

const Header: FunctionComponent = () => {
  return (
    <div class="Header">
      <a href="/">Home</a>
      <a href="/ListPersonajes">Listar personajes</a>
      <a href="/ListEstudiantes">Listar estudiantes</a>
      <a href="/ListPersonal">Listar personal</a>
      <a href="/ListaPorCasas">Listar por casas</a>
      <a href="/ListaHechizos">Listar hechizos</a>
      <a href="/BuscarPersonaje">Buscar personaje</a>
      <a href="/BuscarHechizo">Buscar hechizo</a>
    </div>
  );
};

export default Header;
