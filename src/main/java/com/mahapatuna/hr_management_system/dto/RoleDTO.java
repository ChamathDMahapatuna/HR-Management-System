package com.mahapatuna.hr_management_system.dto;

import jakarta.validation.constraints.NotBlank;

public class RoleDTO {
    private Long id;

    @NotBlank(message = "Role title is required")
    private String title;

    private String description;
    
    private Integer employeeCount;

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
    
    public Integer getEmployeeCount() {
        return employeeCount;
    }

    public void setEmployeeCount(Integer employeeCount) {
        this.employeeCount = employeeCount;
    }
}