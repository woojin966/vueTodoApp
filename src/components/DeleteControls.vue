<template>
  <div class="delete_btn_box">
    <p class="medium n">DELETE :</p>
    <button id="all_del" class="medium n" @click="$emit('delete-all')">ALL</button>
    <!-- <button id="selected_del" class="medium n" @click="$emit('delete-selected', selectedIds)">SELECTED</button> -->
    <button id="done_del" class="medium n" @click="$emit('delete-done', doneIds)">DONE</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  todos: {
    type: Array,
    default: () => []
  }
})

// const selectedIds = computed(() =>
//   props.todos.filter(todo => todo.status === 'active').map(todo => todo.id)
// )

const doneIds = computed(() =>
  props.todos.filter(todo => todo.status === 'done').map(todo => todo.id)
)
</script>

<style scoped lang="scss">
@import '../styles/deleteControls.scss';
</style>
