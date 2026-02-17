class InfoSectionModule {
    constructor() {
        this.template = null;
        this.currentTab = 'bulut-servisler';
    }

    async loadTemplate() {
        try {
            const response = await fetch('components/info-section.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.template = await response.text();
            return true;
        } catch (error) {
            console.error('Info Section template yüklenemedi:', error);
            return false;
        }
    }

    renderToContainer(containerId, tabId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container bulunamadı: ${containerId}`);
            return;
        }

        if (!this.template) {
            console.error('Template henüz yüklenmedi!');
            return;
        }

        // Template'i container'a ekle
        container.innerHTML = this.template;

        // Data'yı al ve render et
        this.updateContent(containerId, tabId);
    }

    updateContent(containerId, tabId) {
        const data = infoSectionData[tabId];
        if (!data) {
            console.error(`Veri bulunamadı: ${tabId}`);
            return;
        }

        const container = document.getElementById(containerId);
        if (!container) return;

        // Features güncelle
        const featureCards = container.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            if (data.features[index]) {
                const feature = data.features[index];
                const icon = card.querySelector('.feature-icon i');
                const title = card.querySelector('.feature-title');
                const description = card.querySelector('.feature-description');

                if (icon) icon.className = feature.icon;
                if (title) title.textContent = feature.title;
                if (description) description.textContent = feature.description;
            }
        });

        // Products güncelle
        const productsGrid = container.querySelector('.info-products-grid');
        if (productsGrid && data.products) {
            productsGrid.innerHTML = '';
            
            data.products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = product.isSpecial ? 'info-product-card special-card' : 'info-product-card';
                
                let cardHTML = '';
                
                if (!product.isSpecial) {
                    cardHTML = `
                        <div class="product-cloud-badge">
                            <i class="fas fa-cloud"></i>
                            <span>CLOUD</span>
                        </div>
                        <h3 class="info-product-title">${product.title}</h3>
                        <p class="info-product-description">${product.description}</p>
                        <button class="product-button">${product.buttonText}</button>
                    `;
                } else {
                    cardHTML = `
                        <div class="product-cloud-badge">
                            <i class="fas fa-cloud"></i>
                            <span>CLOUD</span>
                        </div>
                        <p class="info-product-description">${product.description}</p>
                        <button class="product-button">${product.buttonText}</button>
                    `;
                }
                
                productCard.innerHTML = cardHTML;
                productsGrid.appendChild(productCard);
            });
        }
    }

    async initialize() {
        const loaded = await this.loadTemplate();
        if (!loaded) {
            console.error('Info Section başlatılamadı');
            return false;
        }

        // Her tab için info section render et
        const tabs = ['bulut-servisler', 'on-premise', 'esnek-odeme', 'dijital-donusum'];
        tabs.forEach(tabId => {
            const containerId = `info-section-${tabId}`;
            this.renderToContainer(containerId, tabId);
        });

        return true;
    }
}

// Export module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InfoSectionModule;
} else {
    window.InfoSectionModule = InfoSectionModule;
}
