import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Produtos.css';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [form, setForm] = useState({
    codigo: '',
    nome: '',
    categoria: '',
    descricao: '',
    quantidadeAtual: '',
    estoqueMinimo: '',
    unidade: '',
    peso: '',
    dataCadastro: new Date().toISOString().split('T')[0]
  });
  const navigate = useNavigate();

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

  const handleSearch = async () => {
    try {
      const response = await api.get('/produtos/search', { params: { termo: search } });
      setProdutos(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/produtos/${editing.id}`, form);
      } else {
        await api.post('/produtos', form);
      }
      setShowForm(false);
      setEditing(null);
      setForm({
        codigo: '',
        nome: '',
        categoria: '',
        descricao: '',
        quantidadeAtual: '',
        estoqueMinimo: '',
        unidade: '',
        peso: '',
        dataCadastro: new Date().toISOString().split('T')[0]
      });
      loadProdutos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (produto) => {
    setEditing(produto);
    setForm(produto);
    setShowForm(true);
  };

  const handleDelete = (product) => {
    setDeletingProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/produtos/${deletingProduct.id}`);
      setShowDeleteModal(false);
      setDeletingProduct(null);
      loadProdutos();
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setShowForm(false);
    setEditing(null);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingProduct(null);
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  };

  return (
    <div className="produtos-container">
      <div className="header">
        <button onClick={() => navigate('/menu')}>Voltar</button>
        <h1>Cadastro de Produtos</h1>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar por nome ou categoria..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Pesquisar</button>
        <button onClick={() => setShowForm(true)}>Novo Produto</button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Mínimo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.codigo}</td>
                <td>{p.nome}</td>
                <td>{p.categoria}</td>
                <td>{p.quantidadeAtual}</td>
                <td>{p.estoqueMinimo}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Editar</button>
                  <button onClick={() => handleDelete(p)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <h2>{editing ? 'Editar Produto' : 'Novo Produto'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Código</label>
                <input
                  type="text"
                  value={form.codigo}
                  onChange={(e) => setForm({ ...form, codigo: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Categoria</label>
                <input
                  type="text"
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <input
                  type="text"
                  value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Quantidade Atual</label>
                <input
                  type="number"
                  value={form.quantidadeAtual}
                  onChange={(e) => setForm({ ...form, quantidadeAtual: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Estoque Mínimo</label>
                <input
                  type="number"
                  value={form.estoqueMinimo}
                  onChange={(e) => setForm({ ...form, estoqueMinimo: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Unidade</label>
                <input
                  type="text"
                  value={form.unidade}
                  onChange={(e) => setForm({ ...form, unidade: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Peso</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.peso}
                  onChange={(e) => setForm({ ...form, peso: e.target.value })}
                />
              </div>
              <div className="form-actions">
                <button type="submit">Salvar</button>
                <button type="button" onClick={closeModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="modal" onClick={(e) => { if (e.target.classList.contains('modal')) closeDeleteModal(); }}>
          <div className="modal-content delete-modal">
            <h2>Excluir Produto</h2>
            <p className="delete-message">Tem certeza que deseja excluir o produto <strong>{deletingProduct?.nome}</strong>?</p>
            <p className="delete-warning">Esta ação não pode ser desfeita!</p>
            <div className="form-actions">
              <button className="delete-confirm" onClick={confirmDelete}>Excluir</button>
              <button className="delete-cancel" onClick={closeDeleteModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Produtos;
