package com.mahapatuna.hr_management_system.repository;

import com.mahapatuna.hr_management_system.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    
    Optional<Role> findByTitle(String title);
    
    boolean existsByTitle(String title);
} 