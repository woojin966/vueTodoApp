<template>
  <transition-group name="fade" tag="ul" class="todo_list fade-up">
    <li
      v-for="todo in visibleTodos"
      :key="todo.id"
      :class="{ done: todo.status === 'done' }"
    >
      <div>
        <input 
          type="checkbox"
          :checked="todo.status === 'done'"
          @change="$emit('toggle', todo.id)"
        />
        <span class="text n">{{ todo.text }}</span>
      </div>

      <button class="delete_btn text n" @click="$emit('delete', todo.id)">
        <font-awesome-icon :icon="['fas', 'trash-can']" />
      </button>
    </li>
  </transition-group>
<!-- empty state -->
  <EmptyState v-if="props.todos.length === 0" />
  <!-- MORE button -->
  <button
    v-if="showCount < filteredTodos.length"
    @click="loadMore"
    class="medium n more_btn"
  >MORE</button>
</template>

<script setup>
import { ref, computed } from 'vue'
import EmptyState from './EmptyState.vue'

const props = defineProps({
  todos: Array,
  filter: String, 
})

const filteredTodos = computed(() => {
  if (props.filter === 'todo') {
    return props.todos.filter(t => t.status === 'active')
  }
  if (props.filter === 'done') {
    return props.todos.filter(t => t.status === 'done')
  }
  return props.todos
})

// ---------- more load ----------
const showCount = ref(5)

const visibleTodos = computed(() => {
  return filteredTodos.value.slice(0, showCount.value)
})

const loadMore = () => {
  showCount.value += 5
}
</script>

<style scoped lang="scss">
@import '../styles/todoList.scss';
</style>
