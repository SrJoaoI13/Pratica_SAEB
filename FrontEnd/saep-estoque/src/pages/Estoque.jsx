import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import './Estoque.css';

function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [selectedProduto, setSelectedProduto] = useState('');
  const [tipo, setTipo] = useState('ENTRADA');
  const [quantidade, setQuantidade] = useState('');
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [alert, setAlert] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const loadProdutos = async () => {
    try {
      const response = await api.get('/produtos');
      setProdutos(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProdutos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/estoque/movimentar', {
        produtoId: parseInt(selectedProduto),
        usuarioId: user.id,
        tipo,
        quantidade: parseInt(quantidade),
        dataMovimentacao: data
      });
      if (response.data.alerta) {
        setAlert('Atenção: Estoque abaixo do mínimo!');
        setAlertType('');
      } else {
        setAlert('Movimentação registrada com sucesso!');
        setAlertType('success');
      }
      loadProdutos();
      setSelectedProduto('');
      setQuantidade('');
      setTimeout(() => setAlert(''), 5000);
    } catch (err) {
      console.error(err);
      setAlert('Erro ao registrar movimentação');
      setAlertType('');
    }
  };

  return (
    <div className="estoque-container">
      <div className="header">
        <button onClick={() => navigate('/menu')}>Voltar</button>
        <h1>Gestão de Estoque</h1>
      </div>
      {alert && <p className={`alert ${alertType}`}>{alert}</p>}
      <form className="estoque-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Produto</label>
          <select value={selectedProduto} onChange={(e) => setSelectedProduto(e.target.value)} required>
            <option value="">Selecione</option>
            {produtos.map(p => (
              <option key={p.id} value={p.id}>{p.nome} - Qtd: {p.quantidadeAtual}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Tipo</label>
          <div className="radio-group">
            <label>
              <input type="radio" value="ENTRADA" checked={tipo === 'ENTRADA'} onChange={() => setTipo('ENTRADA')} />
              Entrada
            </label>
            <label>
              <input type="radio" value="SAIDA" checked={tipo === 'SAIDA'} onChange={() => setTipo('SAIDA')} />
              Saída
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Quantidade</label>
          <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Data</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Estoque;
