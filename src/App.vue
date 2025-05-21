
<template>
    <div class="body_wrap" :style="backgroundStyle">
        <HeaderInfo />
        <LoadMoreButton />
        <TodoInput />
        <TodoList />
    </div>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue'

    import HeaderInfo from './components/HeaderInfo.vue'
    import LoadMoreButton from './components/LoadMoreButton.vue'
    import TodoInput from './components/TodoInput.vue'
    // import TodoItem from './components/TodoItem.vue'
    import TodoList from './components/TodoList.vue'

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

    onMounted(() => {
        fetchBackgroundImage()
    })

    const backgroundStyle = computed(() => ({
        backgroundImage: `url(${backgroundUrl.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
    }))
</script>

<style scoped>

</style>