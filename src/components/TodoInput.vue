<template>
    <div class="todo_input_box">
        <input type="text" v-model="newTodo" @keydown.enter="submitTodo" class="big n" placeholder="TYPE YOUR TO DO" />
        <button class="big n" @click="submitTodo">SUBMIT</button>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const newTodo = ref('')
    const emit = defineEmits(['add-todo'])

    // 이벤트 부모 App.vue에 전달
    const submitTodo = () => {
        const trimmed = newTodo.value.trim()
        if (trimmed) {
            emit('add-todo', trimmed)
            newTodo.value = ''
        } else {
            alert('할 일을 입력해주세요!')
        }
    }
</script>

<style scoped lang="scss">
@import '../assets/todoInput.scss';
</style>