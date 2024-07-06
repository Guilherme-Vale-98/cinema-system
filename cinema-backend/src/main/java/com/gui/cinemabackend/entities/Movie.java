package com.gui.cinemabackend.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "movie")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "genre", nullable = false, length = 30)
    private String genre;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Session> sessions;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "director_id", nullable = false)
    private Director director;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "movie_actor",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "actor_id")
    )
    private List<Actor> actors;

    @Column(name = "runtime_min", nullable = false)
    private int runtime;

    @Column(name = "poster_path", nullable = false, length = 100)
    private String posterPath;

    @Column(name = "trailer_path", nullable = false, length = 100)
    private String trailerPath;


    public Movie() {
    }

    public Movie(String title, String genre, String description, Director director, List<Actor> actors, int runtime, String posterPath, String trailerPath) {
        this.title = title;
        this.genre = genre;
        this.description = description;
        this.director = director;
        this.actors = actors;
        this.runtime = runtime;
        this.posterPath = posterPath;
        this.trailerPath = trailerPath;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public String getTrailerPath() {
        return trailerPath;
    }

    public void setTrailerPath(String trailerPath) {
        this.trailerPath = trailerPath;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Session> getSessions() {
        return sessions;
    }

    public void setSessions(List<Session> sessions) {
        this.sessions = sessions;
    }

    public Director getDirector() {
        return director;
    }

    public void setDirector(Director director) {
        director.getMovies().add(this);
        this.director = director;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Movie movie = (Movie) o;
        return getRuntime() == movie.getRuntime() && Objects.equals(getId(), movie.getId()) && Objects.equals(getTitle(), movie.getTitle()) && Objects.equals(getGenre(), movie.getGenre()) && Objects.equals(getDescription(), movie.getDescription()) && Objects.equals(getSessions(), movie.getSessions()) && Objects.equals(getDirector(), movie.getDirector()) && Objects.equals(getActors(), movie.getActors()) && Objects.equals(getPosterPath(), movie.getPosterPath()) && Objects.equals(getTrailerPath(), movie.getTrailerPath());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getTitle(), getGenre(), getDescription(), getSessions(), getDirector(), getActors(), getRuntime(), getPosterPath(), getTrailerPath());
    }

    public List<Actor> getActors() {
        return actors;
    }

    public void setActors(List<Actor> actors) {
        this.actors = actors;
    }

    public int getRuntime() {
        return runtime;
    }

    public void setRuntime(int runtime) {
        this.runtime = runtime;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public void addActor(Actor actor) {
        actors.add(actor);
        actor.getMovies().add(this);
    }

    public void removeActor(Actor actor) {
        actors.remove(actor);
        actor.getMovies().remove(this);
    }


}
