document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const itemsPerPage = 4;
    let currentPage = 0;
    const projectItems = document.querySelectorAll('#projects-grid-container .project-card');
    const pageDisplay = document.getElementById('page-number');
    const totalPages = Math.ceil(projectItems.length / itemsPerPage);

    function updateProjectDisplay() {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;

        projectItems.forEach((item, index) => {
            if (index >= start && index < end) {
                item.style.setProperty('display', 'flex', 'important');
                item.style.opacity = '1';
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.style.setProperty('display', 'none', 'important');
            }
        });

        if (pageDisplay) pageDisplay.textContent = `${currentPage + 1} / ${totalPages}`;
    }

    window.changePage = function(direction) {
        currentPage += direction;
        if (currentPage < 0) currentPage = totalPages - 1;
        if (currentPage >= totalPages) currentPage = 0;
        updateProjectDisplay();
        document.getElementById('projects-heading').scrollIntoView({ behavior: 'smooth' });
    };

    // 確保這裡拼字正確：length
    if (projectItems.length > 0) updateProjectDisplay();
});
