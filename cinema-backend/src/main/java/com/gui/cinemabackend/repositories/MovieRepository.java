package com.gui.cinemabackend.repositories;

import com.gui.cinemabackend.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    Optional<Movie> findByTitle(String title);
    boolean existsByTitle(String movieTitle);
    List<Movie> findByIsFeatured(boolean isFeatured);
}
