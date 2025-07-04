package com.mahapatuna.hr_management_system.repo;

import com.mahapatuna.hr_management_system.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {}