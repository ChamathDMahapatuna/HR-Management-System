package com.mahapatuna.hr_management_system.security.controller;

import com.mahapatuna.hr_management_system.security.dto.JwtResponse;
import com.mahapatuna.hr_management_system.security.dto.LoginRequest;
import com.mahapatuna.hr_management_system.security.dto.SignupRequest;
import com.mahapatuna.hr_management_system.security.entity.User;
import com.mahapatuna.hr_management_system.security.entity.UserRole;
import com.mahapatuna.hr_management_system.security.jwt.JwtUtils;
import com.mahapatuna.hr_management_system.security.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        User userDetails = (User) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        // Check if username exists
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        // Check if email exists
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // Create new user account
        User user = new User(
                signupRequest.getUsername(),
                passwordEncoder.encode(signupRequest.getPassword()),
                signupRequest.getEmail()
        );

        Set<UserRole> roles = new HashSet<>();

        // Default to EMPLOYEE role if none specified
        if (signupRequest.getRoles() == null || signupRequest.getRoles().isEmpty()) {
            roles.add(UserRole.ROLE_EMPLOYEE);
        } else {
            signupRequest.getRoles().forEach(role -> {
                switch (role.toUpperCase()) {
                    case "ADMIN":
                        roles.add(UserRole.ROLE_ADMIN);
                        break;
                    case "HR":
                        roles.add(UserRole.ROLE_HR);
                        break;
                    default:
                        roles.add(UserRole.ROLE_EMPLOYEE);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
} 