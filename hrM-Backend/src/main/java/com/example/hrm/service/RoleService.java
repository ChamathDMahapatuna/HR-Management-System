package com.example.hrm.service;
import com.example.hrm.dto.RoleDto;
import com.example.hrm.model.Role;
import com.example.hrm.repo.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;

    public List<RoleDto> getAllRoles() {
        return roleRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public RoleDto getRoleById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        return toDto(role);
    }

    public RoleDto createRole(RoleDto dto) {
        Role role = new Role(dto.getName(), dto.getDescription());
        role = roleRepository.save(role);
        return toDto(role);
    }

    public RoleDto updateRole(Long id, RoleDto dto) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        role.setName(dto.getName());
        role.setDescription(dto.getDescription());
        return toDto(roleRepository.save(role));
    }

    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }

    private RoleDto toDto(Role r) {
        return new RoleDto(r.getId(), r.getName(), r.getDescription());
    }
}