<template>
    <ul class="todo_list">
        <!-- v-for : vue 반복문 - todo는 배열 visivleTodos의 각 항목 -->
        <li
            v-for="todo in visibleTodos"
            :key="todo.id"
            :class="{ done: todo.status === 'done' }"
        >
            <input 
                type="checkbox"
                :checked="todo.status === 'done'"
                @change="toggleTodoStatus(todo)"
            />
            <span>{{ todo.text }}</span>
        </li>
    </ul>
    <button v-if="showCount < todos.length" @click="loadMore">MORE</button>
</template>

<script setup>
    import { ref, computed } from 'vue'

    // 부모 app.vue에서 보낸 todos - 처음엔 빈배열, todoInput에서 할일 등록해서 배열에 추가함.
    const props = defineProps({
        todos: Array
    })

    // 표시할 투두 항목 계산
    const showCount = ref(5) // showCount 초기값
    const visibleTodos = computed(() => {
        // slice(start, end) : start 인덱스부터 end 인덱스 전까지 잘라서 새로운 배열을 만듬
        // todos.value가 아닌이유 : todos.value는 todos가 선언된 부모 컴포넌트 App.vue에서 쓰고, 여기 자식 컴포넌트에서는 props로 전달된 일반배열 -> props.todos로 사용
        return props.todos.slice(0, showCount.value)
    })

    // 더보기 클릭 : 할 일 5개씩 추가 표시
    const loadMore = () => {
        showCount.value += 5 // showCount 5Tlr cnrk
    }

    // 체크박스로 상태 변경 요청 보내기
    const emit = defineEmits(['update-todo-status'])
    const toggleTodoStatus = (todo) => {
        emit('update-todo-status', todo.id)
    }
</script>

<style scoped lang="scss">
@import '../assets/todoList.scss';
</style>