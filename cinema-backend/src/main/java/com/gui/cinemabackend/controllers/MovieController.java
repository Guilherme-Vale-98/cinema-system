package com.gui.cinemabackend.controllers;

import com.gui.cinemabackend.entities.Director;
import com.gui.cinemabackend.entities.Movie;
import com.gui.cinemabackend.entities.Session;
import com.gui.cinemabackend.model.SessionDTO;
import com.gui.cinemabackend.repositories.DirectorRepository;
import com.gui.cinemabackend.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    DirectorRepository directorRepository;

    @PostMapping
    public ResponseEntity createNewMovie(@RequestBody Movie movie){
        if(movieRepository.existsByTitle(movie.getTitle())) {
            String message = "Movie already exists";
            HttpHeaders headers = new HttpHeaders();
            headers.add("Location", "/api/movies/" +
                    movieRepository.findByTitle(movie.getTitle()).get().getId());
            return new ResponseEntity(message, headers, HttpStatus.CONFLICT);
        }
        if(directorRepository.findByName(movie.getDirector().getName()).isPresent()){
           Director director = directorRepository.findByName(movie.getDirector().getName()).get();
           movie.setDirector(director);
        }
        movieRepository.save(movie);
        return new ResponseEntity<>(movie, HttpStatus.CREATED);
    }

    @DeleteMapping("/{movieId}")
    public ResponseEntity deleteMovieById(@PathVariable("movieId") Long movieId){
        Optional<Movie> movieOptional = movieRepository.findById(movieId);
        if (movieOptional.isEmpty()){
            String message = "Movie id not found";
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }

        movieRepository.deleteById(movieId);
        String message = "Movie deleted successfully";
        return new ResponseEntity(message, HttpStatus.OK);
    }

    @GetMapping("/{movieId}")
    public ResponseEntity getMovieById(@PathVariable("movieId") Long movieId){
        Optional<Movie> movieOptional = movieRepository.findById(movieId);
        if (movieOptional.isEmpty()){
            String message = "Movie id not found";
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }

        Movie movie = movieOptional.get();
        return new ResponseEntity(movie, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllMovies(){
        List<Movie> movies = movieRepository.findAll();
        return new ResponseEntity(movies, HttpStatus.OK);
    }

}
