document.addEventListener('DOMContentLoaded', () => {
    // 年份更新
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const itemsPerPage = 4;
    let currentPage = 0;
    
    // ✅ 這裡改掉：直接抓 .project-card，避開 ID 權重問題
    const projectItems = document.querySelectorAll('.project-card');
    const pageDisplay = document.getElementById('page-number');
    const totalPages = Math.ceil(projectItems.length / itemsPerPage);

    function updateProjectDisplay() {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
    
        projectItems.forEach((item, index) => {
            if (index >= start && index < end) {
                // ✅ 強制重設動畫狀態
                item.style.animation = 'none';
                item.offsetHeight; // 觸發重繪 (Reflow)
                
                // ✅ 使用 setProperty 加上 important 確保絕對顯示
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

    // 掛載翻頁函數
    window.changePage = function(direction) {
        currentPage += direction;
        if (currentPage < 0) currentPage = totalPages - 1;
        if (currentPage >= totalPages) currentPage = 0;
        updateProjectDisplay();
        document.getElementById('projects-heading').scrollIntoView({ behavior: 'smooth' });
    };

    if (projectItems.length > 0) updateProjectDisplay();
});
