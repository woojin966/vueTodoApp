<template>
  <header class="header_bar">
    <div class="header_inner">
      <div class="actions">
        <button class="lang_btn" @click="toggleLang">
          {{ locale === 'en' ? 'EN' : 'KO' }}
        </button>
        <button class="dark_btn"            @click="toggleTheme">
            <font-awesome-icon :icon="themeIcon" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

// i18n
const { locale, t } = useI18n();
const toggleLang = () => {
  locale.value = locale.value === "en" ? "ko" : "en";
};

const theme = ref("light"); // 기본 always light

// 🔥 로딩 시 무조건 light로 시작
onMounted(() => {
  document.body.classList.remove("dark", "light");
  document.body.classList.add("light");
});

// 아이콘: light → sun, dark → moon
const themeIcon = computed(() =>
  theme.value === "dark" ? "moon" : "sun"
);

// 테마 전환
const toggleTheme = () => {
  const next = theme.value === "dark" ? "light" : "dark";

  document.body.classList.remove(theme.value);
  document.body.classList.add(next);

  theme.value = next;
};
</script>


<style scoped lang="scss">
@import '../styles/headerBar.scss';
</style>
