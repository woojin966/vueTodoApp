
<template>
    <div class="body_wrap" :style="backgroundStyle" ref="dateSection">
        <!-- <section class="fake_section"></section> -->
        <section class="datewhether_section">
            <HeaderInfo class="datewhether_content" @scroll-to-todo="scrollToTodoSection" />
        </section>
        <section class="todo_section" ref="todoSection">
            <div class="content">
                <div class="todo_content">
                    <!-- TodoInput.vue에서 보낸 emit add-todo를 받아, add-todo와 함께 보낸 데이터 trimmed로 함수 addTodo실행 -->
                    <TodoInput @add-todo="addTodo" />
                    <!-- TodoList.vue에 todos를 props로 보냄 -->
                    <!-- TodoList.vue에서 보낸 emitupdate-todo-status와 함개 보낸 데이터 todo.id를 받아 함수 toggleStatus 실행 -->
                    <!-- emit으로 받은 delete-todo로 todo를 받아 함수 deleteTodo 실행 -->
                    <!-- delete-all, delete-selected, delete-done emit들 받아 각 함수들실행(전체삭제, 선택삭제, 마친일 삭제) -->
                    <TodoList 
                        :todos="todos"  @update-todo-status="toggleStatus" 
                        @delete-todo="deleteTodo" 
                        @delete-all="deleteAll"
                        @delete-selected="deleteSelected"
                        @delete-done="deleteDone"
                    />
                </div>
                <div class="top_btn_box">
                    <button @click="scrollToTopSection" class="move_btn top_btn">
                        TOP
                        <span>
                            <font-awesome-icon icon="chevron-up" />
                        </span>
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
    import HeaderInfo from './components/HeaderInfo.vue'
    import TodoInput from './components/TodoInput.vue'
    import TodoList from './components/TodoList.vue'

    // .body_wrap 배경이미지 unsplash api 관련
    const backgroundUrl = ref('')
    const bgApiKey = import.meta.env.VITE_UNSPLASH_API_KEY // .env에 넣어둔 키
    const fetchBackgroundImage = async () => {
        try {
            const res = await fetch(
                'https://api.unsplash.com/photos/random?query=weather',
                {
                    headers: {
                        Authorization: `Client-ID ${bgApiKey}`,
                    },
                }
            )
            const data = await res.json()
            backgroundUrl.value = data.urls.full // 또는 data.urls.regular
        } catch (err) {
            console.error('이미지 로딩 실패:', err)
        }
    }

    // todo input <-> todo list section 이동
    const todoSection = ref(null)
    const dateSection = ref(null)
    const scrollToTodoSection = () => {
        if (todoSection.value) {
            const offsetTop = todoSection.value.offsetTop
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            })
        }
    }
    const scrollToTopSection = () => {
        if (dateSection.value) {
            const offsetTop = dateSection.value.offsetTop
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            })
        }
    }

    //todo input 데이터 관련 : TodoList.vue에 보낼 todo 빈 배열로 선언
    // todoInput에서 실행할 add-todo 이벤트 : todos 배열에 객체 형식 데이터 밀어넣기, text는 emit으로 받은 데이터 trimmed가 할당됨
    const todos = ref([])
    const addTodo = (text) => {
        todos.value.push({
            id: Date.now(),
            text,
            status: 'active',
        })
    }

    // todo 완료 처리 함수 : emit으로 받은 데이터 todo.id가 매개변수 id에 할당ㄷ함
    const toggleStatus=(id)=>{
        // .find()는 배열에서 조건에 맞는 첫번째 요소를 반환 : t는 todos의 각 요소. t중에 매개변수 id와 같은 첫번째 t.id를 찾기
        // todo는 매개변수 id와 같은 id를 가진 t, todos의 요소가 할당됨
        const todo = todos.value.find(t => t.id === id)
        if(todo){
            // todo가 있다면, todo의 status를 active면 done으로 아니면 active 유지
            todo.status = todo.status === 'active'?'done':'active'
        }
        //결론 : 매개변수 id는 선택된 할 일의 아이디, todo.id가 할당됨(체크박스에 체크를 한 순간 emit을 통해 자식에서 부모로 todo.id를 보내고 부모에서 emit으로 보낸 이벤트와 데이터를 toggleStatus로 실행시키기 때문). 즉 선택된 todo.id와 같은 todos의 요소(항목)을 할당함. -> 그렇게 todo가 존재하게 되면 해당 todo의 상태를 done 혹은 active로 바꿈
    }

    // TodoList.vue에서 보낸 삭제 emit들 받아서 실행할 삭제 함수들
    // 전체 삭제
    const deleteAll = () => {
        todos.value = []
    }
    // 선택 삭제
    const deleteSelected = (ids) => {
        // todos를 emit으로 받은 dontIds를 배개변수 ids로 받아, ids를 포함하지 않은 todo.id를 가진 todo들만 필터링
        todos.value = todos.value.filter(todo => !ids.includes(todo.id))
    }
    // 전체삭제
    const deleteDone = (ids) => {
        todos.value = todos.value.filter(todo => !ids.includes(todo.id))
    }

    onMounted(() => {
        // .body_wrap 배경이미지 unsplash api
        fetchBackgroundImage()

        // todo들 localStorage에 저장하기
        const saved = localStorage.getItem('todos')
        if(saved){
            // todos에 문자화된 saved를 넣어줌
            todos.value = JSON.parse(saved)
        }
    })

    // 개별 todo 삭제 : emit으로 받은 todo.id를 매개변수 id에 할당하여 함수
    // todos의 각 요소를 todo로 하고, 매개변수 id와 같지 않은 todo.id todo 들만 필터해서 todos에 할당
    // watch서 deep:true해서 todos가 변경될때마다 감지해서 로컬스토리지 저장도 반영될 것임
    // return이 필요하지 않은 이유 : filter()안에 {}이 있으면 return이 필요한데, 이 식에서는 {}를 안쓰고 바로 todos에 대입시켜서 필요 없음
    const deleteTodo = (id) => {
        todos.value = todos.value.filter(todo => todo.id !== id)
    }

    // todos가 젼할 때마다 실행되는 감시 함수 : 변경된 todos값이 매개변수 newTodos로 들어옴
    watch(todos, (newTodos) => {    
        // 변경된 todos를 문자화된 새로운 todos인 newTodos를 로컬스토리지에 저장
        localStorage.setItem('todos', JSON.stringify(newTodos))
    }, { deep: true }) // 배열이나 객체 내부 값까지 감시함 : 안 쓰면 todos.value.push()같은 내부 변경을 감지 못 함

    // .body_wrap 배경이미지 지정하기
    const backgroundStyle = computed(() => ({
        backgroundImage: `url(${backgroundUrl.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
    }))
</script>

<style scoped>

</style>