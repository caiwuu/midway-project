<template>
  <div class="home">
    <h1>Hi,{{ username }}!!!</h1>
  </div>
</template>
<script lang="ts" setup>
  const username = window.sessionStorage.getItem('username') || ''
</script>
