document.addEventListener('DOMContentLoaded', () => {
    // 1. 自動更新年份
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 2. 分頁變數設定
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
                // 使用 setProperty 並加上 !important 確保絕對覆蓋 CSS 的 display: none
                item.style.setProperty('display', 'flex', 'important');
                item.style.opacity = '1';
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.style.setProperty('display', 'none', 'important');
                item.style.opacity = '0';
                item.style.animation = 'none';
            }
        });

        if (pageDisplay) {
            pageDisplay.textContent = `${currentPage + 1} / ${totalPages}`;
        }
    }

    // 3. 全域切換函數
    window.changePage = function(direction) {
        currentPage += direction;
        
        // 循環頁數邏輯
        if (currentPage < 0) currentPage = totalPages - 1;
        if (currentPage >= totalPages) currentPage = 0;
        
        updateProjectDisplay();
        
        // 切換後平滑捲動回專案區塊頂部
        const projectsHeading = document.getElementById('projects-heading');
        if (projectsHeading) {
            projectsHeading.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // 4. 執行初始化
    if (projectItems.length > 0) {
        updateProjectDisplay();
    }
});
