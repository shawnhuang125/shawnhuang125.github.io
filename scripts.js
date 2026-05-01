document.addEventListener('DOMContentLoaded', () => {
    // 年份更新
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const itemsPerPage = 4;
    let currentPage = 0;
    
    // 抓取元素
    const projectItems = document.querySelectorAll('.project-card');
    const pageDisplay = document.getElementById('page-number');
    const totalPages = Math.ceil(projectItems.length / itemsPerPage);

    function updateProjectDisplay() {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;

        projectItems.forEach((item, index) => {
            if (index >= start && index < end) {
                // ✅ 強制顯示並確保透明度
                item.style.setProperty('display', 'flex', 'important');
                item.style.opacity = '1'; 
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.style.setProperty('display', 'none', 'important');
                item.style.opacity = '0';
            }
        });

        if (pageDisplay) {
            pageDisplay.textContent = `${currentPage + 1} / ${totalPages}`;
        }
    }

    window.changePage = function(direction) {
        currentPage += direction;
        if (currentPage < 0) currentPage = totalPages - 1;
        if (currentPage >= totalPages) currentPage = 0;
        updateProjectDisplay();
        
        // 捲動回專案頂部
        const target = document.getElementById('projects-heading');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    };

    // 初始化執行
    if (projectItems.length > 0) {
        updateProjectDisplay();
    }
});
