// script.js – shared by BOTH pages
document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------------------------------------------
       BACK TO TOP BUTTON (only exists on main page)
    ------------------------------------------------------------------ */
    const backToTopBtn = document.getElementById("backToTop");

    if (backToTopBtn) {
        // start hidden
        backToTopBtn.style.display = "none";

        window.addEventListener("scroll", () => {
            if (window.scrollY > 350) {
                backToTopBtn.style.display = "inline-flex";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ------------------------------------------------------------------
       LANGUAGE BARS (only exist on main page)
    ------------------------------------------------------------------ */
    const langBars = document.querySelectorAll(".lang-bar-fill");

    if (langBars.length) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        const level = target.getAttribute("data-level") || "0";
                        target.style.width = level + "%";
                        obs.unobserve(target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        langBars.forEach((bar) => observer.observe(bar));
    }

    /* ------------------------------------------------------------------
       FOOTER YEAR (both pages)
    ------------------------------------------------------------------ */
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ------------------------------------------------------------------
       DARK MODE TOGGLE (both pages)
    ------------------------------------------------------------------ */
    const toggle = document.getElementById("themeToggle");
    const icon   = document.getElementById("themeIcon");

    // Apply saved theme
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
        document.body.classList.add("dark-mode");
        if (toggle) toggle.checked = true;
        if (icon)   icon.classList.replace("bi-sun-fill", "bi-moon-fill");
    }

    // Toggle handler
    if (toggle) {
        toggle.addEventListener("change", () => {
            const toDark = toggle.checked;

            document.body.classList.toggle("dark-mode", toDark);

            if (icon) {
                if (toDark) {
                    icon.classList.replace("bi-sun-fill", "bi-moon-fill");
                } else {
                    icon.classList.replace("bi-moon-fill", "bi-sun-fill");
                }
            }

            localStorage.setItem("theme", toDark ? "dark" : "light");
        });
    }

});

