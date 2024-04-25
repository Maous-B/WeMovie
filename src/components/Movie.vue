<script setup>
// eslint-disable-next-line no-unused-vars
import {onMounted, ref} from 'vue';
import {useRouter} from "vue-router";
// eslint-disable-next-line no-unused-vars
import {findMovie, hardcodedSizes} from "@/imports.mjs";
import AOS from 'aos';
import 'aos/dist/aos.css';
onMounted( async()=>{
  AOS.init()
})

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
      original_title: movie.original_title,
      title: movie.title,
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
  <div class ="containerObject is-desktop">
  <div class="centerObject">
  <div class="container has-text-centered is-full mt-6">
    <input class="input is-centered mt-6" v-model="movieTitle" @keyup.enter="onEnter" name="movieTitle" type="text" placeholder="Rechercher un film">

    <div class="columns is-multiline is-centered mt-4">
      <div class="column is-one-quarter" v-for="movie in movies" :key="movie.id">

        <div data-aos="fade-down-right" class="card">
          <div class="card-image">
            <figure class="image is-4by5">
              <img :src="movie.poster_path" alt="Poster du film">
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <h3 class="title is-5">{{movie.title}} ({{ movie.original_title }})</h3>
              <p>Aperçu : {{ movie.overview }}</p>
              <p>Date de sortie : {{ movie.release_date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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