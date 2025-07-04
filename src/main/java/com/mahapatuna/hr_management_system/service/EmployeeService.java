package com.mahapatuna.hr_management_system.service;

import com.mahapatuna.hr_management_system.entity.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {

    List<Employee> findAllEmployees();
    
    Optional<Employee> findEmployeeById(Long id);
    
    Optional<Employee> findEmployeeByEmail(String email);
    
    Employee saveEmployee(Employee employee);
    
    Employee updateEmployee(Long id, Employee updatedEmployee);
    
    void deleteEmployee(Long id);
    
    List<Employee> findEmployeesByDepartmentId(Long departmentId);
    
    List<Employee> findEmployeesByRoleId(Long roleId);
    
    boolean existsByEmail(String email);
} 