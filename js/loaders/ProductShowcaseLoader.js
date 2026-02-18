/**
 * ============================================================================
 * PRODUCT SHOWCASE LOADER
 * ============================================================================
 * 
 * Product showcase component'lerini yükler ve showcase sistemini başlatır.
 * BaseComponentLoader'dan türetilmiştir.
 * 
 * SORUMLULUKLAR:
 * --------------
 * ✓ Product showcase template'ini fetch etme
 * ✓ Birden fazla showcase container'a template ekleme
 * ✓ Showcase tab geçişlerini yönetme
 * ✓ Showcase event'lerini dinleme
 * 
 * KULLANIM:
 * ---------
 * HTML'de `.product-showcase-container` class'ına sahip div'ler olmalı.
 * Bu loader otomatik olarak bu container'ları bulup template'i ekler.
 * 
 * @extends BaseComponentLoader
 * @author Logo Yazılım
 * @version 2.0.0
 * ============================================================================
 */

class ProductShowcaseLoader extends BaseComponentLoader {
    constructor() {
        super();
        
        /**
         * Product showcase component yolu
         */
        this.componentPaths = {
            productshowcase: 'components/product-showcase.html'
        };
    }

    /**
     * Product showcase component'lerini yükler
     * ----------------------------------------
     * Sayfadaki tüm `.product-showcase-container` div'lere template ekler
     * 
     * @returns {Promise<boolean>} - Yükleme başarılı mı?
     */
    async loadShowcases() {
        console.log('🔄 Product showcases yükleniyor...');
        
        // Showcase container'ları bul
        const containers = document.querySelectorAll('.product-showcase-container');
        
        if (containers.length === 0) {
            console.warn('⚠️ Product showcase container bulunamadı');
            return false;
        }

        try {
            // Template'i fetch et
            const template = await this.fetchTemplate('productshowcase');
            
            if (!template) {
                throw new Error('Product showcase template yüklenemedi');
            }
            
            // Her container'a template'i ekle
            containers.forEach(container => {
                container.innerHTML = template;
            });

            // Event listener'ları kur
            this.attachShowcaseEvents();
            
            console.log(`✅ ${containers.length} Product Showcase yüklendi`);
            return true;
            
        } catch (error) {
            console.error('❌ Product showcase yükleme hatası:', error);
            return false;
        }
    }

    /**
     * Showcase tab değiştirme event'lerini dinler
     * -------------------------------------------
     * Event delegation kullanılır (performans için)
     */
    attachShowcaseEvents() {
        // Tüm showcase tab butonlarını tek listener ile dinle
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('showcase-tab-btn')) {
                this.handleShowcaseTabSwitch(e.target);
            }
        });
        
        console.log('✅ Showcase event listener kuruldu');
    }

    /**
     * Showcase tab geçişini yönetir
     * -----------------------------
     * @param {HTMLElement} button - Tıklanan tab butonu
     */
    handleShowcaseTabSwitch(button) {
        const targetTab = button.dataset.showcaseTab;
        const showcaseSection = button.closest('.product-showcase');
        
        if (!showcaseSection) {
            console.warn('⚠️ Showcase section bulunamadı');
            return;
        }

        // Tüm tab butonlardan active class'ını kaldır
        showcaseSection.querySelectorAll('.showcase-tab-btn')
            .forEach(btn => btn.classList.remove('active'));
        
        // Tıklanan butona active class ekle
        button.classList.add('active');

        // Tüm content'leri gizle
        showcaseSection.querySelectorAll('.showcase-content')
            .forEach(content => content.classList.remove('active'));
        
        // Hedef content'i göster
        const targetContent = showcaseSection.querySelector(
            `[data-showcase-content="${targetTab}"]`
        );
        
        if (targetContent) {
            targetContent.classList.add('active');
            console.log(`✅ Showcase tab değişti: ${targetTab}`);
        } else {
            console.warn(`⚠️ Showcase content bulunamadı: ${targetTab}`);
        }
    }
}

// ============================================================================
// EXPORT
// ============================================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductShowcaseLoader;
} else {
    window.ProductShowcaseLoader = ProductShowcaseLoader;
}
