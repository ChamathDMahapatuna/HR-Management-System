package com.mahapatuna.hr_management_system.dto;


import javax.validation.constraints.NotBlank;

public class RoleDTO {
    private Long id;
    
    @NotBlank(message = "Role title is required")
    private String title;
    
    private String description;

    // Constructors
    public RoleDTO() {
    }

    public RoleDTO(Long id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
} 