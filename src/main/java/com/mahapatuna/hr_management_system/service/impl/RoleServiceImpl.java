package com.mahapatuna.hr_management_system.service.impl;

import com.mahapatuna.hr_management_system.entity.Role;
import com.mahapatuna.hr_management_system.repository.RoleRepository;
import com.mahapatuna.hr_management_system.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<Role> findAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Optional<Role> findRoleById(Long id) {
        return roleRepository.findById(id);
    }

    @Override
    public Optional<Role> findRoleByTitle(String title) {
        return roleRepository.findByTitle(title);
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public Role updateRole(Long id, Role updatedRole) {
        if (roleRepository.existsById(id)) {
            updatedRole.setId(id);
            return roleRepository.save(updatedRole);
        }
        return null; // Could be improved with proper exception handling
    }

    @Override
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }

    @Override
    public boolean existsByTitle(String title) {
        return roleRepository.existsByTitle(title);
    }
} 