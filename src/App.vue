<script setup>

import changeLang from './components/langChanger.vue'
</script>

<template>
  <!-- <div class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div> -->
  <!-- <button class="btn">button test</button> -->
  <changeLang></changeLang>
  <router-view></router-view>
</template>


<style>

body {
  @apply bg-gray-100;
}
/* .btn {
  @apply  bg-purple-400 text-gray-50 px-4 py-2 rounded-full transition-all 
  duration-500 hover:( bg-purple-800) focus:( ring-8 ring-purple-300);
} */

#nprogress .bar {
  background-color: rgb(118, 210, 151) !important;
  height: 3px;
}
</style>
