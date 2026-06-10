USE saep_db;

-- Remove a foreign key existente
ALTER TABLE movimentacao DROP FOREIGN KEY movimentacao_ibfk_1;

-- Adiciona a foreign key com ON DELETE CASCADE
ALTER TABLE movimentacao 
ADD CONSTRAINT movimentacao_produto_fk 
FOREIGN KEY (id_produto) 
REFERENCES produto(id_produto) 
ON DELETE CASCADE;
