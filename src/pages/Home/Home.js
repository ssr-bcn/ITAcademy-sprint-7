import { Link } from 'react-router-dom';

const Home = () => 
  <div id="welcome">
    <h1>Agencia de desarrollo web</h1>
    <h3>Pide tu presupuesto</h3>
    <Link to='/budget'>Hazlo ahora</Link>
  </div>;

export default Home;