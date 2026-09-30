const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const scrollProgress = document.querySelector(".scroll-progress");
const marqueeToggle = document.querySelector(".marquee-toggle");
const projectFilters = document.querySelectorAll(".project-filter");
const projectCards = document.querySelectorAll(".project-card");
const filterResult = document.querySelector("#filter-result");
const articleSearch = document.querySelector("[data-article-search]");
const processExplorer = document.querySelector("[data-process-explorer]");

if (processExplorer) {
  const processStages = [
    {
      title: "Discover the real problem",
      description: "We talk through your business, audience, goals, and the problem the website needs to solve before choosing a direction.",
      outcome: "Shared goals, audience needs, and a clear problem to solve.",
    },
    {
      title: "Plan the right scope",
      description: "Agree deliverables, content needs, responsibilities, dependencies, and how decisions and feedback will happen.",
      outcome: "An agreed scope, responsibilities, and decision-making plan.",
    },
    {
      title: "Structure the experience",
      description: "Organize pages, navigation, and content patterns around the questions visitors need answered.",
      outcome: "A useful page structure and clear content hierarchy.",
    },
    {
      title: "Shape the visual direction",
      description: "Review typography, color, spacing, and reusable interface patterns before the detailed build.",
      outcome: "A reviewed visual direction and reusable interface patterns.",
    },
    {
      title: "Build for people and editors",
      description: "Develop responsive WordPress pages and practical content controls, checking key interactions as the work progresses.",
      outcome: "A responsive build with content controls suited to your team.",
    },
    {
      title: "Test, hand over, and launch",
      description: "Review real content, check important journeys, and prepare a clear handoff and launch plan together.",
      outcome: "Reviewed key journeys and a practical handover plan.",
    },
  ];
  const processButtons = processExplorer.querySelectorAll(".process-step");
  const processTitle = processExplorer.querySelector("[data-process-title]");
  const processDescription = processExplorer.querySelector("[data-process-description]");
  const processOutcome = processExplorer.querySelector("[data-process-outcome]");
  const processDetail = processExplorer.querySelector(".process-detail");
  const processCount = processExplorer.querySelector("[data-process-count]");
  const processProgress = processExplorer.querySelector("[data-process-progress]");

  processButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const stageIndex = Number(button.dataset.step);
      const stage = processStages[stageIndex];
      if (!stage) return;

      processButtons.forEach((stepButton) => {
        const isSelected = stepButton === button;
        stepButton.classList.toggle("is-active", isSelected);
        stepButton.setAttribute("aria-pressed", String(isSelected));
      });

      processTitle.textContent = stage.title;
      processDescription.textContent = stage.description;
      processOutcome.textContent = stage.outcome;
      processCount.textContent = `${String(stageIndex + 1).padStart(2, "0")} / ${String(processStages.length).padStart(2, "0")}`;
      processProgress.style.width = `${((stageIndex + 1) / processStages.length) * 100}%`;
      if (!reduceMotion && processDetail?.animate) {
        processDetail.animate(
          [{ opacity: 0.72, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 240, easing: "cubic-bezier(0.2, 0.75, 0.25, 1)" },
        );
      }
    });
  });
}
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

marqueeToggle?.addEventListener("click", () => {
  const isPaused = marqueeToggle.getAttribute("aria-pressed") === "true";
  marqueeToggle.setAttribute("aria-pressed", String(!isPaused));
  marqueeToggle.setAttribute("aria-label", isPaused ? "Pause moving text" : "Resume moving text");
  marqueeToggle.textContent = isPaused ? "Pause motion" : "Resume motion";
  marqueeToggle.closest(".marquee-band")?.classList.toggle("is-paused", !isPaused);
});

function setTheme(theme) {
  root.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.setAttribute("aria-label", `Switch to ${theme === "light" ? "dark" : "light"} theme`);
  }
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.content = getComputedStyle(root).getPropertyValue("--bg").trim();
  }
}

