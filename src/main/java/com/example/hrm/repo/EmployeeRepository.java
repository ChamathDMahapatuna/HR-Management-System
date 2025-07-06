package com.example.hrm.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.hrm.model.Employee;
public interface EmployeeRepository extends JpaRepository<Employee, Long> {}