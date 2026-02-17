// Main Header Module - Sıfırdan basitleştirildi
class MainHeaderModule {
    constructor() {
        this.header = null;
        this.searchInput = null;
        this.mobileToggle = null;
    }

    init() {
        this.header = document.querySelector('.main-header');
        if (!this.header) return;

        this.searchInput = this.header.querySelector('.search-input');
        this.mobileToggle = this.header.querySelector('.mobile-toggle');

        this.attachEvents();
    }

    attachEvents() {
        // Arama işlevi
        if (this.searchInput) {
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(e.target.value);
                }
            });

            // Arama butonu click
            const searchBtn = this.header.querySelector('.search-btn');
            if (searchBtn) {
                searchBtn.addEventListener('click', () => {
                    this.performSearch(this.searchInput.value);
                });
            }
        }

        // Fiyat Al butonu
        const ctaButton = this.header.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                console.log('Fiyat Al butonuna tıklandı');
                // Buraya fiyat teklifi formu açma kodu eklenebilir
            });
        }

        // Mobil menü toggle
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
    }

    performSearch(query) {
        if (query.trim()) {
            console.log('Arama yapılıyor:', query);
            // Arama event'i yayınla
            window.dispatchEvent(new CustomEvent('headerSearchSubmit', { 
                detail: { query } 
            }));
        }
    }

    toggleMobileMenu() {
        this.mobileToggle.classList.toggle('active');
        console.log('Mobil menü toggle edildi');
        // Mobil menü açma/kapama event'i
        window.dispatchEvent(new CustomEvent('toggleMobileMenu'));
    }
}

// Export module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MainHeaderModule;
}
            
            // Emit search submit event
            window.dispatchEvent(new CustomEvent('headerSearchSubmit', { 
                detail: { query } 
            }));
            
            // You can redirect to search page or show results
            // window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }
    }

    toggleMobileMenu() {
        // Emit event to toggle mobile menu
        window.dispatchEvent(new CustomEvent('toggleMobileMenu'));
        this.mobileMenuToggle.classList.toggle('active');
    }

    setupStickyHeader() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                this.header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.15)';
            } else {
                this.header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }
            
            lastScroll = currentScroll;
        });
    }
}

// Export module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MainHeaderModule;
} else {
    window.MainHeaderModule = MainHeaderModule;
}
