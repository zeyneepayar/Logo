// Top Bar Module
class TopBarModule {
    constructor() {
        this.topbar = null;
        this.langButtons = null;
        this.currentLang = 'tr';
    }

    init() {
        this.topbar = document.getElementById('topbar');
        if (!this.topbar) return;

        this.langButtons = this.topbar.querySelectorAll('.lang-btn');
        this.attachEvents();
    }

    attachEvents() {
        this.langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleLanguageChange(e));
        });
    }

    handleLanguageChange(e) {
        const lang = e.target.dataset.lang;
        
        // Remove active class from all buttons
        this.langButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        this.currentLang = lang;
        
        // Emit custom event for language change
        window.dispatchEvent(new CustomEvent('languageChange', { 
            detail: { language: lang } 
        }));
        
        console.log(`Language changed to: ${lang}`);
    }

    getCurrentLanguage() {
        return this.currentLang;
    }
}

// Export module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TopBarModule;
} else {
    window.TopBarModule = TopBarModule;
}
