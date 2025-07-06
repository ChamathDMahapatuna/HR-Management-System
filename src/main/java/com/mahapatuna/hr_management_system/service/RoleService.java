package com.mahapatuna.hr_management_system.service;

import com.mahapatuna.hr_management_system.entity.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {

    List<Role> getAllRoles();
    
    Role getRoleById(Long id);
    
    Optional<Role> findRoleByTitle(String title);
    
    Role saveRole(Role role);
    
    Role updateRole(Role updatedRole);
    
    void deleteRole(Long id);
    
    boolean existsByTitle(String title);
} 