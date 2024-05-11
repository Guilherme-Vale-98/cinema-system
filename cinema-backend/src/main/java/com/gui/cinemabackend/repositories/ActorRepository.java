package com.gui.cinemabackend.repositories;

import com.gui.cinemabackend.entities.Actor;
import com.gui.cinemabackend.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ActorRepository extends JpaRepository<Actor, Long> {

    Optional<Actor> findByName(String name);
}
