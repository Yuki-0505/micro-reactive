<script setup lang="ts">
// import Counter from './Counter.vue'
import Counter from './MicroCounter.vue'
import { useReactive } from 'micro-reactive';

defineProps<{ msg: string }>()
const count = useReactive(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <input type="number" v-micro="count">
  <div class="card">
    <Counter :count="count"></Counter>
    <p>
      Edit
      <code>components/MicroCounter.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
