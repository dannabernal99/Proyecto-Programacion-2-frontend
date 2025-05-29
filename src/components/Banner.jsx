import { useNavigate } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <div className="banner">
      <h2 className="banner-title">Sala de Belleza</h2>
      <button className="cerrar-btn" onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Banner;