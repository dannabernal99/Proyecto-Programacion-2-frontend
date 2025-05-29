import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(user));

      setMensaje(`Bienvenido, ${user.name} (Rol: ${user.role})`);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      if (error.response) {
        setMensaje(error.response.data.error || 'Error de autenticación');
      } else {
        setMensaje('No se pudo conectar al servidor');
      }
    }

    setCargando(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Iniciar Sesión</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" disabled={cargando} style={styles.button}>
          {cargando ? 'Ingresando...' : 'Entrar'}
        </button>
      </form>
      {mensaje && <p style={styles.message}>{mensaje}</p>}
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    margin: '100px auto',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #aaa'
  },
  button: {
    padding: '10px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#6a0dad',
    color: 'white',
    cursor: 'pointer'
  },
  message: {
    marginTop: '15px',
    textAlign: 'center',
    color: '#6a0dad'
  }
};

export default Login;