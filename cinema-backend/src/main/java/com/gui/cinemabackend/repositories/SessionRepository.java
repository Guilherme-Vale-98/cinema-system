package com.gui.cinemabackend.repositories;


import com.gui.cinemabackend.entities.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, Long> {
}
