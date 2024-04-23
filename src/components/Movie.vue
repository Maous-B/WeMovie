<script setup>
// eslint-disable-next-line no-unused-vars
import {ref} from 'vue';
import {useRouter} from "vue-router";
// eslint-disable-next-line no-unused-vars
import {findMovie, hardcodedSizes} from "@/imports.mjs";

// eslint-disable-next-line no-unused-vars
const router = useRouter();

// eslint-disable-next-line no-unused-vars
const movies = ref({});

const onEnter = async (event) =>{
  try {
    const searchRequests = await findMovie(event.target.value);
    const resutats = searchRequests["results"]
    // eslint-disable-next-line no-unused-vars
    const size = Object.keys(resutats).length;
    //https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
    console.log(resutats)
    console.log("Langue : " + resutats[0]["original_language"])
    console.log("Titre : " + resutats[0]["original_title"])
    console.log("Aperçu : " + resutats[0]["overview"])
    console.log("Date d'appartition : " + resutats[0]["release_date"])
    console.log("Chemin du poster : " + "https://image.tmdb.org/t/p/" + hardcodedSizes["poster_sizes"][4] + "/" + resutats[0]["poster_path"])
    console.log(typeof resutats)

    movies.value = resutats.map(movie => ({
      id: movie.id,
      title: movie.original_title,
      overview: movie.overview,
      release_date: movie.release_date,
      poster_path: `https://image.tmdb.org/t/p/${hardcodedSizes["poster_sizes"][3]}${movie.poster_path}`
    }));
  } catch (e) {
      console.error("Une erreur s'est produite :", e);
    }
  }


</script>

<template>
  <div>
    <input class="input-large" v-model="movieTitle" @keyup.enter="onEnter" name="movieTitle" type="text" placeholder="Rechercher un film">

    <div class="movies-container">
      <div v-for="movie in movies" :key="movie.id">
        <h3>Titre : {{ movie.title }}</h3>
        <p>Aperçu : {{ movie.overview }}</p>
        <p>Date de sortie : {{ movie.release_date }}</p>
        <img :src="movie.poster_path" alt="Poster du film">
      </div>
    </div>
  </div>


</template>

<style scoped>

.input-large {
  font-size: 1.5em;
  padding: 15px;
  width: 100%;  /* Mettre la largeur à 100% */
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 20px;
}
.movies-container {
  display: flex;
  flex-wrap: wrap;          /* Permet aux éléments de passer à la ligne */
  justify-content: center;  /* Centre les éléments horizontalement */
  align-items: center;      /* Centre les éléments verticalement */
}

.movie-item {
  margin: 20px;            /* Espacement autour de chaque film */
  text-align: center;      /* Centre le texte à l'intérieur du film */
}

.movie-item img {
  max-width: 200px;        /* Largeur maximale de l'image du film */
  height: auto;            /* Hauteur auto pour conserver les proportions */
}
</style>