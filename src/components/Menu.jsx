import './Menu.css';

const Menu = () => {
  return (
    <div className="menu-lateral">
      <ul className="menu-lista">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Productos</a></li>
        <li><a href="#">Clientes</a></li>
        <li><a href="#">Ventas</a></li>
        <li><a href="#">Servicios</a></li>
      </ul>
    </div>
  );
};

export default Menu;