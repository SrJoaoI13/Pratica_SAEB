package com.example.demo.controller;

import com.example.demo.model.Produto;
import com.example.demo.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping
    public List<Produto> getAll() {
        return produtoRepository.findAll();
    }

    @GetMapping("/search")
    public List<Produto> search(@RequestParam String termo) {
        return produtoRepository.findByNomeOrCategoriaContaining(termo);
    }

    @GetMapping("/{id}")
    public Produto getById(@PathVariable Long id) {
        return produtoRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }

    @PostMapping
    public Produto create(@RequestBody Produto produto) {
        return produtoRepository.save(produto);
    }

    @PutMapping("/{id}")
    public Produto update(@PathVariable Long id, @RequestBody Produto produto) {
        Produto existing = produtoRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        existing.setCodigo(produto.getCodigo());
        existing.setNome(produto.getNome());
        existing.setCategoria(produto.getCategoria());
        existing.setDescricao(produto.getDescricao());
        existing.setQuantidadeAtual(produto.getQuantidadeAtual());
        existing.setEstoqueMinimo(produto.getEstoqueMinimo());
        existing.setUnidade(produto.getUnidade());
        existing.setPeso(produto.getPeso());
        existing.setDataCadastro(produto.getDataCadastro());
        return produtoRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        produtoRepository.deleteById(id);
    }
}
