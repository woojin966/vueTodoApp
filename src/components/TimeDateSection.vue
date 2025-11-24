<template>
    <div class="header">
        <div class="datetime">
            <h1>
                <span>{{ year }}</span>
                <span>{{ month }}.</span>
                <span>{{ date }}</span>
            </h1>
            <h2>
                <span>{{ ampm }}</span>
                <span>{{ hour12 }}:{{ minutes }}</span>
            </h2>
        </div>
        <div class="weather">
            <p>{{ city }}</p>
            <p>{{ weatherEmoji }} / {{ temp }}</p>
        </div>
        <div class="todobtn_box">
            <button @click="$emit('scroll-to-todo')" class="move_btn">
                TO DO
                <span>
                    <font-awesome-icon icon="chevron-down" />
                </span>
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted, computed } from 'vue'
    import axios from 'axios'

    // 날짜 시간정보
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
        year.value = now.getFullYear()
        month.value = now.getMonth() + 1
        date.value = now.getDate()
        dayName.value = days[now.getDay()]

        const hours = now.getHours()
        minutes.value = now.getMinutes().toString().padStart(2, '0')
        ampm.value = hours >= 12 ? 'PM' : 'AM'
        hour12.value = hours % 12 || 12
    }

    // 날씨정보
    const weather = ref('')
    const weatherEmoji = ref('')
    const temp = ref('')
    const city = ref('')
    const fetchWeather = (lat, lon) => {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY // .env에 넣어둔 키
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`

        axios.get(url).then(res => {
            const data = res.data
            city.value = data.name
            weather.value = data.weather[0].main
            temp.value = Math.round(data.main.temp) + '°C'
            const emojiMap = {
                Clear: '☀️',
                Clouds: '☁️',
                Rain: '🌧️',
                Snow: '❄️',
                Thunderstorm: '⛈️',
                Drizzle: '🌦️',
                Mist: '🌫️',
                Fog: '🌫️',
                Haze: '🌁'
            }
            weatherEmoji.value = emojiMap[weather.value] || ''
        })
        .catch(err => {
            console.error('날씨 정보 오류:', err)
        })
    }
    const getLocation = () => {
        if (!navigator.geolocation) {
            console.warn('위치 정보 사용 불가')
            return
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords
                fetchWeather(latitude, longitude)
            },
            (err) => {
                console.warn('위치 정보 에러:', err)
            }
        )
    }

    onMounted(() => {
        updateTime()
        const timer = setInterval(updateTime, 1000)
        getLocation() // ✅ 위치 기반 날씨 호출
        onUnmounted(() => clearInterval(timer))
    })
</script>

<style scoped lang="scss">
@import '../styles/TimeDateSection.scss';
</style>