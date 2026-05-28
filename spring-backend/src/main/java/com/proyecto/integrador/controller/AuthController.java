package com.proyecto.integrador.controller;

import com.proyecto.integrador.entity.Usuario;
import com.proyecto.integrador.repository.UsuarioRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;

    public AuthController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/me")
    public Map<String, Object> syncCurrentUser(@AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getClaimAsString("email");
        String username = jwt.getClaimAsString("preferred_username");
        String name = jwt.getClaimAsString("name");
        String role = extractRole(jwt);

        if (email == null || email.isBlank()) {
            email = username + "@keycloak.local";
        }

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseGet(Usuario::new);

        usuario.setNombre(firstNonBlank(name, username, email));
        usuario.setEmail(email);
        usuario.setRol(role);

        if (usuario.getPassword() == null || usuario.getPassword().isBlank()) {
            usuario.setPassword("");
        }

        Usuario saved = usuarioRepository.save(usuario);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("user", saved);
        return response;
    }

    private String extractRole(Jwt jwt) {
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        if (realmAccess != null) {
            Object rolesObject = realmAccess.get("roles");
            if (rolesObject instanceof Collection<?> roles) {
                if (containsRole(roles, "administrador") || containsRole(roles, "admin")) return "administrador";
                if (containsRole(roles, "profesor")) return "profesor";
                if (containsRole(roles, "estudiante")) return "estudiante";
            }
        }
        return "estudiante";
    }

    private boolean containsRole(Collection<?> roles, String expected) {
        return roles.stream()
                .map(String::valueOf)
                .map(String::toLowerCase)
                .map(role -> role.replaceFirst("^role_", ""))
                .anyMatch(expected::equals);
    }

    private String firstNonBlank(String... values) {
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value;
            }
        }
        return "Usuario";
    }
}
