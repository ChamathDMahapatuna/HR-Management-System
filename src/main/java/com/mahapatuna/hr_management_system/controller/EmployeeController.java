package com.mahapatuna.hr_management_system.controller;

import com.mahapatuna.hr_management_system.dto.EmployeeDTO;
import com.mahapatuna.hr_management_system.entity.Department;
import com.mahapatuna.hr_management_system.entity.Employee;
import com.mahapatuna.hr_management_system.entity.Role;
import com.mahapatuna.hr_management_system.service.DepartmentService;
import com.mahapatuna.hr_management_system.service.EmployeeService;
import com.mahapatuna.hr_management_system.service.RoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final DepartmentService departmentService;
    private final RoleService roleService;

    @Autowired
    public EmployeeController(EmployeeService employeeService, DepartmentService departmentService, RoleService roleService) {
        this.employeeService = employeeService;
        this.departmentService = departmentService;
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.findAllEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return employeeService.findEmployeeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<Employee>> getEmployeesByDepartment(@PathVariable Long departmentId) {
        return ResponseEntity.ok(employeeService.findEmployeesByDepartmentId(departmentId));
    }

    @GetMapping("/role/{roleId}")
    public ResponseEntity<List<Employee>> getEmployeesByRole(@PathVariable Long roleId) {
        return ResponseEntity.ok(employeeService.findEmployeesByRoleId(roleId));
    }

    @PostMapping
    public ResponseEntity<?> createEmployee(@Valid @RequestBody EmployeeDTO employeeDTO) {
        // Check if email already exists
        if (employeeService.existsByEmail(employeeDTO.getEmail())) {
            return ResponseEntity.badRequest().body("Email already in use");
        }

        // Convert DTO to entity
        Employee employee = convertToEntity(employeeDTO);
        Employee savedEmployee = employeeService.saveEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @Valid @RequestBody EmployeeDTO employeeDTO) {
        // Check if employee exists
        if (!employeeService.findEmployeeById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        // Check if email is already in use by another employee
        Optional<Employee> existingEmployeeWithEmail = employeeService.findEmployeeByEmail(employeeDTO.getEmail());
        if (existingEmployeeWithEmail.isPresent() && !existingEmployeeWithEmail.get().getId().equals(id)) {
            return ResponseEntity.badRequest().body("Email already in use by another employee");
        }

        // Convert DTO to entity
        Employee employee = convertToEntity(employeeDTO);
        Employee updatedEmployee = employeeService.updateEmployee(id, employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        if (!employeeService.findEmployeeById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok().build();
    }

    // Helper method to convert DTO to Entity
    private Employee convertToEntity(EmployeeDTO employeeDTO) {
        Employee employee = new Employee();
        employee.setId(employeeDTO.getId());
        employee.setFirstName(employeeDTO.getFirstName());
        employee.setLastName(employeeDTO.getLastName());
        employee.setEmail(employeeDTO.getEmail());
        employee.setPhone(employeeDTO.getPhone());
        employee.setHireDate(employeeDTO.getHireDate());
        employee.setSalary(employeeDTO.getSalary());

        // Set department if provided
        if (employeeDTO.getDepartmentId() != null) {
            departmentService.findDepartmentById(employeeDTO.getDepartmentId())
                    .ifPresent(employee::setDepartment);
        }

        // Set role if provided
        if (employeeDTO.getRoleId() != null) {
            roleService.findRoleById(employeeDTO.getRoleId())
                    .ifPresent(employee::setRole);
        }

        return employee;
    }
}