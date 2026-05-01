/**
 * 外部 JS 檔案：script.js
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. 自動更新年份
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. 分頁邏輯設定
    const itemsPerPage = 4;
    let currentPage = 0;
    const container = document.getElementById('projects-grid-container');
    const projectItems = document.querySelectorAll('#projects-grid-container .project-card');
    const pageDisplay = document.getElementById('page-number');
    const totalPages = Math.ceil(projectItems.length / itemsPerPage);

    function updateProjectDisplay() {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;

        projectItems.forEach((item, index) => {
            if (index >= start && index < end) {
                // 顯示該頁專案
                item.style.display = 'flex';
                item.style.opacity = '1';
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                // 隱藏其他專案
                item.style.display = 'none';
                item.style.opacity = '0';
                item.style.animation = 'none';
            }
        });

        if (pageDisplay) {
            pageDisplay.textContent = `${currentPage + 1} / ${totalPages}`;
        }
    }

    // 將函數掛載到 window，解決 HTML onclick 找不到函數的問題
    window.changePage = function(direction) {
        currentPage += direction;
        
        if (currentPage < 0) {
            currentPage = totalPages - 1;
        } else if (currentPage >= totalPages) {
            currentPage = 0;
        }
        
        updateProjectDisplay();
        
        // 點擊後平滑捲動回專案標題，優化體驗
        document.getElementById('projects-heading').scrollIntoView({ behavior: 'smooth' });
    };

    // 初始化顯示第一頁
    if (projectItems.length > 0) {
        updateProjectDisplay();
    }
});
