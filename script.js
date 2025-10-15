document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Toggles the mobile menu visibility
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Dynamic Content Loading for Sports-EsportsTeam ---

    // 1. Fetch Team Data (Leadership) and inject into #team-container
    function loadTeamData() {
        fetch('./data/team.json') 
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} - Check if data/team.json exists.`);
                }
                return response.json();
            })
            .then(data => {
                const teamContainer = document.getElementById('team-container');
                
                // FIX 1 (CRITICAL): Removed the incorrect '.team' access. data is the array itself.
                data.team.forEach(member => { 
                    const memberCard = `
                        <div class="bg-gray-800/50 p-6 rounded-xl border border-gray-700 text-center transform hover:scale-[1.02] transition duration-300 shadow-xl">
                            <img src="${member.image}" alt="${member.name}" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-500">
                            <h4 class="text-xl font-bold">${member.name}</h4>
                            <p class="text-indigo-400 font-medium mb-2">${member.role}</p>
                            <p class="text-sm text-gray-400">${member.bio}</p>
                        </div>
                    `;
                    teamContainer.innerHTML += memberCard;
                });
            })
            .catch(error => console.error('Error loading team data:', error));
    }

    // 2. Fetch Roles Data and inject into #roles-container
    function loadRolesData() {
        fetch('./data/roles.json') 
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} - Check if data/roles.json exists.`);
                }
                return response.json();
            })
            .then(data => {
                const rolesContainer = document.getElementById('roles-container');
                data.forEach(role => {
                    const roleCard = `
                        <div class="bg-gray-800/50 p-6 rounded-xl border border-gray-700 card-hover">
                            <h3 class="text-xl font-semibold mb-3 gradient-text">${role.title}</h3>
                            <p class="text-gray-300 mb-2">${role.description}</p>
                            <ul class="list-disc list-inside text-sm text-gray-400 mt-3 space-y-1">
                                ${role.responsibilities.map(r => `<li>${r}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                    rolesContainer.innerHTML += roleCard;
                });
            })
            .catch(error => console.error('Error loading roles data:', error));
    }

    // 3. Fetch Members Data (General Roster) and inject into #members-container
    function loadMembersData() {
        // FIX 2 (CRITICAL): Corrected the filename from 'team.json' to 'members.json'
        fetch('./data/members.json') 
            .then(response => {
                if (!response.ok) {
                    // FIX 3 (CRITICAL): Corrected the error message to show the actual expected file name: members.json
                    throw new Error(`HTTP error! status: ${response.status} - Check if data/members.json exists.`);
                }
                return response.json();
            })
            .then(data => {
                const membersContainer = document.getElementById('members-container');
                
                // Group members by year for a cleaner display
                const membersByYear = data.reduce((acc, member) => {
                    (acc[member.year] = acc[member.year] || []).push(member);
                    return acc;
                }, {});

                let membersHtml = '';

                // Create a card for each year group
                for (const year in membersByYear) {
                    const memberNames = membersByYear[year].map(m => `
                        <span class="inline-block bg-gray-700/50 text-gray-200 text-sm px-4 py-1.5 rounded-full mr-2 mb-3 border border-gray-600">
                            ${m.name} (${m.section})
                        </span>
                    `).join('');

                    membersHtml += `
                        <div class="bg-gray-900/50 p-6 rounded-xl border border-indigo-700 mb-6">
                            <h3 class="text-xl font-bold gradient-text mb-4">Year ${year} Members</h3>
                            <div class="flex flex-wrap">
                                ${memberNames}
                            </div>
                        </div>
                    `;
                }

                membersContainer.innerHTML = membersHtml;
            })
            .catch(error => console.error('Error loading members data:', error));
    }

    // Initialize data loading
    loadTeamData();
    loadRolesData();
    loadMembersData(); 
});