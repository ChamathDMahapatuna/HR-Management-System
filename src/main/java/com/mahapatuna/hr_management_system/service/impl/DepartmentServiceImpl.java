package com.mahapatuna.hr_management_system.service.impl;

import com.mahapatuna.hr_management_system.entity.Department;
import com.mahapatuna.hr_management_system.repository.DepartmentRepository;
import com.mahapatuna.hr_management_system.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Autowired
    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Override
    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id).orElse(null);
    }

    @Override
    public Optional<Department> findDepartmentByName(String name) {
        return departmentRepository.findByName(name);
    }

    @Override
    public Department saveDepartment(Department department) {
        return departmentRepository.save(department);
    }

    @Override
    public Department updateDepartment(Department updatedDepartment) {
        if (departmentRepository.existsById(updatedDepartment.getId())) {
            return departmentRepository.save(updatedDepartment);
        }
        return null; // Could be improved with proper exception handling
    }

    @Override
    public void deleteDepartment(Long id) {
        departmentRepository.deleteById(id);
    }

    @Override
    public boolean existsByName(String name) {
        return departmentRepository.existsByName(name);
    }
} 