package com.example.hrm.dto;

public class AuthResponse {
    private String token;
    private String message;

    public AuthResponse() {
    }

    public AuthResponse(String token) {
        this.token = token;
    }

    public AuthResponse(String token, String message) {
        this.token = token;
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public static AuthResponse success(String token) {
        return new AuthResponse(token, null);
    }

    public static AuthResponse error(String message) {
        return new AuthResponse(null, message);
    }
} 