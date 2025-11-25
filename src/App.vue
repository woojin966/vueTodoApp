
<template>
    <div class="body_wrap" :style="backgroundStyle" ref="dateSection">
        <HeaderBar />
        <section class="datewhether_section fade-down">
            <TimeDateSection class="datewhether_content" @scroll-to-todo="scrollToTodoSection" />
        </section>
        <section class="todo_section fade-up" ref="todoSection">
            <div class="content">
                <div class="todo_content">
                    <TodoInput @add-todo="addTodo" />
                    <div class="filter_delete_wrap">
                        <TodoFilter v-model="filter" />
                        <DeleteControls
                            :todos="todos"
                            @delete-all="deleteAll"
                            @delete-selected="deleteSelected"
                            @delete-done="deleteDone"
                        />
                    </div>
                    <TodoList
                        :todos="todos"
                        :filter="filter"
                        @toggle="toggleStatus"
                        @delete="deleteTodo"
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
import { ref, onMounted, computed } from 'vue'
import HeaderBar from './components/HeaderBar.vue'
import TimeDateSection from './components/TimeDateSection.vue'
import TodoInput from './components/TodoInput.vue'
import TodoFilter from './components/TodoFilter.vue'
import DeleteControls from './components/DeleteControls.vue'
import TodoList from './components/TodoList.vue'
import { useTodos } from './composables/useTodos'
import { useFadeIn } from "./composables/useFadeIn";

const {
  todos,
  addTodo,
  toggleStatus,
  deleteTodo,
  deleteAll,
  deleteSelected,
  deleteDone
} = useTodos()

// fitler
const filter = ref('all')

// Bg
const backgroundUrl = ref('')
const bgApiKey = import.meta.env.VITE_UNSPLASH_API_KEY

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
    backgroundUrl.value = data.urls.full
  } catch (err) {
    console.error('이미지 로딩 실패:', err)
  }
}

// Scroll
const todoSection = ref(null)
const dateSection = ref(null)

const scrollToTodoSection = () => {
  if (todoSection.value) {
    window.scrollTo({
      top: todoSection.value.offsetTop,
      behavior: 'smooth'
    })
  }
}

const scrollToTopSection = () => {
  if (dateSection.value) {
    window.scrollTo({
      top: dateSection.value.offsetTop,
      behavior: 'smooth'
    })
  }
}

// mount
onMounted(() => {
  fetchBackgroundImage()
})

// Bg style
const backgroundStyle = computed(() => ({
  backgroundImage: `url(${backgroundUrl.value})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
}))

// fade in
useFadeIn();
</script>


<!-- <style scoped lang="scss">
    @import 'styles/main.scss';
</style> -->