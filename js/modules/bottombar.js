// Bottom Bar Module
class BottomBarModule {
    constructor() {
        this.bottomBar = null;
        this.whatsappBtn = null;
        this.actionLinks = null;
    }

    init() {
        this.bottomBar = document.querySelector('.bottom-action-bar');
        if (!this.bottomBar) return;

        this.whatsappBtn = this.bottomBar.querySelector('.bottom-bar-whatsapp');
        this.actionLinks = this.bottomBar.querySelectorAll('.bottom-bar-link');
        
        this.attachEvents();
    }

    attachEvents() {
        // WhatsApp button click tracking
        if (this.whatsappBtn) {
            this.whatsappBtn.addEventListener('click', (e) => {
                console.log('WhatsApp contact clicked');
                
                // Emit custom event
                window.dispatchEvent(new CustomEvent('bottomBarWhatsAppClick', {
                    detail: { 
                        source: 'bottom-action-bar',
                        timestamp: new Date().toISOString()
                    }
                }));
            });
        }

        // Action links click tracking
        this.actionLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                console.log(`Bottom bar action clicked: ${href}`);
                
                // Emit custom event
                window.dispatchEvent(new CustomEvent('bottomBarActionClick', {
                    detail: { 
                        href: href,
                        text: link.textContent.trim(),
                        timestamp: new Date().toISOString()
                    }
                }));
            });
        });
    }
}

// Export module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BottomBarModule;
} else {
    window.BottomBarModule = BottomBarModule;
}
