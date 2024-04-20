    drop table if exists movie;
    drop table if exists actor;
    drop table if exists director;


    create table director (
        id bigint not null,
        name varchar(30) not null,
        primary key (id)
    );

   create table actor (
        id bigint not null,
        name varchar(30) not null,
        primary key (id)
    );

    create table movie (
        id bigint not null,
        title varchar(100) not null,
        genre varchar(30) not null,
        description text not null,
        director_id bigint not null,
        runtime int not null,
        poster_path varchar(100) not null,
        primary key (id),
        CONSTRAINT FOREIGN KEY (director_id) REFERENCES director (id)
    );
create table movie_actor
(
    actor_id bigint NOT NULL,
    movie_id bigint NOT NULL,
    primary key (actor_id, movie_id),
    constraint pc_actor_id_fk FOREIGN KEY (actor_id) references actor (id),
    constraint pc_movie_id_fk FOREIGN KEY (movie_id) references movie (id)
);