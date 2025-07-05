package com.mahapatuna.hr_management_system.repository;

import com.mahapatuna.hr_management_system.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
    List<Employee> findByDepartmentId(Long departmentId);
    
    List<Employee> findByRoleId(Long roleId);
    
    Optional<Employee> findByEmail(String email);
    
    boolean existsByEmail(String email);
} 