document.addEventListener('DOMContentLoaded', () => {
    // 1. 自動更新年份
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 2. 分頁核心邏輯
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
                // 使用 setProperty 確保絕對顯示並套用動畫
                item.style.setProperty('display', 'flex', 'important');
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.style.setProperty('display', 'none', 'important');
                item.style.animation = 'none';
            }
        });

        if (pageDisplay) {
            pageDisplay.textContent = `${currentPage + 1} / ${totalPages}`;
        }
    }

    // 將函數掛載到 window 全域，確保 HTML onclick 可以讀取
    window.changePage = function(direction) {
        currentPage += direction;
        
        // 循環頁數
        if (currentPage < 0) currentPage = totalPages - 1;
        if (currentPage >= totalPages) currentPage = 0;
        
        updateProjectDisplay();
        
        // 切換後自動滾動到專案區塊頂部
        document.getElementById('projects-heading').scrollIntoView({ behavior: 'smooth' });
    };

    // 初始化顯示
    if (projectItems.length > 0) {
        updateProjectDisplay();
    }
});
