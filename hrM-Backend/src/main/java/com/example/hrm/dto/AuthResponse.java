package com.example.hrm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String message;

    public AuthResponse(String token) {
        this.token = token;
    }

    public static AuthResponse success(String token) {
        return new AuthResponse(token, null);
    }

    public static AuthResponse error(String message) {
        return new AuthResponse(null, message);
    }
} 