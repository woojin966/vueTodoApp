
<template>
    <div class="body_wrap" :style="backgroundStyle" ref="dateSection">
        <!-- <section class="fake_section"></section> -->
        <section class="datewhether_section">
            <HeaderInfo class="datewhether_content" @scroll-to-todo="scrollToTodoSection" />
        </section>
        <section class="todo_section" ref="todoSection">
            <div class="todo_content">
                <TodoInput />
                <TodoList />
                <LoadMoreButton />
            </div>
            <div class="top_btn_box">
                <button @click="scrollToTopSection" class="move_btn top_btn">
                    TOP
                    <span>
                        <font-awesome-icon icon="chevron-up" />
                    </span>
                </button>
            </div>
        </section>
        <!-- <section class="fake_section"></section> -->
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted, computed } from 'vue'
    // gsap안씀
    // import { gsap } from 'gsap'
    // import { ScrollTrigger } from 'gsap/ScrollTrigger'
    // gsap.registerPlugin(ScrollTrigger)

    import HeaderInfo from './components/HeaderInfo.vue'
    import LoadMoreButton from './components/LoadMoreButton.vue'
    import TodoInput from './components/TodoInput.vue'
    // import TodoItem from './components/TodoItem.vue'
    import TodoList from './components/TodoList.vue'

    // .body_wrap 배경이미지 unsplash api 관련
    const backgroundUrl = ref('')
    const UNSPLASH_API_KEY = 'GZHG5ipibxkhSFJRLM_gViRAfkjAvYqkR4FPS_upxuM'
    const fetchBackgroundImage = async () => {
        try {
            const res = await fetch(
                'https://api.unsplash.com/photos/random?query=weather',
                {
                    headers: {
                        Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
                    },
                }
            )
            const data = await res.json()
            backgroundUrl.value = data.urls.full // 또는 data.urls.regular
        } catch (err) {
            console.error('이미지 로딩 실패:', err)
        }
    }

    // todo input, todo list section으로 넘어가기
    const todoSection = ref(null)
    const dateSection = ref(null)
    const scrollToTodoSection = () => {
        // const targetY = todoSection.value.getBoundingClientRect().top + window.scrollY
        // window.scrollTo({ top: targetY, behavior: 'smooth' })
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

    onMounted(() => {
        // .body_wrap 배경이미지 unsplash api
        fetchBackgroundImage()

        // 이거... 못씀. 나중에 덮는 섹션 만들때 활용
        // datewhether section <-> todo section 스크롤
        // ScrollTrigger.create({
        //     trigger: ".datewhether_section",
        //     start: "top top",
        //     end: "bottom 150px",
        //     pin: ".datewhether_content"
        // });

        // ScrollTrigger.create({
        //     trigger: ".todo_section",
        //     start: "top center",
        //     end: "+=0", // 200px past the start
        //     pin: ".todo_content"
        // });
    })

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