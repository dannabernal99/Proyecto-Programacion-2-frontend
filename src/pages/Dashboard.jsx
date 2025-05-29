import Banner from '../components/Banner';
import Menu from '../components/Menu';

const Dashboard = () => {
  return (
    <div>
      <Banner />
      <div style={{ display: 'flex' }}>
        <Menu />
        <div style={{ flex: 1, padding: '20px' }}>
          <h2>Bienvenida al panel de administración</h2>
          <p>Aquí puedes gestionar tu sala de belleza 💅</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;