const itemsPerPage = 4; // 設定每頁顯示 4 個
    let currentPage = 0;
    const projectItems = document.querySelectorAll('#projects-grid-container .project-card');
    const totalPages = Math.ceil(projectItems.length / itemsPerPage);
    const pageDisplay = document.getElementById('page-number');

    function updateProjectDisplay() {
      const start = currentPage * itemsPerPage;
      const end = start + itemsPerPage;

      projectItems.forEach((item, index) => {
        // 只顯示屬於當前頁面索引範圍內的專案
        if (index >= start && index < end) {
          item.style.display = 'flex';
          item.style.animation = 'fadeIn 0.4s ease'; // 套用之前的淡入動畫
        } else {
          item.style.display = 'none';
        }
      });

      pageDisplay.textContent = `${currentPage + 1} / ${totalPages}`;
    }

    function changePage(direction) {
      currentPage += direction;
      
      if (currentPage < 0) {
        currentPage = totalPages - 1;
      } else if (currentPage >= totalPages) {
        currentPage = 0;
      }
      
      updateProjectDisplay();
    }

    // 初始化
    if (projectItems.length > 0) {
      updateProjectDisplay();
    }
