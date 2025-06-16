<template>
    <div class="filter_box">
        <button id="placeholder_btn" class="medium n" @click="shownFilter" ref="filterBtn">
            <span>{{ placeholderText }}</span>
            <font-awesome-icon icon="chevron-down" />
        </button>
        <ul ref="filterList">
            <!-- 각 버튼 클릭시 setFilter함수 실행 : 각 버튼에 매개변수를 보내서, filterType과 placeholderText에 할당해서 위의 플레이스홀더 변경하고, 필터링 하기 위한 각 필터의 감지할 value에 할당시키기 -->
            <li>
                <button id="show_all" class="medium n" @click="setFilter('all')">ALL</button>
            </li>
            <li>
                <button id="show_todo" class="medium n" @click="setFilter('todo')">TODO</button>
            </li>
            <li>
                <button id="show_done" class="medium n" @click="setFilter('done')">DONE</button>
            </li>
        </ul>
    </div>
    <div class="delete_btn_box">
        <button id="all_del" @click="deleteAllTodos">ALL</button>
        <button id="selected_del" @click="deleteSelectedTodos">SELECTED</button>
        <button id="done_del" @click="deleteDoneTodos">DONE</button>
    </div>
    <transition-group name="fade" tag="ul" class="todo_list">
        <!-- v-for : vue 반복문 - todo는 배열 visivleTodos의 각 항목 -->
        <li
            v-for="todo in visibleTodos"
            :key="todo.id"
            :class="{ done: todo.status === 'done' }"
        >
            <div>
                <input 
                    type="checkbox"
                    :checked="todo.status === 'done'"
                    @change="toggleTodoStatus(todo)"
                />
                <span>{{ todo.text }}</span>
            </div>
            <!-- 클릭시 deleteTodo함수 발동 : 해당 todo.id 담아서 부모로 emit -->
            <button class="delete_btn" @click="deleteTodo(todo)">
                <font-awesome-icon :icon="['fas', 'trash-can']" />
            </button>
        </li>
    </transition-group>
    <!-- todo의 개수가 showCount보다 크면 보이기(v-if), 클릭시 loadMore함수 실현(5개씩 더 보이기) -->
    <button v-if="showCount < todos.length" @click="loadMore">MORE</button>
</template>

<script setup>
    import { ref, computed } from 'vue'

    // props들
    // 부모 app.vue에서 보낸 todos - 처음엔 빈배열, todoInput에서 할일 등록해서 배열에 추가함.
    const props = defineProps({
        todos: Array
    })

    // emit들 정의
    const emit = defineEmits(['update-todo-status', 'delete-todo', 'delete-all', 'delete-selected', 'delete-done'])

    // 표시할 투두 항목 계산
    const showCount = ref(5) // showCount 초기값
    // 할일들 필터링 : props.value를 computed로 계산해서 visivleTodos에 새로 담기 -> 반복문 사용
    const visibleTodos = computed(() => {
        // 각 필터 버튼 클릭시 setFilter함수를 통해 받은 type들 = filterType.valuedp 따라 각 todo의 상태값에 따라 필터링
        const filteredTodos = props.todos.filter((todo) => {
            if(filterType.value === 'todo') return todo.status === 'active' // TODO만
            if(filterType.value === 'done') return todo.status === 'done' // DONE만
            return true // ALL
        })
        // slice(start, end) : start 인덱스부터 end 인덱스 전까지 잘라서 새로운 배열을 만듬
        // todos.value가 아닌이유 : todos.value는 todos가 선언된 부모 컴포넌트 App.vue에서 쓰고, 여기 자식 컴포넌트에서는 props로 전달된 일반배열 -> props.todos로 사용
        // 위에 내용은 filteredTodos로 필터링 하기전에 내용. props.todos를 필터링한 filteredTodos를 5개씩 자르기
        return filteredTodos.slice(0, showCount.value)
    })

    // 더보기 클릭 : 할 일 5개씩 추가 표시
    const loadMore = () => {
        showCount.value += 5 // showCount 5씩 추가
    }

    // 체크박스로 상태 변경 요청 보내기 : todo는 visibleTodos의 각 요소(v-for todo in visibleTodos)
    const toggleTodoStatus = (todo) => {
        emit('update-todo-status', todo.id)
    }

    // 각 할일 삭제 버튼
    const deleteTodo = (todo) => {
        emit('delete-todo', todo.id)
    }

    // 필터기능
    const filterType = ref('all') // 필터타입 초기 설정 : all, selected, done
    const placeholderText = ref('all') // placeholder 텍스트 초기설정 : ALL, SELECTED, DONE(css로 대문자화 필요)
    // 각 버튼들 클릭하면 실행될 함수 setFilter : 각 버튼이 보낸 매개변수들을 type으로 받아 각 필터타입과 플레이스 텍스트들에 할당
    const filterBtn = ref(null)
    const filterList = ref(null)    

    const setFilter = (type) => {
        filterType.value = type
        placeholderText.value = type
        filterList.value.classList.remove('on')
    }
    // 필터 옵션 보이게 하기
    const shownFilter = () => {
        filterList.value.classList.toggle('on')
    }

    // 전체삭제, 선택삭제, 마친일 삭제
    // 전체 삭제 '', ', ''
    const deleteAllTodos = () => {
        emit('delete-all')
    }
    // 선택 삭제
    const deleteSelectedTodos = () => {
        // props.todos를 상태 'done'만 필터해서, 필터된 todo들만 id를 추출해서 doneIds에 저장
        const doneIds = props.todos.filter(todo => todo.status === 'done').map(todo => todo.id)
        // emit명 delete-selected과 함께 데이터 doneIds보냄
        emit('delete-selected', doneIds)
    }
    // 마친일 삭제
    const deleteDoneTodos = () => {
        const doneIds = props.todos.filter(todo => todo.status === 'done').map(todo => todo.id)
        emit('delete-done', doneIds)
    }
</script>

<style scoped lang="scss">
@import '../assets/todoList.scss';
</style>