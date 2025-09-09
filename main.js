document.addEventListener('DOMContentLoaded', () => {
    const projectContainer = document.getElementById('project-list');
    const loadProjects = async () => {
        try {
            const response = await fetch('projects.json'); 
            const projects = await response.json();
            projects.forEach(project => {
                const projectCard = createProjectCard(project);
                projectContainer.appendChild(projectCard);
            });
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    };

    // Function to create a project card element
    const createProjectCard = (project) => {
        const card = document.createElement('div');
        card.className = 'bg-gray-800 rounded-lg shadow-md p-6 flex flex-col border-2 border-blue-200';
        card.innerHTML = `
            <h3 class="text-xl font-bold text-blue-300 mb-2">${project.title}</h3>
            <p class="text-gray-200 mb-4">${project.description}</p>
            <img src=${project.Image} class="border-2 border-blue-500" />
            <a href="${project.link}" target="_blank" class="mt-auto inline-block bg-blue-500 text-white px-4 py-2 hover:bg-blue-400 transition rounded-b-lg">View Project</a>
        `;
        return card;
    };

    loadProjects();
});