package com.gui.cinemabackend.repositories;


import com.gui.cinemabackend.entities.ERole;
import com.gui.cinemabackend.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}