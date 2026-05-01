// 等待 DOM 完全載入後執行
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 自動更新 Footer 年份
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. 分頁邏輯變數設定
    const itemsPerPage = 4; // 每頁顯示 4 個專案
    let currentPage = 0;
    
    // 抓取所有專案卡片
    const projectItems = document.querySelectorAll('#projects-grid-container .project-card');
    const pageDisplay = document.getElementById('page-number');
    
    // 計算總頁數 (無條件進位)
    const totalPages = Math.ceil(projectItems.length / itemsPerPage);

    /**
     * 更新專案顯示狀態
     */
    function updateProjectDisplay() {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;

        projectItems.forEach((item, index) => {
            // 邏輯：判斷專案索引是否在當前頁面的範圍內
            if (index >= start && index < end) {
                item.style.display = 'flex';
                // 觸發 CSS 中定義的 fadeIn 動畫效果
                item.style.animation = 'fadeIn 0.4s ease'; 
            } else {
                item.style.display = 'none';
            }
        });

        // 更新頁碼文字顯示 (例如: 1 / 2)
        if (pageDisplay) {
            pageDisplay.textContent = `${currentPage + 1} / ${totalPages}`;
        }
    }

    /**
     * 切換頁面函數
     * @param {number} direction - 1 為下一頁，-1 為上一頁
     */
    window.changePage = function(direction) {
        currentPage += direction;
        
        // 循環邏輯：第一頁往左跳到最後一頁，最後一頁往右回到第一頁
        if (currentPage < 0) {
            currentPage = totalPages - 1;
        } else if (currentPage >= totalPages) {
            currentPage = 0;
        }
        
        updateProjectDisplay();
    };

    // 3. 初始化顯示
    if (projectItems.length > 0) {
        updateProjectDisplay();
    } else {
        // 如果目前沒有專案，隱藏分頁控制項以免視覺尷尬
        const controls = document.querySelector('.pagination-controls');
        if (controls) controls.style.display = 'none';
    }
});
