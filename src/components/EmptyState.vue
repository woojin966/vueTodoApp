<template>
  <div class="empty_state">
    <p class="big n">{{ t("empty_msg1") }}</p>
    <p class="medium n">{{ t("empty_msg2") }}</p>
  </div>
</template>

<script setup>
  import { useI18n } from "vue-i18n";

  // i18n
  const { t } = useI18n();
</script>

<style scoped>
.empty_state {
  padding: 40px 0;
  text-align: center;
  opacity: 0.7;
  line-height: 1.4;
}
</style>
