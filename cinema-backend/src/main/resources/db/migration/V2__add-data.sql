INSERT INTO director (id, name) VALUES
(1, 'Christopher Nolan'),
(2, 'Quentin Tarantino'),
(3, 'Martin Scorsese');


INSERT INTO actor (id, name) VALUES
(1, 'Leonardo DiCaprio'),
(2, 'Tom Hanks'),
(3, 'Brad Pitt'),
(4, 'Meryl Streep');


INSERT INTO movie (id, title, genre, description, director_id, runtime_min, poster_path) VALUES
(1, 'Inception', 'Science Fiction', 'A thief who enters the dreams of others to steal secrets from their subconscious.', 1, 148, 'inception_poster.jpg'),
(2, 'Pulp Fiction', 'Crime', 'Various interrelated stories of crime in Los Angeles.', 2, 154, 'pulp_fiction_poster.jpg'),
(3, 'The Departed', 'Crime', 'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.', 3, 151, 'the_departed_poster.jpg');


INSERT INTO movie_actor (actor_id, movie_id) VALUES
(1, 1),
(1, 3),
(2, 1),
(3, 2),
(4, 3);
