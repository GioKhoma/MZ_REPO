
// ======================================
// MINIBANK - UI INTERACTIONS
// ======================================

document.documentElement.classList.add("has-js");


// ======================================
// 1. DARK / LIGHT MODE
// ======================================

const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

let savedTheme = "light";

try {
    savedTheme = localStorage.getItem("minibank-theme") || "light";
} catch (error) {
    // Local storage unavailable
}

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    if (themeToggle) {
        themeToggle.setAttribute("aria-pressed", theme === "dark");
    }
}

applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const currentTheme = root.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        applyTheme(newTheme);

        try {
            localStorage.setItem("minibank-theme", newTheme);
        } catch (error) {
            // Theme still works without storage
        }
    });
}


// ======================================
// 2. MOBILE MENU
// ======================================

const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");

if (menuToggle && primaryNav) {

    menuToggle.addEventListener("click", function () {
        const isOpen = primaryNav.classList.toggle("is-open");

        menuToggle.classList.toggle("is-open", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when a link is clicked
    primaryNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            primaryNav.classList.remove("is-open");
            menuToggle.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


// ======================================
// 3. ACTIVE NAVIGATION LINK
// ======================================

function normalizePath(path) {
    return path.replace(/\/+$/, "") || "/";
}

const currentPath = normalizePath(window.location.pathname);

document.querySelectorAll(".nav-link").forEach(function (link) {
    const linkPath = normalizePath(new URL(link.href).pathname);

    if (linkPath === currentPath) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
    }
});


// ======================================
// 4. STICKY HEADER + SCROLL PROGRESS
// ======================================

const header = document.getElementById("siteHeader");
const scrollLine = document.getElementById("scrollLine");

function updateScrollUI() {

    const scrollTop = window.scrollY;

    if (header) {
        header.classList.toggle("scrolled", scrollTop > 20);
    }

    if (scrollLine) {
        const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = maxScroll > 0
            ? (scrollTop / maxScroll) * 100
            : 0;

        scrollLine.style.width = progress + "%";
    }
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
window.addEventListener("resize", updateScrollUI);

updateScrollUI();


// ======================================
// 5. SCROLL REVEAL ANIMATIONS
// ======================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.10,
            rootMargin: "0px 0px -20px 0px"
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(function (element) {
        element.classList.add("is-visible");
    });

}


// ======================================
// 6. BUTTON RIPPLE CLICK EFFECT
// ======================================

document.addEventListener("click", function (event) {

    const button = event.target.closest(
        ".btn, .theme-toggle, .table-action, .filter-chip"
    );

    if (!button) return;

    const rect = button.getBoundingClientRect();

    const x = event.clientX
        ? event.clientX - rect.left
        : rect.width / 2;

    const y = event.clientY
        ? event.clientY - rect.top
        : rect.height / 2;

    const ripple = document.createElement("span");

    ripple.classList.add("ripple");
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    button.appendChild(ripple);

    setTimeout(function () {
        ripple.remove();
    }, 650);

});


// ======================================
// 7. MODAL OPEN / CLOSE
// ======================================

const demoModal = document.getElementById("demoModal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");

document.querySelectorAll("[data-open-modal]").forEach(function (button) {

    button.addEventListener("click", function () {

        if (!demoModal) return;

        const title = button.dataset.modalTitle || "MiniBank";
        const message = button.dataset.modalMessage || "დემო ფანჯარა";

        modalTitle.textContent = title;
        modalMessage.textContent = message;

        if (!demoModal.open) {
            demoModal.showModal();
        }

    });

});

document.querySelectorAll("[data-modal-close]").forEach(function (button) {

    button.addEventListener("click", function () {
        if (demoModal) {
            demoModal.close();
        }
    });

});

// Click outside modal
if (demoModal) {

    demoModal.addEventListener("click", function (event) {

        if (event.target === demoModal) {
            demoModal.close();
        }

    });

}


// ======================================
// 8. 3D HOVER TILT EFFECT
// ======================================

const canTilt = window.matchMedia(
    "(pointer: fine) and (prefers-reduced-motion: no-preference)"
).matches;

if (canTilt) {

    document.querySelectorAll("[data-tilt]").forEach(function (card) {

        card.addEventListener("mousemove", function (event) {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = (x - centerX) / 35;
            const rotateX = (centerY - y) / 35;

            card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "";
        });

    });

}


// ======================================
// 9. MOUSE SPOTLIGHT EFFECT
// ======================================

document.querySelectorAll(".spotlight-card").forEach(function (card) {

    card.addEventListener("mousemove", function (event) {

        const rect = card.getBoundingClientRect();

        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty("--pointer-x", x + "%");
        card.style.setProperty("--pointer-y", y + "%");

    });

});


// ======================================
// 10. LOAN RANGE - VISUAL PREVIEW ONLY
// ======================================

const loanRange = document.getElementById("loanRange");
const rangeValue = document.getElementById("rangeValue");
const loanPreviewAmount = document.getElementById("loanPreviewAmount");

if (loanRange) {

    function updateLoanRange() {

        const amount = Number(loanRange.value);

        const formattedAmount =
            new Intl.NumberFormat("en-US").format(amount).replace(/,/g, " ") + " ₾";

        if (rangeValue) {
            rangeValue.textContent = formattedAmount;
        }

        if (loanPreviewAmount) {
            loanPreviewAmount.textContent = formattedAmount;
        }

        const min = Number(loanRange.min);
        const max = Number(loanRange.max);

        const progress = ((amount - min) / (max - min)) * 100;

        loanRange.style.setProperty(
            "--range-progress",
            progress + "%"
        );
    }

    loanRange.addEventListener("input", updateLoanRange);

    updateLoanRange();

}


// ======================================
// 11. DEMO FILTER BUTTON DESIGN
// ======================================

// Visual selection only. Does not filter Django data.

const filterButtons = document.querySelectorAll("[data-demo-tab]");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (item) {
            item.classList.remove("is-selected");
        });

        button.classList.add("is-selected");

    });

});


