package com.mahapatuna.hr_management_system.dto;


import jakarta.validation.constraints.NotBlank;

public class DepartmentDTO {
    private Long id;
    
    @NotBlank(message = "Department name is required")
    private String name;
    
    private String description;
    
    private Integer employeeCount;

    // Constructors
    public DepartmentDTO() {
    }

    public DepartmentDTO(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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