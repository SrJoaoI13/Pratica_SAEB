package com.example.demo.controller;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public Usuario login(@RequestBody LoginRequest request) {
        Optional<Usuario> usuario = usuarioRepository.findByLoginAndSenha(request.login, request.senha);
        if (usuario.isPresent()) {
            return usuario.get();
        }
        throw new RuntimeException("Usuário ou senha inválidos");
    }

    public static class LoginRequest {
        public String login;
        public String senha;
    }
}
