<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {findMovieById, hardcodedSizes} from "@/imports.mjs";

let movie = ref(null)
const router = useRouter();

onMounted(async () => {
  const movieId = router.currentRoute.value.params.id;

  if (!movieId) {
    console.error('ID du film non défini dans les paramètres de l\'URL');
    return;
  }

  try {
    movie.value = await findMovieById(movieId)
    movie.value.poster_path = 'https://image.tmdb.org/t/p/'  + hardcodedSizes["poster_sizes"][4] + movie.value.poster_path
    console.log(movie.value.poster_path)
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du film :', error);
  }

  console.log(movie.value)
});
</script>

<template>

  <div class ="containerObject is-desktop">
    <div class="centerObject">
      <div class="details is-multiline is-centered mt-4" v-if="movie">
        <div class="columns column is-one-quarter">

            <div data-aos="flip-up" class="card">
              <div class="card-image">
                <figure class="image is-4by5">
                  <img :src="movie.poster_path" alt="Poster du film">
                </figure>
              </div>
              <div class="card-content">
                <div class="content">
                  <h1> Détails du film : {{ movie.title }} ({{ movie.original_title}})</h1>
                  <div class="content">
                    <h4> Description : {{ movie.overview }}</h4>
                    <h4> Réalisé le : {{ movie.release_date }}</h4>
                    <h4> ID du film : {{ movie.id }}</h4>
                    <h4> Popularité du film : {{ movie.popularity }}</h4>

                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div v-else>
        <p>Chargement des détails du film...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.containerObject{
  display: flex;
  justify-content: center;
  justify-items: center;;
}
.centerObject{
  width: 1200px;
}
.is-full {
  width: 100%;
}

.centerObject .columns {
  display: flex;
  flex-wrap: wrap;
}

.centerObject .column {
  display: flex;
  align-items: stretch;
}

.card {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.card-content {
  flex-grow: 1;
}
</style>