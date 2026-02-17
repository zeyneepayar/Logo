// Tab Module
class TabSystem {
    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.init();
    }

    init() {
        // Tab button'lara click event ekle
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleTabClick(e));
        });
    }

    handleTabClick(e) {
        const clickedButton = e.currentTarget;
        const targetTab = clickedButton.getAttribute('data-tab');

        // Tüm tab button'lardan active class'ını kaldır
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Tıklanan button'a active class ekle
        clickedButton.classList.add('active');

        // Tüm tab içeriklerini gizle
        this.tabContents.forEach(content => content.classList.remove('active'));
        
        // İlgili içeriği göster
        const targetContent = document.querySelector(`[data-tab-content="${targetTab}"]`);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // Scroll animasyonu - güvenli kontrol ile
        const tabNavSection = document.querySelector('.tab-navigation-section');
        if (tabNavSection) {
            const topbar = document.querySelector('.topbar');
            const mainHeader = document.querySelector('.main-header');
            const topbarHeight = topbar ? topbar.offsetHeight : 0;
            const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;
            const targetPosition = tabNavSection.offsetTop - topbarHeight - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Export edilebilir hale getir
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TabSystem;
} else {
    window.TabSystem = TabSystem;
}
