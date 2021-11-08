<template>
<alta-protolo-1></alta-protolo-1>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/NavBar.vue'
import AltaProtolo1 from './components/AltaProtocolo1.vue'
export default defineComponent({
  name: 'App',
  components: {
    NavBar,
    AltaProtolo1

  }
});
</script>

<style>

</style>
