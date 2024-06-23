package com.gui.cinemabackend.controllers;

import com.gui.cinemabackend.entities.Director;
import com.gui.cinemabackend.entities.Movie;
import com.gui.cinemabackend.entities.Session;
import com.gui.cinemabackend.model.SessionDTO;
import com.gui.cinemabackend.repositories.DirectorRepository;
import com.gui.cinemabackend.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

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

    @GetMapping("/session/{date}")
    public ResponseEntity<List<Movie>> getMovieSessionsByDate(
            @PathVariable("date") @DateTimeFormat(pattern = "dd-MM-yyyy") Date date){

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date startOfDay = calendar.getTime();

        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        Date endOfDay = calendar.getTime();


        List<Movie> movies = movieRepository.findAll();
        if (movies.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhuma sessao neste dia.");
        }

        List<Movie> filteredMovies = movies.stream().peek(movie -> {
            List<Session> f = movie.getSessions().stream()
                    .filter(session ->
                            session.getStartTime().after(startOfDay)
                                    && session.getStartTime().before(endOfDay)
                    )
                    .collect(Collectors.toList());
            movie.setSessions(f);
        }).filter(movie -> !movie.getSessions().isEmpty()).toList();

        return new ResponseEntity<>(filteredMovies, HttpStatus.OK);
    }
    @GetMapping("/{movieTitle}/{sessionId}")
    public ResponseEntity<Movie> getMovieByNameAndSessionDate(
            @PathVariable("sessionId") Long sessionId,
            @PathVariable("movieTitle") String movieTitle){
            Optional<Movie> movie = movieRepository.findByTitle(movieTitle);
            if (movie.isEmpty()){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum filme com este nome.");
            }

            movie.get().setSessions(movie.get().getSessions().stream()
                    .filter(session -> session.getId().equals(sessionId)).toList());

            if (movie.get().getSessions().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sessão não encontrada.");
            }
            return new ResponseEntity<>(movie.get(), HttpStatus.OK);

    }


}
