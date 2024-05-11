package com.gui.cinemabackend;

import com.gui.cinemabackend.entities.Director;
import com.gui.cinemabackend.entities.Movie;
import com.gui.cinemabackend.entities.Session;
import com.gui.cinemabackend.entities.Ticket;
import com.gui.cinemabackend.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;

@SpringBootApplication
public class CinemaBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CinemaBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner bootstrapData(ActorRepository actorRepository,
										   DirectorRepository directorRepository,
										   MovieRepository movieRepository,
										   SessionRepository sessionRepository,
										   TicketRepository ticketRepository) {

		return args -> {

			Director director = new Director(67L, "Director Test", new ArrayList<>());
			directorRepository.save(director);
		};
	}
}

