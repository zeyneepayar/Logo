class OnPremiseModule {
    constructor() {
        this.template = null;
    }

    async loadTemplate() {
        try {
            const response = await fetch('components/on-premise-section.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.template = await response.text();
            return true;
        } catch (error) {
            console.error('On-Premise Section template yüklenemedi:', error);
            return false;
        }
    }

    renderToContainer(containerId) {
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
        this.updateContent(containerId);
    }

    updateContent(containerId) {
        const data = onPremiseData['on-premise'];
        if (!data) {
            console.error('On-Premise verisi bulunamadı');
            return;
        }

        const container = document.getElementById(containerId);
        if (!container) return;

        // Features güncelle
        const featureCards = container.querySelectorAll('.on-premise-feature-card');
        featureCards.forEach((card, index) => {
            if (data.features[index]) {
                const feature = data.features[index];
                const icon = card.querySelector('.on-premise-feature-icon i');
                const title = card.querySelector('.on-premise-feature-title');
                const description = card.querySelector('.on-premise-feature-description');

                if (icon) icon.className = feature.icon;
                if (title) title.textContent = feature.title;
                if (description) description.textContent = feature.description;
            }
        });

        // Products güncelle
        const productsGrid = container.querySelector('.on-premise-products-grid');
        if (productsGrid && data.products) {
            productsGrid.innerHTML = '';
            
            data.products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = product.isSpecial ? 'on-premise-product-card special-card' : 'on-premise-product-card';
                
                let cardHTML = '';
                
                if (!product.isSpecial) {
                    cardHTML = `
                        <div class="on-premise-badge">
                            <i class="fas fa-server"></i>
                            <span>ON-PREMISE</span>
                        </div>
                        <h3 class="on-premise-product-title">${product.title}</h3>
                        <p class="on-premise-product-description">${product.description}</p>
                        <button class="on-premise-product-button">${product.buttonText}</button>
                    `;
                } else {
                    cardHTML = `
                        <div class="on-premise-badge">
                            <i class="fas fa-server"></i>
                            <span>ON-PREMISE</span>
                        </div>
                        <p class="on-premise-product-description">${product.description}</p>
                        <button class="on-premise-product-button">${product.buttonText}</button>
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
            console.error('On-Premise Section başlatılamadı');
            return false;
        }

        // Tüm tab'lara On-Premise section render et
        const tabIds = ['bulut-servisler', 'on-premise', 'esnek-odeme', 'dijital-donusum'];
        tabIds.forEach(tabId => {
            const containerId = `on-premise-section-${tabId}`;
            this.renderToContainer(containerId);
        });

        console.log('✅ On-Premise Section loaded successfully for all tabs');
        return true;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OnPremiseModule;
}

// Make available globally for headerLoader
window.OnPremiseModule = OnPremiseModule;
window.onPremiseData = onPremiseData;
