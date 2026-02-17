/**
 * Industries Showcase Module
 * 
 * Görevler:
 * 1. HTML template'ini yükle (industries-showcase.html)
 * 2. Container'a yerleştir
 * 3. Data'dan sektör butonlarını oluştur
 * 4. Seamless infinite loop için içeriği duplicate et
 */

class IndustriesShowcaseModule {
    constructor() {
        this.template = null; // HTML template saklanacak
    }

    /**
     * Template Yükleme
     * - HTML dosyasını fetch ile çeker
     * - String olarak saklar
     */
    async loadTemplate() {
        try {
            const response = await fetch('components/industries-showcase.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.template = await response.text();
            return true;
        } catch (error) {
            console.error('Industries Showcase template yüklenemedi:', error);
            return false;
        }
    }

    /**
     * Sektör Badge Oluşturma
     * - Her sektör için bir buton oluşturur
     * - İkon ve metin içerir
     */
    createIndustryBadge(industry) {
        const badge = document.createElement('div');
        badge.className = 'industry-badge';
        badge.innerHTML = `
            <i class="${industry.icon}"></i>
            <span>${industry.text}</span>
        `;
        return badge;
    }

    /**
     * Slider İçeriği Doldurma
     * - Data'dan butonları oluşturur
     * - Seamless loop için 2 kez render eder (duplicate)
     * - Neden?: Animasyon %50 kayınca başa döner, kesintisiz görünür
     */
    populateSlider(container) {
        const data = window.industriesData || industriesData;
        if (!data) {
            console.error('Industries data bulunamadı!');
            return;
        }

        // Üst Sıra (Sağa Akan)
        const topTrack = container.querySelector('.industries-slider-top');
        if (topTrack) {
            // İlk set: Orijinal data
            data.topRow.forEach(industry => {
                topTrack.appendChild(this.createIndustryBadge(industry));
            });
            
            // İkinci set: Duplicate (seamless loop için)
            // Animasyon %50 kayınca, duplicate set devreye girer
            data.topRow.forEach(industry => {
                topTrack.appendChild(this.createIndustryBadge(industry));
            });
        }

        // Alt Sıra (Sola Akan)
        const bottomTrack = container.querySelector('.industries-slider-bottom');
        if (bottomTrack) {
            // İlk set: Orijinal data
            data.bottomRow.forEach(industry => {
                bottomTrack.appendChild(this.createIndustryBadge(industry));
            });
            
            // İkinci set: Duplicate (seamless loop için)
            data.bottomRow.forEach(industry => {
                bottomTrack.appendChild(this.createIndustryBadge(industry));
            });
        }
    }

    /**
     * Container'a Render Etme
     * - Template'i container'a ekler
     * - Slider içeriğini doldurur
     */
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

        // Template'i ekle
        container.innerHTML = this.template;

        // Slider içeriğini doldur
        this.populateSlider(container);
    }

    /**
     * Initialize - Ana Başlatma Metodu
     * - Template yükler
     * - Her tab için render eder
     */
    async initialize() {
        const loaded = await this.loadTemplate();
        if (!loaded) {
            console.error('Industries Showcase başlatılamadı');
            return false;
        }

        // Her tab için industries showcase render et
        // 4 sekme: bulut-servisler, on-premise, esnek-odeme, dijital-donusum
        const tabs = ['bulut-servisler', 'on-premise', 'esnek-odeme', 'dijital-donusum'];
        tabs.forEach(tabId => {
            const containerId = `industries-showcase-${tabId}`;
            this.renderToContainer(containerId);
        });

        console.log('✓ Industries Showcase başarıyla yüklendi');
        return true;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IndustriesShowcaseModule;
}

// Make available globally for headerLoader
window.IndustriesShowcaseModule = IndustriesShowcaseModule;
