<!--
 * @Author: caiwu
 * @Description: 
 * @CreateDate: 
 * @LastEditor: 
 * @LastEditTime: 2022-07-07 14:52:24
-->
<template>
  <div class="home">
    <h1>Hi,{{ username }}!!!</h1>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const username = window.sessionStorage.getItem('username') || ''
if (!username) {
  router.push({
    path: '/login',
  })
}
</script>
