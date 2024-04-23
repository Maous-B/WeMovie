<script setup>
import { KinesisContainer, KinesisElement} from 'vue-kinesis'
import { RouterLink, RouterView, useRouter } from 'vue-router';
import {ref} from "vue";

const router = useRouter();

</script>

<template>
  <nav class="navbar is-fixed-top is-flex is-justify-content-center is-align-items-center" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item " href="/">
            <RouterLink to="/home"><div class="has-text-weight-bold">WeMovie</div></RouterLink>
      </a>

    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <RouterLink to="/movie">Rechercher un film</RouterLink>
      </div>

      <div class="navbar-end">
      </div>
    </div>
  </nav>
  <RouterView></RouterView>
</template>

<style scoped>

</style>