let savedTheme;
try {
  savedTheme = localStorage.getItem("portfolio-theme");
} catch (error) {
  console.warn("Theme preference could not be loaded.", error);
}

const systemTheme = window.matchMedia("(prefers-color-scheme: light)");
setTheme(savedTheme === "light" || savedTheme === "dark"
  ? savedTheme
  : systemTheme.matches ? "light" : "dark");

systemTheme.addEventListener("change", (event) => {
  try {
    if (localStorage.getItem("portfolio-theme") === null) {
      setTheme(event.matches ? "light" : "dark");
    }
  } catch (error) {
    console.warn("System theme preference could not be applied.", error);
  }
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  setTheme(nextTheme);
  try {
    localStorage.setItem("portfolio-theme", nextTheme);
  } catch (error) {
    console.warn("Theme preference could not be saved.", error);
  }
});

function setMenuOpen(isOpen) {
  if (!menuToggle || !navLinks) return;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.querySelector(".sr-only").textContent = isOpen ? "Close navigation menu" : "Open navigation menu";
  navLinks.classList.toggle("is-open", isOpen);
}

menuToggle?.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navLinks?.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest("a")) setMenuOpen(false);
});

const interactiveHero = document.querySelector("body[data-page='home'] .hero");

if (interactiveHero && window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion) {
  let pointerFrame = 0;
  let pointerX = 50;
  let pointerY = 50;

  interactiveHero.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    const bounds = interactiveHero.getBoundingClientRect();
    pointerX = ((event.clientX - bounds.left) / bounds.width) * 100;
    pointerY = ((event.clientY - bounds.top) / bounds.height) * 100;

    if (pointerFrame) return;
    pointerFrame = window.requestAnimationFrame(() => {
      interactiveHero.style.setProperty("--hero-pointer-x", `${pointerX}%`);
      interactiveHero.style.setProperty("--hero-pointer-y", `${pointerY}%`);
      interactiveHero.classList.add("has-pointer-glow");
      pointerFrame = 0;
    });
  }, { passive: true });

  interactiveHero.addEventListener("pointerleave", () => {
    if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    interactiveHero.classList.remove("has-pointer-glow");
    interactiveHero.style.setProperty("--hero-pointer-x", "50%");
    interactiveHero.style.setProperty("--hero-pointer-y", "50%");
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const subject = `Portfolio inquiry from ${formData.get("name")}`;
    const body = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Company or website: ${formData.get("company") || "Not provided"}`,
      `Project type: ${formData.get("projectType") || "Not selected"}`,
      `Estimated budget: ${formData.get("budget") || "Not provided"}`,
      `Preferred timing: ${formData.get("timeline") || "Not provided"}`,
      "",
      formData.get("message"),
    ].join("\n");

    window.location.href = `mailto:hello@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    formStatus.textContent = "Your email app should open with your project details ready. Review and send the email there.";
  });
}

