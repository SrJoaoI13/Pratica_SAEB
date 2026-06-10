import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Menu.css';

function Menu() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="menu-container">
      <h1>Bem-vindo {user?.nome}</h1>
      <div className="menu-buttons">
        <button onClick={() => navigate('/produtos')}>Cadastro Produtos</button>
        <button onClick={() => navigate('/estoque')}>Gestão Estoque</button>
        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
}

export default Menu;