// ======================================
// 12. CLOSE MOBILE MENU WITH ESCAPE
// ======================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        if (primaryNav) {
            primaryNav.classList.remove("is-open");
        }

        if (menuToggle) {
            menuToggle.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        }

    }

});



// ======================================
// ANIMATED LOAN GUIDE
// ======================================

const guideModal = document.getElementById("guideModal");
const openGuideBtn = document.getElementById("openGuideBtn");
const guideClose = document.getElementById("guideClose");

const guidePrev = document.getElementById("guidePrev");
const guideNext = document.getElementById("guideNext");

const guideCurrent = document.getElementById("guideCurrent");
const guideProgress = document.getElementById("guideProgress");

const guideTexts = document.querySelectorAll("[data-guide-text]");
const guideScenes = document.querySelectorAll("[data-guide-scene]");
const guideDots = document.querySelectorAll("[data-guide-step]");

let currentGuideStep = 0;
let guideTimer = null;

const totalGuideSteps = 3;
const guideDuration = 5000;

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);


// Show selected step
function showGuideStep(step) {

    currentGuideStep = step;

    guideTexts.forEach(function (item, index) {
        item.classList.toggle("is-active", index === step);
    });

    guideScenes.forEach(function (item, index) {
        item.classList.toggle("is-active", index === step);
    });

    guideDots.forEach(function (dot, index) {
        dot.classList.toggle("active", index === step);

        if (index === step) {
            dot.setAttribute("aria-current", "step");
        } else {
            dot.removeAttribute("aria-current");
        }
    });

    guideCurrent.textContent = String(step + 1).padStart(2, "0");

    guideProgress.style.width =
        ((step + 1) / totalGuideSteps * 100) + "%";

    guidePrev.disabled = step === 0;

    guideNext.textContent =
        step === totalGuideSteps - 1
            ? "დასრულება ✓"
            : "შემდეგი →";

}


// Automatic step changes
function startGuideAnimation() {

    clearTimeout(guideTimer);

    if (reduceMotion.matches) return;

    if (currentGuideStep < totalGuideSteps - 1) {

        guideTimer = setTimeout(function () {

            showGuideStep(currentGuideStep + 1);
            startGuideAnimation();

        }, guideDuration);

    }
}


// Open guide
if (openGuideBtn && guideModal) {

    openGuideBtn.addEventListener("click", function () {

        showGuideStep(0);

        guideModal.showModal();

        startGuideAnimation();

    });

}


// Close guide
function closeGuide() {

    clearTimeout(guideTimer);

    if (guideModal && guideModal.open) {
        guideModal.close();
    }

}

if (guideClose) {
    guideClose.addEventListener("click", closeGuide);
}


// Next step
if (guideNext) {

    guideNext.addEventListener("click", function () {

        if (currentGuideStep < totalGuideSteps - 1) {

            showGuideStep(currentGuideStep + 1);
            startGuideAnimation();

        } else {

            closeGuide();

        }

    });

}


// Previous step
if (guidePrev) {

    guidePrev.addEventListener("click", function () {

        if (currentGuideStep > 0) {

            showGuideStep(currentGuideStep - 1);
            startGuideAnimation();

        }

    });

}


// Dot navigation
guideDots.forEach(function (dot) {

    dot.addEventListener("click", function () {

        const step = Number(dot.dataset.guideStep);

        showGuideStep(step);
        startGuideAnimation();

    });

});


// Click outside to close
if (guideModal) {

    guideModal.addEventListener("click", function (event) {

        if (event.target === guideModal) {
            closeGuide();
        }

    });

    // Escape key / native dialog closing
    guideModal.addEventListener("close", function () {
        clearTimeout(guideTimer);
    });

}
