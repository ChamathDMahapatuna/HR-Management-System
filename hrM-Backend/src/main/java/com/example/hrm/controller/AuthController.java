package com.example.hrm.controller;

import com.example.hrm.dto.AuthRequest;
import com.example.hrm.dto.AuthResponse;
import com.example.hrm.model.User;
import com.example.hrm.repo.UserRepository;
import com.example.hrm.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername().trim(), 
                    request.getPassword()
                )
            );

            User user = (User) authentication.getPrincipal();
            String token = jwtService.generateToken(user.getUsername());

            return ResponseEntity.ok(AuthResponse.success(token));
        } catch (Exception e) {
            return ResponseEntity.status(401)
                .body(AuthResponse.error("Invalid username or password"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AuthRequest request) {
        try {
            if (userRepository.existsByUsername(request.getUsername().trim())) {
                return ResponseEntity.status(400)
                    .body(AuthResponse.error("Username already exists"));
            }

            User user = new User(
                request.getUsername().trim(),
                passwordEncoder.encode(request.getPassword()),
                request.getUsername().trim() + "@company.com",
                "ROLE_EMPLOYEE"
            );

            userRepository.save(user);
            String token = jwtService.generateToken(user.getUsername());

            return ResponseEntity.ok(AuthResponse.success(token));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body(AuthResponse.error("Registration failed. Please try again."));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
            }

            String username = authentication.getName();
            User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("username", user.getUsername());
            userInfo.put("role", user.getRole());
            userInfo.put("email", user.getEmail());

            return ResponseEntity.ok(userInfo);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to get user info"));
        }
    }
} 