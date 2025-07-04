package com.mahapatuna.hr_management_system.service;

import com.mahapatuna.hr_management_system.entity.Department;

import java.util.List;
import java.util.Optional;

public interface DepartmentService {

    List<Department> findAllDepartments();
    
    Optional<Department> findDepartmentById(Long id);
    
    Optional<Department> findDepartmentByName(String name);
    
    Department saveDepartment(Department department);
    
    Department updateDepartment(Long id, Department updatedDepartment);
    
    void deleteDepartment(Long id);
    
    boolean existsByName(String name);
} 