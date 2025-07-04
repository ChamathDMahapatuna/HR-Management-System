package com.mahapatuna.hr_management_system.service;

import com.mahapatuna.hr_management_system.dto.DepartmentDto;
import com.mahapatuna.hr_management_system.model.Department;
import com.mahapatuna.hr_management_system.repo.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentService {
    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<DepartmentDto> getAllDepartments() {
        return departmentRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public DepartmentDto getDepartmentById(Long id) {
        Department dept = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));
        return toDto(dept);
    }

    public DepartmentDto createDepartment(DepartmentDto dto) {
        Department dept = new Department(dto.getName(), dto.getDescription());
        dept = departmentRepository.save(dept);
        return toDto(dept);
    }

    public DepartmentDto updateDepartment(Long id, DepartmentDto dto) {
        Department dept = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));
        dept.setName(dto.getName());
        dept.setDescription(dto.getDescription());
        return toDto(departmentRepository.save(dept));
    }

    public void deleteDepartment(Long id) {
        departmentRepository.deleteById(id);
    }

    private DepartmentDto toDto(Department d) {
        return new DepartmentDto(d.getId(), d.getName(), d.getDescription());
    }
}