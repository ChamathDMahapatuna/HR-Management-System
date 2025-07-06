package com.example.hrm.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.hrm.model.Role;
public interface RoleRepository extends JpaRepository<Role, Long> {}