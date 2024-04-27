<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {findMovieById, hardcodedSizes} from "@/imports.mjs";

let movie = ref(null)
const router = useRouter();

let reviews = ref([]);
let review = ref({ name: '', comment: '', rating: 0 });

// Fonction appelée lors de la soumission du formulaire
const submitReview = () => {
    const { name, comment, rating } = review.value;
    const movieId = router.currentRoute.value.params.id;
    if (rating < 0 || rating > 5) {
        console.error('La note doit être comprise entre 0 et 5.');
        return;
    }

    const newReview = { id: movieId, name, comment, rating };
    reviews.value.push(newReview);
    localStorage.setItem('movieReviews', JSON.stringify(reviews.value));
    review.value = { name: '', comment: '', rating: 0 };
};

onMounted(async () => {
  const movieId = router.currentRoute.value.params.id;

  if (!movieId) {
    console.error('ID du film non défini dans les paramètres de l\'URL');
    return;
  }

  const storedReviews = localStorage.getItem('movieReviews');
  if (storedReviews) {
      reviews.value = JSON.parse(storedReviews);
  }
  reviews.value = reviews.value.filter(review => review.id === movieId);

  try {
    movie.value = await findMovieById(movieId)
    movie.value.poster_path = 'https://image.tmdb.org/t/p/'  + hardcodedSizes["poster_sizes"][4] + movie.value.poster_path

  } catch (error) {
    console.error('Erreur lors de la récupération des détails du film :', error);
  }

  console.log(movie.value)
});
</script>

<template>

  <div class ="containerObject is-desktop">
    <div class="centerObject">
      <div class="container has-text-centered is-full mt-6">
        <div class="details has-text-centered mt-6" v-if="movie">
          <div class="columns column is-one-quarter">

              <div data-aos="flip-up" class="card">
                <div class="card-image">
                  <figure class="image is-4by5">
                    <img :src="movie.poster_path" alt="Poster du film">
                  </figure>
                </div>
                <div class="card-content mt-6">
                  <div class="content">
                    <h1> Détails du film : {{ movie.title }} ({{ movie.original_title}})</h1>
                    <div class="content">
                      <h6> Description : {{ movie.overview }}</h6>
                      <h6> Date d'apparition : {{ movie.release_date }}</h6>
                      <h6> Popularité : {{ movie.popularity }}</h6>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Formulaire pour enregistrer un avis -->
              <div class="card-content">
                  <h2>Donner votre avis sur le film :</h2>
                  <form>
                      <div class="field">
                          <label class="label">Nom :</label>
                          <div class="control">
                              <input class="input" v-model="review.name" type="text" placeholder="Votre nom">
                          </div>
                      </div>
                      <div class="field">
                          <label class="label">Avis :</label>
                          <div class="control">
                              <textarea class="textarea" v-model="review.comment" placeholder="Votre avis sur le film"></textarea>
                          </div>
                      </div>
                      <div class="field">
                          <label class="label">Note :</label>
                          <div class="control">
                              <input class="input" v-model.number="review.rating" type="number" min="0" max="5" placeholder="Note de 0 à 5">
                          </div>
                      </div>
                      <div class="field">
                          <div class="control">
                              <button @click="submitReview()" class="button is-primary">Soumettre le commentaire</button>
                          </div>
                      </div>
                  </form>
              </div>

              <!-- Affichage des commentaires précédents -->
              <div class="card-content" v-if="reviews.length > 0">
                  <h2>Commentaires précédents :</h2>
                  <ul>
                      <li v-for="(review, index) in reviews" :key="index">
                          <p><strong>{{ review.name }}</strong> - Note : {{ review.rating }}</p>
                          <p>{{ review.comment }}</p>
                      </li>
                  </ul>
              </div>
              <div class="card-content" v-else>
                  <p>Aucun commentaire pour le moment.</p>
              </div>
            </div>
        </div>
      <div v-else>
        <p>Chargement des détails du film...</p>
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
  width: 2250px;
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