// Mobile Header Module
class MobileHeaderModule {
    constructor() {
        this.mobileMenu = null;
        this.overlay = null;
        this.closeBtn = null;
        this.navItems = null;
        this.langButtons = null;
        this.isOpen = false;
    }

    init() {
        this.mobileMenu = document.getElementById('mobileMenu');
        if (!this.mobileMenu) return;

        this.createOverlay();
        this.closeBtn = this.mobileMenu.querySelector('.mobile-menu-close');
        this.navItems = this.mobileMenu.querySelectorAll('.mobile-nav-item');
        this.langButtons = this.mobileMenu.querySelectorAll('.mobile-lang-btn');

        this.attachEvents();
    }

    createOverlay() {
        // Create overlay element
        this.overlay = document.createElement('div');
        this.overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(this.overlay);

        this.overlay.addEventListener('click', () => {
            this.close();
        });
    }

    attachEvents() {
        // Close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                this.close();
            });
        }

        // Mobile nav dropdown items
        this.navItems.forEach(item => {
            const button = item.querySelector('.mobile-nav-link');
            const hasDropdown = item.querySelector('.mobile-dropdown-menu');

            if (button && hasDropdown) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleNavItem(item);
                });
            }
        });

        // Language buttons
        this.langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleLanguageChange(e);
            });
        });

        // Listen for toggle event from main header
        window.addEventListener('toggleMobileMenu', () => {
            this.toggle();
        });

        // Prevent body scroll when menu is open
        this.mobileMenu.addEventListener('transitionend', () => {
            if (this.isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.mobileMenu.classList.add('active');
        this.overlay.classList.add('active');
        this.isOpen = true;
        
        // Emit event
        window.dispatchEvent(new CustomEvent('mobileMenuOpened'));
    }

    close() {
        this.mobileMenu.classList.remove('active');
        this.overlay.classList.remove('active');
        this.isOpen = false;
        
        // Close all dropdowns
        this.navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Emit event
        window.dispatchEvent(new CustomEvent('mobileMenuClosed'));
    }

    toggleNavItem(item) {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        this.navItems.forEach(navItem => {
            if (navItem !== item) {
                navItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    }

    handleLanguageChange(e) {
        const lang = e.target.dataset.lang;
        
        // Remove active class from all buttons
        this.langButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Emit custom event for language change
        window.dispatchEvent(new CustomEvent('languageChange', { 
            detail: { language: lang } 
        }));
        
        console.log(`Mobile - Language changed to: ${lang}`);
    }
}

// Export module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileHeaderModule;
} else {
    window.MobileHeaderModule = MobileHeaderModule;
}
