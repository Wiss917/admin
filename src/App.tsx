import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      hello router
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/invoices">Invoices</Link> |{' '}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
