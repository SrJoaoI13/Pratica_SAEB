CREATE DATABASE saep_db;

USE saep_db;

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    login VARCHAR(50) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    descricao VARCHAR(255),
    quantidade_atual INT NOT NULL,
    estoque_minimo INT NOT NULL,
    unidade VARCHAR(20),
    peso DECIMAL(10,2),
    data_cadastro DATE
);

CREATE TABLE movimentacao (
    id_movimentacao INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT NOT NULL,
    id_usuario INT NOT NULL,
    tipo VARCHAR(10) NOT NULL,
    quantidade INT NOT NULL,
    data_movimentacao DATE NOT NULL,

    FOREIGN KEY(id_produto)
        REFERENCES produto(id_produto),

    FOREIGN KEY(id_usuario)
        REFERENCES usuario(id_usuario)
);

INSERT INTO usuario
(nome,login,senha)
VALUES
('Administrador','admin','123'),
('Carlos','carlos','123'),
('Maria','maria','123');

INSERT INTO produto
(codigo,nome,categoria,descricao,quantidade_atual,estoque_minimo,unidade,peso,data_cadastro)
VALUES
('M001','Martelo','Ferramenta','Martelo aço',15,5,'UN',0.80,'2024-08-01'),
('A001','Alicate','Ferramenta','Alicate universal',20,5,'UN',0.40,'2024-08-01'),
('C001','Chave Fenda','Ferramenta','Chave fenda média',8,3,'UN',0.20,'2024-08-01');

INSERT INTO movimentacao
(id_produto,id_usuario,tipo,quantidade,data_movimentacao)
VALUES
(1,1,'ENTRADA',10,'2024-08-01'),
(2,2,'SAIDA',5,'2024-08-02'),
(3,3,'ENTRADA',15,'2024-08-03');
