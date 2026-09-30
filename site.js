const siteHeader = document.querySelector("#site-header");
const siteFooter = document.querySelector("#site-footer");

const navigation = [
  ["Home", "index.html", "home"],
  ["About", "about.html", "about"],
  ["Services", "services.html", "services"],
  ["Projects", "projects.html", "projects"],
  ["Journey", "blog.html", "blog"],
  ["Contact", "contact.html", "contact"],
];

if (siteHeader) {
  const currentPage = document.body.dataset.page || "home";
  const activePage = currentPage.startsWith("project-")
    ? "projects"
    : currentPage.startsWith("service-")
      ? "services"
    : currentPage.startsWith("article-")
      ? "blog"
      : currentPage;

  siteHeader.innerHTML = `
    <nav class="nav-shell" aria-label="Main navigation">
      <a class="wordmark" href="index.html" aria-label="Mehbub Hossen Fahim, home">Fahim<span>.dev</span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
        <span class="sr-only">Open navigation menu</span><span></span><span></span>
      </button>
      <div class="nav-links" id="primary-nav">
        ${navigation.map(([label, href, id]) => `<a href="${href}"${activePage === id ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
      </div>
      <div class="nav-actions">
        <button class="theme-toggle" type="button" aria-label="Switch to light theme" title="Switch theme">
          <svg class="theme-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path></svg>
          <svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 15.5A8.5 8.5 0 0 1 8.5 3.6 8.5 8.5 0 1 0 20.4 15.5Z"></path></svg>
        </button>
        <a class="nav-contact" href="contact.html">Let’s Talk <span aria-hidden="true">↗</span></a>
      </div>
    </nav>`;
}

if (siteFooter) {
  siteFooter.innerHTML = `
    <div class="footer-inner section-shell">
      <div class="footer-main">
        <div class="footer-brand">
          <a class="wordmark" href="index.html" aria-label="Web, home">web<span>.</span></a>
          <p>Thoughtful WordPress development, built around the people who use and manage your site.</p>
          <a class="footer-contact-link" href="contact.html">Have a project in mind? <span aria-hidden="true">↗</span></a>
        </div>
        <nav class="footer-nav" aria-label="Explore">
          <span class="footer-heading">EXPLORE</span>
          <a href="about.html">About</a><a href="skills.html">Skills & tools</a><a href="projects.html">Selected work</a><a href="experience.html">Experience</a><a href="resume.html">Resume</a><a href="testimonials.html">Testimonials</a><a href="faq.html">FAQ</a>
        </nav>
        <nav class="footer-nav" aria-label="Services and journal">
          <span class="footer-heading">DISCOVER</span>
          <a href="service-wordpress.html">WordPress websites</a><a href="service-woocommerce.html">WooCommerce</a><a href="service-redesign.html">Redesign & optimization</a><a href="service-maintenance.html">Maintenance</a><a href="blog.html">Journal</a>
        </nav>
        <div class="footer-contact">
          <span class="footer-heading">GET IN TOUCH</span>
          <a class="footer-email" href="mailto:hello@example.com">hello@example.com</a>
          <span class="footer-location">Remote · Open to projects</span>
          <span class="footer-heading footer-social-heading">FOLLOW</span>
          <div class="footer-socials" aria-label="Social profiles">
            <a href="https://www.linkedin.com/in/your-name/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile placeholder; replace with your profile URL">LinkedIn <span aria-hidden="true">↗</span></a>
            <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile placeholder; replace with your profile URL">GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="copyright">© <span id="year">${new Date().getFullYear()}</span> Independent Web Developer</span>
        <nav class="footer-legal" aria-label="Legal">
          <a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="cookies.html">Cookies</a>
        </nav>
        <a class="back-to-top" href="#main">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </div>`;
}

const quickView = document.createElement("dialog");
quickView.className = "quick-view";
quickView.setAttribute("aria-labelledby", "quick-view-title");
quickView.innerHTML = `
  <div class="quick-view-shell">
    <button class="quick-view-close" type="button" aria-label="Close project preview">×</button>
    <div class="quick-view-art" data-quick-view-art aria-hidden="true"></div>
    <div class="quick-view-content">
      <p class="quick-view-kicker" data-quick-view-kicker></p>
      <h2 id="quick-view-title" data-quick-view-title></h2>
      <p class="quick-view-summary" data-quick-view-summary></p>
      <div class="quick-view-focus"><span>PROJECT FOCUS</span><p data-quick-view-focus></p></div>
      <div class="quick-view-actions">
        <a class="button button-primary" href="contact.html">Discuss a similar project <span aria-hidden="true">↗</span></a>
        <button class="quick-view-dismiss" type="button">Back to projects</button>
      </div>
      <p class="quick-view-note">Illustrative concept only—not commissioned client work or a performance claim.</p>
    </div>
  </div>`;
document.body.append(quickView);

const quickViewTitle = quickView.querySelector("[data-quick-view-title]");
const quickViewKicker = quickView.querySelector("[data-quick-view-kicker]");
const quickViewSummary = quickView.querySelector("[data-quick-view-summary]");
const quickViewFocus = quickView.querySelector("[data-quick-view-focus]");
const quickViewArt = quickView.querySelector("[data-quick-view-art]");

document.querySelectorAll(".project-quick-view, .project-preview-button").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".project-card");
    const visual = card?.querySelector(".project-visual");
    if (!card || !visual) return;

    quickViewTitle.textContent = card.dataset.projectTitle || card.querySelector("h3")?.textContent || "Project concept";
    quickViewKicker.textContent = `${card.dataset.projectKind || "Portfolio"} · Concept`;
    quickViewSummary.textContent = card.dataset.projectSummary || "";
    quickViewFocus.textContent = card.dataset.projectFocus || "";
    quickViewArt.replaceChildren();
    const preview = visual.cloneNode(true);
    const previewContainer = document.createElement("div");
    previewContainer.className = preview.className;
    previewContainer.innerHTML = preview.innerHTML;
    quickViewArt.replaceChildren(previewContainer);
    quickView.showModal();
  });
});

quickView.querySelector(".quick-view-close").addEventListener("click", () => quickView.close());
quickView.querySelector(".quick-view-dismiss").addEventListener("click", () => quickView.close());
quickView.addEventListener("cancel", (event) => {
  event.preventDefault();
  quickView.close();
});
quickView.addEventListener("click", (event) => {
  if (event.target === quickView) quickView.close();
});

const backToTop = document.createElement("a");
backToTop.className = "back-to-top-float";
backToTop.href = "#main";
backToTop.setAttribute("aria-label", "Back to top");
backToTop.innerHTML = '<span aria-hidden="true">↑</span>';
document.body.append(backToTop);

function updateBackToTop() {
  backToTop.classList.toggle("is-visible", window.scrollY > 520);
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();
