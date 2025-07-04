package com.mahapatuna.hr_management_system.repo;


import com.mahapatuna.hr_management_system.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
public interface EmployeeRepository extends JpaRepository<Employee, Long> {}