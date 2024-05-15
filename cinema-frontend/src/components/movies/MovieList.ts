import { Movie } from "../../types/MovieType";
  

const movieList: Movie[] = [
    {
      title: "Inception",
      genre: "Sci-Fi",
      description: "A thief who enters the dreams of others to steal secrets from their subconscious.",
      director: { name: "Christopher Nolan" },
      actors: [
        { name: "Leonardo DiCaprio" },
        { name: "Joseph Gordon-Levitt" },
        { name: "Ellen Page" }
      ],
      runtime: 148,
      posterPath: "https://i.ibb.co/hsJzXYD/inception.jpg"
    },
    {
      title: "The Shawshank Redemption",
      genre: "Drama",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      director: { name: "Frank Darabont" },
      actors: [
        { name: "Tim Robbins" },
        { name: "Morgan Freeman" }
      ],
      runtime: 142,
      posterPath: "https://i.ibb.co/mG7VTbh/shawshank.jpg"
    },
    {
      title: "The Dark Knight",
      genre: "Action",
      description: "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
      director: { name: "Christopher Nolan" },
      actors: [
        { name: "Christian Bale" },
        { name: "Heath Ledger" },
        { name: "Aaron Eckhart" }
      ],
      runtime: 152,
      posterPath: "https://i.ibb.co/8700cwp/the-dark-knight.jpg"
    },
    {
      title: "Forrest Gump",
      genre: "Drama",
      description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
      director: { name: "Robert Zemeckis" },
      actors: [
        { name: "Tom Hanks" },
        { name: "Robin Wright" }
      ],
      runtime: 142,
      posterPath: "https://i.ibb.co/7YRtxwx/forrest-gump.jpg"
    },
    {
      title: "Interstellar",
      genre: "Sci-Fi",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      director: { name: "Christopher Nolan" },
      actors: [
        { name: "Matthew McConaughey" },
        { name: "Anne Hathaway" },
        { name: "Jessica Chastain" }
      ],
      runtime: 169,
      posterPath: "https://i.ibb.co/rwJVhPJ/interstellar.webp"
    }
  ];
  
  export default movieList;