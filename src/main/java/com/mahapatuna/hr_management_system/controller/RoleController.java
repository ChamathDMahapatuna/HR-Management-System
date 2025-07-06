package com.mahapatuna.hr_management_system.controller;

import com.mahapatuna.hr_management_system.dto.RoleDTO;
import com.mahapatuna.hr_management_system.entity.Role;
import com.mahapatuna.hr_management_system.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "*")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping
    public ResponseEntity<List<RoleDTO>> getAllRoles() {
        List<Role> roles = roleService.getAllRoles();
        List<RoleDTO> roleDTOs = roles.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(roleDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleDTO> getRoleById(@PathVariable Long id) {
        Role role = roleService.getRoleById(id);
        if (role != null) {
            return ResponseEntity.ok(convertToDTO(role));
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<RoleDTO> createRole(@Valid @RequestBody RoleDTO roleDTO) {
        Role role = convertToEntity(roleDTO);
        Role savedRole = roleService.saveRole(role);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedRole));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoleDTO> updateRole(@PathVariable Long id, @Valid @RequestBody RoleDTO roleDTO) {
        Role existingRole = roleService.getRoleById(id);
        if (existingRole == null) {
            return ResponseEntity.notFound().build();
        }
        
        roleDTO.setId(id);
        Role updatedRole = roleService.updateRole(convertToEntity(roleDTO));
        return ResponseEntity.ok(convertToDTO(updatedRole));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable Long id) {
        Role role = roleService.getRoleById(id);
        if (role == null) {
            return ResponseEntity.notFound().build();
        }
        roleService.deleteRole(id);
        return ResponseEntity.noContent().build();
    }

    private RoleDTO convertToDTO(Role role) {
        RoleDTO dto = new RoleDTO();
        dto.setId(role.getId());
        dto.setTitle(role.getTitle());
        dto.setDescription(role.getDescription());
        dto.setEmployeeCount(role.getEmployees() != null ? role.getEmployees().size() : 0);
        return dto;
    }

    private Role convertToEntity(RoleDTO dto) {
        Role role = new Role();
        role.setId(dto.getId());
        role.setTitle(dto.getTitle());
        role.setDescription(dto.getDescription());
        return role;
    }
} 