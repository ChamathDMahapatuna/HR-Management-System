package com.mahapatuna.hr_management_system.controller;

import com.mahapatuna.hr_management_system.dto.DepartmentDTO;
import com.mahapatuna.hr_management_system.entity.Department;
import com.mahapatuna.hr_management_system.service.DepartmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "*")
public class DepartmentController {

    private final DepartmentService departmentService;

    @Autowired
    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {
        return ResponseEntity.ok(departmentService.findAllDepartments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        return departmentService.findDepartmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createDepartment(@Valid @RequestBody DepartmentDTO departmentDTO) {
        // Check if name already exists
        if (departmentService.existsByName(departmentDTO.getName())) {
            return ResponseEntity.badRequest().body("Department name already exists");
        }

        // Convert DTO to entity
        Department department = convertToEntity(departmentDTO);
        Department savedDepartment = departmentService.saveDepartment(department);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDepartment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDepartment(@PathVariable Long id, @Valid @RequestBody DepartmentDTO departmentDTO) {
        // Check if department exists
        if (!departmentService.findDepartmentById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        // Check if name is already in use by another department
        Optional<Department> existingDepartmentWithName = departmentService.findDepartmentByName(departmentDTO.getName());
        if (existingDepartmentWithName.isPresent() && !existingDepartmentWithName.get().getId().equals(id)) {
            return ResponseEntity.badRequest().body("Department name already in use by another department");
        }

        // Convert DTO to entity
        Department department = convertToEntity(departmentDTO);
        Department updatedDepartment = departmentService.updateDepartment(id, department);
        return ResponseEntity.ok(updatedDepartment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDepartment(@PathVariable Long id) {
        if (!departmentService.findDepartmentById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        departmentService.deleteDepartment(id);
        return ResponseEntity.ok().build();
    }

    // Helper method to convert DTO to Entity
    private Department convertToEntity(DepartmentDTO departmentDTO) {
        Department department = new Department();
        department.setId(departmentDTO.getId());
        department.setName(departmentDTO.getName());
        department.setDescription(departmentDTO.getDescription());
        return department;
    }
}
