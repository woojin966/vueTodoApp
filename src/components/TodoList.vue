<template>
    <TodoInput @add-todo="addTodo" />
    <ul>
        <li v-for="todo in todos" :key="todo.id">
            {{ todo.text }}
        </li>
    </ul>
    <LoadMoreButton />
</template>

<script setup>
    import { ref } from 'vue'
    import TodoInput from './TodoInput.vue'
    import LoadMoreButton from './LoadMoreButton.vue'

    const todos = ref([])

    const addTodo = (text) => {
        todos.value.push({
            id: Date.now(),
            text,
            status: 'active',
        })
    }
</script>

<style scoped lang="scss">
@import '../assets/todoList.scss';
</style>