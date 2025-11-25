import { onMounted } from "vue";

export function useFadeIn() {
  onMounted(() => {
    const targets = document.querySelectorAll(".fade-up, .fade-down");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    targets.forEach((el) => io.observe(el));
  });
}
