<template>
	<draggable class="dragArea" tag="ul" :list="tasks" :group="{ name: 'g1' }">
	  <li v-for="el in tasks" :key="el.name">
		<p>{{ el.name }}</p>
		<nested-draggable :tasks="el.tasks" />
	  </li>
	</draggable>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import draggable from "vuedraggable";
  
  const props = defineProps({
	tasks: {
	  type: Array,
	  required: true
	}
  });
  </script>
  
  <style scoped>
  .dragArea {
	min-height: 50px;
	outline: 1px dashed;
  }
  </style>
  