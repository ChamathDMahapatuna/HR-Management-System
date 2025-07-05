package com.mahapatuna.hr_management_system.controller;

import com.mahapatuna.hr_management_system.dto.RoleDTO;
import com.mahapatuna.hr_management_system.entity.Role;
import com.mahapatuna.hr_management_system.service.RoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "*")
public class RoleController {

    private final RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<List<Role>> getAllRoles() {
        return ResponseEntity.ok(roleService.findAllRoles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable Long id) {
        return roleService.findRoleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createRole(@Valid @RequestBody RoleDTO roleDTO) {
        // Check if title already exists
        if (roleService.existsByTitle(roleDTO.getTitle())) {
            return ResponseEntity.badRequest().body("Role title already exists");
        }

        // Convert DTO to entity
        Role role = convertToEntity(roleDTO);
        Role savedRole = roleService.saveRole(role);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRole);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRole(@PathVariable Long id, @Valid @RequestBody RoleDTO roleDTO) {
        // Check if role exists
        if (!roleService.findRoleById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        // Check if title is already in use by another role
        Optional<Role> existingRoleWithTitle = roleService.findRoleByTitle(roleDTO.getTitle());
        if (existingRoleWithTitle.isPresent() && !existingRoleWithTitle.get().getId().equals(id)) {
            return ResponseEntity.badRequest().body("Role title already in use by another role");
        }

        // Convert DTO to entity
        Role role = convertToEntity(roleDTO);
        Role updatedRole = roleService.updateRole(id, role);
        return ResponseEntity.ok(updatedRole);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable Long id) {
        if (!roleService.findRoleById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        roleService.deleteRole(id);
        return ResponseEntity.ok().build();
    }

    // Helper method to convert DTO to Entity
    private Role convertToEntity(RoleDTO roleDTO) {
        Role role = new Role();
        role.setId(roleDTO.getId());
        role.setTitle(roleDTO.getTitle());
        role.setDescription(roleDTO.getDescription());
        return role;
    }
}
