async function loadData() {
  try {
    const response = await fetch("./resources/data.json");
    const plexusData = await response.json();

    renderTeam(plexusData.team);
    renderRoles(plexusData.roles);
    renderGallery(plexusData.gallery);
    setupMobileMenu();
    setupScrolling();
    setupFadeIn();
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

// Render team members
function renderTeam(team) {
  const teamContainer = document.getElementById("team-container");
  teamContainer.innerHTML = "";

  [...team.heads, ...team.coordinators,...team.members].forEach(member => {
    teamContainer.innerHTML += `
      <div class="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden card-hover">
        <div class="relative h-64">
          <img src="${member.image}" alt="${member.name}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-4 left-4">
            <h3 class="text-xl font-bold text-white">${member.name}</h3>
            <p class="text-indigo-300">${member.role}</p>
          </div>
        </div>
        <div class="p-6">
          <p class="text-gray-300 mb-4">${member.bio}</p>
          <div class="flex space-x-4">
            ${member.social.linkedin ? `<a href="${member.social.linkedin}" class="text-gray-400 hover:text-indigo-300 transition"><i class="fab fa-linkedin"></i></a>` : ""}
            ${member.social.github ? `<a href="${member.social.github}" class="text-gray-400 hover:text-indigo-300 transition"><i class="fab fa-github"></i></a>` : ""}
            ${member.social.twitter ? `<a href="${member.social.twitter}" class="text-gray-400 hover:text-indigo-300 transition"><i class="fab fa-twitter"></i></a>` : ""}
            ${member.social.instagram ? `<a href="${member.social.instagram}" class="text-gray-400 hover:text-indigo-300 transition"><i class="fab fa-instagram"></i></a>` : ""}
            ${member.social.behance ? `<a href="${member.social.behance}" class="text-gray-400 hover:text-indigo-300 transition"><i class="fab fa-behance"></i></a>` : ""}
          </div>
        </div>
      </div>
    `;
  });
}

// Render roles
function renderRoles(roles) {
  const rolesContainer = document.getElementById("roles-container");
  rolesContainer.innerHTML = "";

  roles.forEach(role => {
    const responsibilitiesHTML = role.responsibilities
      .map(res => `<li class="flex items-start mb-2"><i class="fas fa-check text-indigo-400 mt-1 mr-2"></i><span class="text-gray-300">${res}</span></li>`)
      .join("");

    rolesContainer.innerHTML += `
      <div class="role-card p-6 rounded-xl border border-gray-700">
        <div class="${role.color} mb-4">
          <i class="${role.icon} text-3xl"></i>
        </div>
        <h3 class="text-xl font-semibold mb-4">${role.title}</h3>
        <ul class="text-sm">${responsibilitiesHTML}</ul>
      </div>
    `;
  });
}

// Render gallery
function renderGallery(gallery) {
  const galleryContainer = document.getElementById("gallery-container");
  galleryContainer.innerHTML = "";

  gallery.forEach(item => {
    const cardHTML = `
      <div class="group relative rounded-xl overflow-hidden card-hover h-64">
        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover transition duration-300 group-hover:scale-105">
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
          <h3 class="text-white font-bold text-lg mb-1">${item.title}</h3>
          <p class="text-gray-300 text-sm line-clamp-3">${item.description}</p>
          <span class="w-[max-content] inline-block mt-2 px-2 py-1 bg-indigo-600/80 text-white text-xs rounded-full">${item.type}</span>
        </div>
      </div>
    `;

    galleryContainer.innerHTML += item.link
      ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${cardHTML}</a>`
      : cardHTML;
  });
}

// Mobile menu
function setupMobileMenu() {
  const button = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");

  button.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => menu.classList.add("hidden"));
  });
}

// Smooth scrolling
function setupScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });
}

// Fade-in animation
function setupFadeIn() {
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("fade-in");
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));
}

// Initialize
document.addEventListener("DOMContentLoaded", loadData);