projectFilters.forEach((filterButton) => {
  const filter = filterButton.dataset.filter;
  const count = [...projectCards].filter((card) => filter === "all" || card.dataset.category === filter).length;
  const countLabel = filterButton.querySelector("[data-filter-count]");
  if (countLabel) countLabel.textContent = String(count).padStart(2, "0");

  filterButton.addEventListener("click", () => {
    projectFilters.forEach((button) => {
      const isSelected = button === filterButton;
      button.classList.toggle("is-active", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
    updateProjects();
  });
});

function updateProjects() {
  if (!projectCards.length) return;
  const activeFilter = document.querySelector(".project-filter.is-active")?.dataset.filter || "all";
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const isVisible = matchesCategory;
    const wasHidden = card.hidden;
    card.hidden = !isVisible;
    if (isVisible && wasHidden && !reduceMotion && card.animate) {
      card.animate(
        [{ opacity: 0, transform: "translateY(12px) scale(0.985)" }, { opacity: 1, transform: "translateY(0) scale(1)" }],
        { duration: 320, easing: "cubic-bezier(0.2, 0.75, 0.25, 1)" },
      );
    }
    if (isVisible) visibleCount += 1;
  });

  if (filterResult) {
    const label = activeFilter === "all" ? "" : document.querySelector(".project-filter.is-active")?.dataset.label || activeFilter;
    const context = activeFilter === "all" ? "samples" : `${label} ${visibleCount === 1 ? "sample" : "samples"}`;
    filterResult.textContent = activeFilter === "all"
      ? `Showing all ${visibleCount} samples`
      : `Showing ${visibleCount} ${context}`;
  }

  setEmptyState(document.querySelector(".project-grid"), visibleCount === 0, "No concepts are available in this category.");
}

updateProjects();

function setEmptyState(container, isEmpty, message) {
  if (!container) return;
  let emptyState = container.parentElement.querySelector(".search-empty");
  if (isEmpty && !emptyState) {
    emptyState = document.createElement("p");
    emptyState.className = "search-empty";
    emptyState.setAttribute("role", "status");
    emptyState.textContent = message;
    container.insertAdjacentElement("afterend", emptyState);
  }
  if (emptyState) emptyState.hidden = !isEmpty;
}

if (articleSearch) {
  const articleCards = [...document.querySelectorAll(".journal-list > .journal-card")];
  const articleCount = document.querySelector("[data-article-count]");
  const updateArticles = () => {
    const query = articleSearch.value.trim().toLowerCase();
    const matchingArticles = articleCards.filter((card) => {
      const matches = card.textContent.toLowerCase().includes(query);
      card.hidden = !matches;
      return matches;
    });
    if (articleCount) articleCount.textContent = `${matchingArticles.length} ${matchingArticles.length === 1 ? "article" : "articles"}`;
    setEmptyState(document.querySelector(".journal-list"), matchingArticles.length === 0, "No articles match that search.");
  };
  articleSearch.addEventListener("input", updateArticles);
  updateArticles();
}

const revealTargets = document.querySelectorAll(
  ".section-block > *, .skill-card, .service-card, .service-row, .collab-row, .quality-card, .project-card, .process-list li, .trust-strip > div, .journal-card, .principle-card, .service-detail, .experience-timeline li, .faq-list details, .case-story, .page-section > *",
);

if (!reduceMotion && "IntersectionObserver" in window) {
  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${(index % 4) * 65}ms`);
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -32px 0px" });

  revealTargets.forEach((element) => revealObserver.observe(element));
}

const sections = document.querySelectorAll("main section[id]");
if (navLinks && "IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeLink = navLinks.querySelector(`a[href="#${entry.target.id}"]`);
      if (!activeLink) return;
      navLinks.querySelectorAll("a[aria-current]").forEach((link) => link.removeAttribute("aria-current"));
      activeLink.setAttribute("aria-current", "location");
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}

let progressFrame = 0;
function updateScrollProgress() {
  if (!scrollProgress || progressFrame) return;
  progressFrame = window.requestAnimationFrame(() => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    scrollProgress.style.transform = `scaleX(${progress})`;
    progressFrame = 0;
  });
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.querySelectorAll(".magnetic-target").forEach((target) => {
    target.addEventListener("pointermove", (event) => {
      const bounds = target.getBoundingClientRect();
      const offsetX = (event.clientX - bounds.left - bounds.width / 2) * 0.06;
      const offsetY = (event.clientY - bounds.top - bounds.height / 2) * 0.08;
      target.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
    target.addEventListener("pointerleave", () => target.style.removeProperty("transform"));
  });

  document.querySelectorAll(".project-visual, .quality-card, .journal-card, .principle-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
      card.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
      if (card.classList.contains("project-visual")) {
        const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -2.4;
        const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2.4;
        card.style.setProperty("--tilt-x", `${rotateX}deg`);
        card.style.setProperty("--tilt-y", `${rotateY}deg`);
      }
    });
    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--spotlight-x");
      card.style.removeProperty("--spotlight-y");
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
    });
  });
}

const desktopMouseEffects = window.matchMedia("(hover: hover) and (pointer: fine)").matches
  && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (desktopMouseEffects) {
  const cursorDot = document.createElement("span");
  const cursorRing = document.createElement("span");
  const trailCanvas = document.createElement("canvas");
  const ambientGlow = document.createElement("div");
  const trailContext = trailCanvas.getContext("2d");
  const particles = [];

  cursorDot.className = "custom-cursor-dot";
  cursorRing.className = "custom-cursor-ring";
  cursorRing.setAttribute("aria-hidden", "true");
  trailCanvas.className = "cursor-trail-canvas";
  trailCanvas.setAttribute("aria-hidden", "true");
  ambientGlow.className = "global-cursor-glow";
  ambientGlow.setAttribute("aria-hidden", "true");
  document.body.append(trailCanvas, ambientGlow, cursorDot, cursorRing);

  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let ringX = pointerX;
  let ringY = pointerY;
  let glowX = pointerX;
  let glowY = pointerY;
  let lastSpawnX = pointerX;
  let lastSpawnY = pointerY;
  let cursorFrame = 0;
  let particleFrame = 0;

  const resizeTrailCanvas = () => {
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
  };

  const drawParticles = () => {
    particleFrame = 0;
    if (!trailContext) return;
    trailContext.clearRect(0, 0, trailCanvas.width, trailCanvas.height);

    for (let index = particles.length - 1; index >= 0; index -= 1) {
      const particle = particles[index];
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      if (particle.burst) particle.velocityY += 0.09;
      particle.alpha -= 0.02;
      particle.radius *= 0.985;

      if (particle.alpha <= 0 || particle.radius <= 0.1) {
        particles.splice(index, 1);
        continue;
      }

      trailContext.beginPath();
      trailContext.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      trailContext.fillStyle = `rgba(139, 92, 246, ${particle.alpha})`;
      trailContext.fill();
    }

    if (particles.length) particleFrame = window.requestAnimationFrame(drawParticles);
  };

  const requestParticleFrame = () => {
    if (!particleFrame) particleFrame = window.requestAnimationFrame(drawParticles);
  };

  const addTrailParticle = (x, y) => {
    particles.push({
      x,
      y,
      radius: 1.6 + Math.random() * 2,
      velocityX: (Math.random() - 0.5) * 1.4,
      velocityY: (Math.random() - 0.5) * 1.4,
      alpha: 1,
      burst: false,
    });
    if (particles.length > 90) particles.shift();
    requestParticleFrame();
  };

  const addClickBurst = (x, y) => {
    for (let index = 0; index < 12; index += 1) {
      const angle = (Math.PI * 2 * index) / 12;
      particles.push({
        x,
        y,
        radius: 2.2,
        velocityX: Math.cos(angle) * 3,
        velocityY: Math.sin(angle) * 3,
        alpha: 1,
        burst: true,
      });
    }
    if (particles.length > 90) particles.splice(0, particles.length - 90);
    requestParticleFrame();
  };

  const animateCursor = () => {
    ringX += (pointerX - ringX) * 0.15;
    ringY += (pointerY - ringY) * 0.15;
    glowX += (pointerX - glowX) * 0.07;
    glowY += (pointerY - glowY) * 0.07;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    ambientGlow.style.left = `${glowX}px`;
    ambientGlow.style.top = `${glowY}px`;
    cursorFrame = window.requestAnimationFrame(animateCursor);
  };

  const updatePointerEffects = (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    cursorDot.style.left = `${pointerX}px`;
    cursorDot.style.top = `${pointerY}px`;

    const target = document.elementFromPoint(pointerX, pointerY);
    const projectCard = target instanceof Element ? target.closest(".pj, .project-card") : null;
    const interactiveTarget = target instanceof Element ? target.closest("a, button") : null;
    cursorRing.classList.toggle("v", Boolean(projectCard));
    cursorRing.classList.toggle("m", !projectCard && Boolean(interactiveTarget));

    if (projectCard instanceof HTMLElement) {
      const bounds = projectCard.getBoundingClientRect();
      const px = (pointerX - bounds.left) / bounds.width - 0.5;
      const py = (pointerY - bounds.top) / bounds.height - 0.5;
      projectCard.style.setProperty("--project-rotate-x", `${-py * 4}deg`);
      projectCard.style.setProperty("--project-rotate-y", `${px * 4}deg`);
      projectCard.style.setProperty("--project-translate-y", "-5px");
      projectCard.style.setProperty("--tx", `${px * -12}px`);
      projectCard.style.setProperty("--ty", `${py * -12}px`);
      projectCard.classList.add("is-pointer-tilted");
    }

    const spotlightCard = target instanceof Element
      ? target.closest(".card, .project-card, .quality-card, .journal-card, .principle-card, .toolkit-card")
      : null;
    if (spotlightCard instanceof HTMLElement) {
      const bounds = spotlightCard.getBoundingClientRect();
      spotlightCard.style.setProperty("--mx", `${((pointerX - bounds.left) / bounds.width) * 100}%`);
      spotlightCard.style.setProperty("--my", `${((pointerY - bounds.top) / bounds.height) * 100}%`);
    }

    const hero = target instanceof Element ? target.closest(".hero") : null;
    const cardStack = hero?.querySelector("[data-hero-card-stack]");
    if (hero instanceof HTMLElement && cardStack instanceof HTMLElement) {
      const bounds = hero.getBoundingClientRect();
      const px = (pointerX - bounds.left) / bounds.width - 0.5;
      const py = (pointerY - bounds.top) / bounds.height - 0.5;
      cardStack.style.setProperty("--stack-rotate-y", `${px * 10}deg`);
      cardStack.style.setProperty("--stack-rotate-x", `${-py * 8}deg`);
    }

    const distanceX = pointerX - lastSpawnX;
    const distanceY = pointerY - lastSpawnY;
    if (Math.hypot(distanceX, distanceY) > 9) {
      addTrailParticle(pointerX, pointerY);
      lastSpawnX = pointerX;
      lastSpawnY = pointerY;
    }
  };

  document.addEventListener("pointermove", updatePointerEffects, { passive: true });
  document.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" || event.pointerType === "pen") {
      addClickBurst(event.clientX, event.clientY);
    }
  }, { passive: true });

  document.addEventListener("pointerout", (event) => {
    if (event.relatedTarget !== null) return;
    cursorDot.classList.add("is-hidden");
    cursorRing.classList.add("is-hidden");
    ambientGlow.classList.remove("is-visible");
  });

  document.addEventListener("pointerover", (event) => {
    if (event.target instanceof Element && event.target.closest("body")) {
      cursorDot.classList.remove("is-hidden");
      cursorRing.classList.remove("is-hidden");
      ambientGlow.classList.add("is-visible");
    }
  });

  document.addEventListener("pointerout", (event) => {
    if (!(event.target instanceof Element)) return;
    const projectCard = event.target.closest(".pj, .project-card");
    if (!(projectCard instanceof HTMLElement)
      || (event.relatedTarget instanceof Node && projectCard.contains(event.relatedTarget))) return;
    projectCard.classList.remove("is-pointer-tilted");
    projectCard.style.setProperty("--project-rotate-x", "0deg");
    projectCard.style.setProperty("--project-rotate-y", "0deg");
    projectCard.style.setProperty("--project-translate-y", "0px");
    projectCard.style.setProperty("--tx", "0px");
    projectCard.style.setProperty("--ty", "0px");
  });

  window.addEventListener("resize", resizeTrailCanvas, { passive: true });
  resizeTrailCanvas();
  cursorFrame = window.requestAnimationFrame(animateCursor);
}
