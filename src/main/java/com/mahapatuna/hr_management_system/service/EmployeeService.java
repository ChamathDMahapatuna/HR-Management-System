package com.mahapatuna.hr_management_system.service;
import com.mahapatuna.hr_management_system.dto.EmployeeDto;
import com.mahapatuna.hr_management_system.model.Department;
import com.mahapatuna.hr_management_system.model.Employee;
import com.mahapatuna.hr_management_system.model.Role;
import com.mahapatuna.hr_management_system.repo.DepartmentRepository;
import com.mahapatuna.hr_management_system.repo.EmployeeRepository;
import com.mahapatuna.hr_management_system.repo.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final RoleRepository roleRepository;

    public EmployeeService(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository, RoleRepository roleRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.roleRepository = roleRepository;
    }

    public List<EmployeeDto> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return toDto(employee);
    }

    public EmployeeDto createEmployee(EmployeeDto dto) {
        Department dept = departmentRepository.findById(dto.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));
        Role role = roleRepository.findById(dto.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        Employee employee = new Employee(
                dto.getFirstName(), dto.getLastName(), dto.getEmail(), dto.getPhone(),
                dto.getHireDate(), dto.getSalary(), dept, role
        );
        employee = employeeRepository.save(employee);
        return toDto(employee);
    }

    public EmployeeDto updateEmployee(Long id, EmployeeDto dto) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Department dept = departmentRepository.findById(dto.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));
        Role role = roleRepository.findById(dto.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        employee.setPhone(dto.getPhone());
        employee.setHireDate(dto.getHireDate());
        employee.setSalary(dto.getSalary());
        employee.setDepartment(dept);
        employee.setRole(role);

        return toDto(employeeRepository.save(employee));
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    private EmployeeDto toDto(Employee e) {
        return new EmployeeDto(
                e.getId(), e.getFirstName(), e.getLastName(), e.getEmail(), e.getPhone(),
                e.getHireDate(), e.getSalary(),
                e.getDepartment().getId(), e.getDepartment().getName(),
                e.getRole().getId(), e.getRole().getName()
        );
    }
}