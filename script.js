/* =====================================================
   ✏️ EDIT HERE — sirf is block mein apni info badlo
   ===================================================== */
const CONFIG = {
  name: "Subodh Premi",
  tagline: "Learning. Building. Growing.",
  intro: "Digital creator, learner and builder exploring technology, creative ideas and useful digital projects.",
  about: "I'm a digital creator and lifelong learner, passionate about building useful projects, exploring new technologies, and growing with every step.",

  instagram: "https://www.instagram.com/subodhpremi_sp?stkn=bHdocXh4aHp0dDMw",
  facebook: "https://www.facebook.com/share/1E2V6RShK2/",
  email: "subodhpremicontact@gmail.com",
  siteUrl: "https://subodhpremi.github.io/link-in-bio-/",   // "Copy link" button yahi link copy karta hai

  // Projects: naya project add karna ho to ek { ... } block copy karke neeche jodo
  projects: [
    {
      title: "Team Showcase Website",
      text: "A modern website designed to showcase team members and their information in a clean and professional way.",
      url: "https://subodhpremi.github.io/team-sp/",
      github: "",      // Repo link mile to yahan daalo. Khaali = button hidden.
      tech: []         // Jab sure ho: ["HTML", "CSS", "JavaScript"]
    },
    {
      title: "Link in Bio",
      text: "A personal digital hub that brings my social links, projects and contact details together in one clean page.",
      url: "https://subodhpremi.github.io/link-in-bio-/",
      github: "",
      tech: []
    },
    {
      title: "Dayora",
      text: "Dayora is a personal daily organizer that combines tasks, reminders, notes, journaling and progress tracking in one place.",
      url: "https://dayora-sp.lovable.app",
      github: "",
      tech: []
    }
  ],

  // Cards. url khaali ("") = "Coming Soon" (click nahi hoga)
  cards: [
    { icon: "instagram", title: "Instagram", text: "Connect with me on Instagram", url: "instagram" },
    { icon: "facebook",  title: "Facebook",  text: "Follow me on Facebook",        url: "facebook" },
    { icon: "mail",      title: "Email",     text: "Business inquiries & collaborations", url: "email" },
    { icon: "code",      title: "Projects",  text: "Explore what I've built",      url: "#projects" },
    { icon: "briefcase", title: "Portfolio",    text: "My work & achievements", url: "" },
    { icon: "file",      title: "Resume",       text: "View my resume",         url: "" },
    { icon: "pen",       title: "Blog",         text: "Read my thoughts",       url: "" },
    { icon: "award",     title: "Certificates", text: "My certifications",      url: "" }
  ],
  soon: [
    { icon: "briefcase", title: "Portfolio" }, { icon: "file", title: "Resume" },
    { icon: "pen", title: "Blog" }, { icon: "award", title: "Certificates" },
    { icon: "plus", title: "More Projects" }
  ]
};
/* =================== EDIT HERE khatam =================== */

const $ = (s) => document.querySelector(s);
const icon = (n) => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const mailto = "mailto:" + CONFIG.email;
const resolve = (u) => ({ instagram: CONFIG.instagram, facebook: CONFIG.facebook, email: mailto }[u] || u);
const external = (u) => u.startsWith("http");

// Text bindings
const text = { name: CONFIG.name, tagline: CONFIG.tagline, intro: CONFIG.intro, about: CONFIG.about };
document.querySelectorAll("[data-bind]").forEach((el) => (el.textContent = text[el.dataset.bind]));

// Social icon buttons
const socials = [["instagram", "Instagram", CONFIG.instagram], ["facebook", "Facebook", CONFIG.facebook], ["mail", "Email", mailto]];
const socialHTML = socials.map(([i, l, u]) =>
  `<a class="social" href="${u}" aria-label="${l}"${external(u) ? ' target="_blank" rel="noopener"' : ""}>${icon(i)}</a>`).join("");
$("#heroSocials").innerHTML = socialHTML;
$("#footSocials").innerHTML = socialHTML;

// Link cards
$("#linkGrid").innerHTML = CONFIG.cards.map((c) => {
  const url = resolve(c.url);
  const inner = `<span class="c-icon">${icon(c.icon)}</span><strong>${c.title}</strong>` +
    (url ? `<span class="c-text">${c.text}</span><span class="c-arrow">${icon("arrow")}</span>`
         : `<span class="badge">Coming soon</span><span class="c-text">${c.text}</span>`);
  return url
    ? `<a class="card glass" href="${url}"${external(url) ? ' target="_blank" rel="noopener"' : ""}>${inner}</a>`
    : `<div class="card glass off" aria-disabled="true">${inner}</div>`;
}).join("");

// Coming soon strip
$("#soonGrid").innerHTML = CONFIG.soon.map((s) =>
  `<div class="s-item glass">${icon(s.icon)}<span>${s.title}</span><small>Coming soon</small></div>`).join("");

// Projects
$("#projectList").innerHTML = CONFIG.projects.map((p) => `
  <article class="project glass">
    <h3>${p.title}</h3>
    <p>${p.text}</p>
    <div class="badges">${p.tech.map((t) => `<span>${t}</span>`).join("")}</div>
    <div class="btns">
      <a class="btn" href="${p.url}" target="_blank" rel="noopener">View Project ${icon("arrow")}</a>
      ${p.github ? `<a class="btn ghost" href="${p.github}" target="_blank" rel="noopener">GitHub</a>` : ""}
    </div>
  </article>`).join("");

// Contact + footer
$("#emailBtn").href = mailto;
$("#emailText").href = mailto;
$("#emailText").textContent = CONFIG.email;
$("#year").textContent = new Date().getFullYear();

// Copy link button
$("#copyBtn").addEventListener("click", async () => {
  let ok = false;
  try { await navigator.clipboard.writeText(CONFIG.siteUrl); ok = true; }
  catch (e) {   // purane browser ka backup
    const t = document.createElement("textarea");
    t.value = CONFIG.siteUrl; t.style.position = "fixed"; t.style.opacity = "0";
    document.body.appendChild(t); t.select();
    try { ok = document.execCommand("copy"); } catch (e2) {}
    t.remove();
  }
  $("#copyText").textContent = ok ? "Link copied" : "Copy failed";
  $("#copyStatus").textContent = ok ? "Link copied" : "Could not copy the link";
  setTimeout(() => ($("#copyText").textContent = "Copy link"), 2000);
});

// Mobile menu
const burger = $("#burger"), menu = $("#menu");
const setMenu = (open) => { menu.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); };
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", (e) => { if (e.target.tagName === "A") setMenu(false); });

// Scroll reveal
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => (still ? el.classList.add("in") : io.observe(el)));

// Light mouse parallax (desktop only)
if (!still && matchMedia("(hover:hover) and (min-width:900px)").matches) {
  const layers = document.querySelectorAll("[data-depth]");
  addEventListener("mousemove", (e) => {
    const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
    layers.forEach((l) => (l.style.translate = `${-x * l.dataset.depth}px ${-y * l.dataset.depth}px`));
  });
}
