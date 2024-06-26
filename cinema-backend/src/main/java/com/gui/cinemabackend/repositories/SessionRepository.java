package com.gui.cinemabackend.repositories;


import com.gui.cinemabackend.entities.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Long> {

    @Query("SELECT s FROM Session s WHERE s.startTime BETWEEN :startOfDay AND :endOfDay")
    List<Session> findSessionsByDate(@Param("startOfDay") Date startOfDay, @Param("endOfDay") Date endOfDay);
}
