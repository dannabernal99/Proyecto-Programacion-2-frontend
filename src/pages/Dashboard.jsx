import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import Banner from '../components/Banner';
import Menu from '../components/Menu';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [stats, setStats] = useState({
        productos: 0,
        clientes: 0,
        ventas: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const resProductos = await fetch('http://localhost:5000/api/products');
                const resClientes = await fetch('http://localhost:5000/api/customers');
                const resVentas = await fetch('http://localhost:5000/api/orders');

                const productos = await resProductos.json();
                const clientes = await resClientes.json();
                const ventas = await resVentas.json();

                setStats({
                    productos: productos.length,
                    clientes: clientes.length,
                    ventas: ventas.length
                });
            } catch (error) {
                console.error('Error al obtener las estadísticas:', error);
            }
        };

        fetchStats();
    }, []);

    const barData = {
        labels: ['Productos', 'Clientes', 'Ventas'],
        datasets: [
            {
                label: 'Total',
                data: [stats.productos, stats.clientes, stats.ventas],
                backgroundColor: ['#9b59b6', '#8e44ad', '#d2b4de']
            }
        ]
    };

    const doughnutData = {
        labels: ['Productos', 'Clientes', 'Ventas'],
        datasets: [
            {
                label: 'Totales',
                data: [stats.productos, stats.clientes, stats.ventas],
                backgroundColor: ['#a569bd', '#bb8fce', '#d7bde2'],
                borderColor: '#fff',
                borderWidth: 1
            }
        ]
    };

    return (
        <div>
            <Banner />
            <div style={{ display: 'flex', height: '100vh' }}>
                <Menu />
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                    <h2>Bienvenida al panel de administración</h2>
                    <p>Aquí puedes gestionar tu sala de belleza 💅</p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginTop: '40px' }}>
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <h3 style={{ textAlign: 'center' }}>Estadísticas (Barras)</h3>
                            <Bar data={barData} />
                        </div>
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <h3 style={{ textAlign: 'center' }}>Estadísticas (Torta)</h3>
                            <Doughnut data={doughnutData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;