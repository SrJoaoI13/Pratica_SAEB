package com.example.demo.repository;

import com.example.demo.model.Movimentacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {
    List<Movimentacao> findByProdutoId(Long produtoId);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Movimentacao m WHERE m.produto.id = :produtoId")
    void deleteByProdutoId(@Param("produtoId") Long produtoId);
}
