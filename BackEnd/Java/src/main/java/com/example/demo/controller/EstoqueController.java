package com.example.demo.controller;

import com.example.demo.model.Movimentacao;
import com.example.demo.model.Produto;
import com.example.demo.model.Usuario;
import com.example.demo.repository.MovimentacaoRepository;
import com.example.demo.repository.ProdutoRepository;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/estoque")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class EstoqueController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MovimentacaoRepository movimentacaoRepository;

    @PostMapping("/movimentar")
    public Map<String, Object> movimentar(@RequestBody MovimentacaoRequest request) {
        Produto produto = produtoRepository.findById(request.produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        Usuario usuario = usuarioRepository.findById(request.usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Movimentacao movimentacao = new Movimentacao();
        movimentacao.setProduto(produto);
        movimentacao.setUsuario(usuario);
        movimentacao.setTipo(request.tipo);
        movimentacao.setQuantidade(request.quantidade);
        movimentacao.setDataMovimentacao(request.dataMovimentacao);

        if ("ENTRADA".equals(request.tipo)) {
            produto.setQuantidadeAtual(produto.getQuantidadeAtual() + request.quantidade);
        } else if ("SAIDA".equals(request.tipo)) {
            produto.setQuantidadeAtual(produto.getQuantidadeAtual() - request.quantidade);
        }

        produtoRepository.save(produto);
        movimentacaoRepository.save(movimentacao);

        Map<String, Object> response = new HashMap<>();
        response.put("produto", produto);
        response.put("alerta", produto.getQuantidadeAtual() <= produto.getEstoqueMinimo());

        return response;
    }

    public static class MovimentacaoRequest {
        public Long produtoId;
        public Long usuarioId;
        public String tipo;
        public Integer quantidade;
        public java.time.LocalDate dataMovimentacao;
    }
}
