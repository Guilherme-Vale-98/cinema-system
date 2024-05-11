package com.gui.cinemabackend.repositories;

import com.gui.cinemabackend.entities.Director;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DirectorRepository extends JpaRepository<Director, Long> {

    Optional<Director> findByName(String name);
}
