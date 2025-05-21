<template>
    <div class="header">
        <div class="datetime">
            <!-- <h1 v-html="formattedDate"></h1>
            <h2 v-html="formattedTime"></h2> -->
            <h1>
                <span>{{ year }}</span>
                <span>{{ month }}.</span>
                <span>{{ date }}</span>
                <!-- <span>({{ dayName }})</span> -->
            </h1>
            <h2>
                <span>{{ ampm }}</span>
                <span>{{ hour12 }}:{{ minutes }}</span>
            </h2>
        </div>
        <div class="weather">
            <p>날씨!</p>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue'

    // const formattedDate = ref('')
    // const formattedTime = ref('')
    const year = ref(0)
    const month = ref(0)
    const date = ref(0)
    const dayName = ref('')
    const hour12 = ref(0)
    const minutes = ref('')
    const ampm = ref('')

    const updateTime = () => {
        const now = new Date()
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
        // formattedDate.value = `
        //         <span>${now.getFullYear()}</span>
        //         <span>${now.getMonth() + 1}.</span>
        //         <span>${now.getDate()}</span>
        //         <span>(${days[now.getDay()]})</span>
        // `
        year.value = now.getFullYear()
        month.value = now.getMonth() + 1
        date.value = now.getDate()
        dayName.value = days[now.getDay()]

        const hours = now.getHours()
        minutes.value = now.getMinutes().toString().padStart(2, '0')
        ampm.value = hours >= 12 ? 'PM' : 'AM'
        hour12.value = hours % 12 || 12
        // formattedTime.value = `
        //         <span>${ampm}</span>
        //         <span>${hour12}:${minutes}</span>
        // `
    }

    onMounted(() => {
        updateTime()
        const timer = setInterval(updateTime, 1000)
        onUnmounted(() => clearInterval(timer))
    })
</script>

<style scoped lang="scss">
@import '../assets/headerInfo.scss';
</style>