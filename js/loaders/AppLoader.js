/**
 * ============================================================================
 * APP LOADER - ANA KOORDİNATÖR
 * ============================================================================
 * 
 * Tüm uygulama loader'larını koordine eder ve sırayla başlatır.
 * Bu dosya projenin "orkestra şefi" görevi görür.
 * 
 * MİMARİ TASARIM:
 * ---------------
 * Her loader kendi sorumluluğuna odaklanır (Single Responsibility Principle)
 * 
 * 1. HeaderLoader       → Sadece header component'leri
 * 2. TabLoader          → Sadece tab sistemi
 * 3. ProductShowcaseLoader → Sadece product showcase'ler
 * 4. InfoSectionLoader  → Sadece info section'lar
 * 5. OnPremiseLoader    → Sadece on-premise section'lar
 * 6. IndustriesLoader   → Sadece industries showcase
 * 
 * YÜKLEME SIRASI:
 * ---------------
 * 1. Header (en üstte, her zaman görünür)
 * 2. Tab sistemi (navigasyon için gerekli)
 * 3. Product Showcases (tab içeriklerinde)
 * 4. Info Sections (tab içeriklerinde)
 * 5. On-Premise Sections (tab içeriklerinde)
 * 6. Industries Showcase (tab içeriklerinde)
 * 
 * KULLANIM:
 * ---------
 * HTML'de şu şekilde başlatılır:
 * 
 * <script>
 *   document.addEventListener('DOMContentLoaded', () => {
 *     const app = new AppLoader();
 *     app.initialize();
 *   });
 * </script>
 * 
 * @author Logo Yazılım
 * @version 2.0.0
 * ============================================================================
 */

class AppLoader {
    constructor() {
        /**
         * Tüm loader instance'ları burada tutulur
         */
        this.loaders = {
            header: null,
            tab: null,
            productShowcase: null,
            infoSection: null,
            onPremise: null,
            industries: null
        };

        /**
         * Yükleme durumunu takip eder
         */
        this.loadingState = {
            isLoading: false,
            startTime: null,
            endTime: null,
            errors: []
        };
    }

    /**
     * Uygulamayı başlatır
     * -------------------
     * Tüm loader'ları sırayla çalıştırır
     * 
     * @returns {Promise<boolean>} - Başlatma başarılı mı?
     */
    async initialize() {
        console.log('🚀 Uygulama başlatılıyor...');
        console.log('═'.repeat(60));
        
        this.loadingState.isLoading = true;
        this.loadingState.startTime = Date.now();

        try {
            // 1. Header'ı yükle
            await this.loadHeader();
            
            // 2. Tab sistemini yükle
            await this.loadTabSystem();
            
            // 3. Product Showcase'leri yükle
            await this.loadProductShowcases();
            
            // 4. Info Section'ları yükle
            await this.loadInfoSections();
            
            // 5. On-Premise Section'ları yükle
            await this.loadOnPremiseSections();
            
            // 6. Industries Showcase'i yükle
            await this.loadIndustriesShowcase();
            
            // Başarı
            this.onLoadComplete();
            return true;
            
        } catch (error) {
            this.onLoadError(error);
            return false;
        } finally {
            this.loadingState.isLoading = false;
            this.loadingState.endTime = Date.now();
        }
    }

    /**
     * Header loader'ı başlatır
     * ------------------------
     */
    async loadHeader() {
        console.log('📦 [1/6] Header yükleniyor...');
        
        if (!window.HeaderLoader) {
            throw new Error('HeaderLoader bulunamadı!');
        }

        this.loaders.header = new window.HeaderLoader();
        const success = await this.loaders.header.loadAllComponents();
        
        if (!success) {
            this.loadingState.errors.push('Header yüklenemedi');
        }
    }

    /**
     * Tab loader'ı başlatır
     * ---------------------
     */
    async loadTabSystem() {
        console.log('📦 [2/6] Tab sistemi yükleniyor...');
        
        if (!window.TabLoader) {
            console.warn('⚠️ TabLoader bulunamadı, atlanıyor...');
            return;
        }

        this.loaders.tab = new window.TabLoader();
        const success = await this.loaders.tab.loadTabSystem();
        
        if (!success) {
            this.loadingState.errors.push('Tab sistemi yüklenemedi');
        }
    }

    /**
     * Product Showcase loader'ı başlatır
     * ----------------------------------
     */
    async loadProductShowcases() {
        console.log('📦 [3/6] Product Showcases yükleniyor...');
        
        if (!window.ProductShowcaseLoader) {
            console.warn('⚠️ ProductShowcaseLoader bulunamadı, atlanıyor...');
            return;
        }

        this.loaders.productShowcase = new window.ProductShowcaseLoader();
        const success = await this.loaders.productShowcase.loadShowcases();
        
        if (!success) {
            this.loadingState.errors.push('Product Showcases yüklenemedi');
        }
    }

    /**
     * Info Section loader'ı başlatır
     * ------------------------------
     */
    async loadInfoSections() {
        console.log('📦 [4/6] Info Sections yükleniyor...');
        
        if (!window.InfoSectionLoader) {
            console.warn('⚠️ InfoSectionLoader bulunamadı, atlanıyor...');
            return;
        }

        this.loaders.infoSection = new window.InfoSectionLoader();
        const success = await this.loaders.infoSection.loadInfoSections();
        
        if (!success) {
            this.loadingState.errors.push('Info Sections yüklenemedi');
        }
    }

    /**
     * On-Premise loader'ı başlatır
     * ----------------------------
     */
    async loadOnPremiseSections() {
        console.log('📦 [5/6] On-Premise Sections yükleniyor...');
        
        if (!window.OnPremiseLoader) {
            console.warn('⚠️ OnPremiseLoader bulunamadı, atlanıyor...');
            return;
        }

        this.loaders.onPremise = new window.OnPremiseLoader();
        const success = await this.loaders.onPremise.loadOnPremiseSections();
        
        if (!success) {
            this.loadingState.errors.push('On-Premise Sections yüklenemedi');
        }
    }

    /**
     * Industries loader'ı başlatır
     * ----------------------------
     */
    async loadIndustriesShowcase() {
        console.log('📦 [6/6] Industries Showcase yükleniyor...');
        
        if (!window.IndustriesLoader) {
            console.warn('⚠️ IndustriesLoader bulunamadı, atlanıyor...');
            return;
        }

        this.loaders.industries = new window.IndustriesLoader();
        const success = await this.loaders.industries.loadIndustriesShowcase();
        
        if (!success) {
            this.loadingState.errors.push('Industries Showcase yüklenemedi');
        }
    }

    /**
     * Tüm yüklemeler tamamlandığında çağrılır
     * ---------------------------------------
     */
    onLoadComplete() {
        const duration = this.loadingState.endTime - this.loadingState.startTime;
        
        console.log('═'.repeat(60));
        console.log('✅ Uygulama başarıyla yüklendi!');
        console.log(`⏱️  Yükleme süresi: ${duration}ms`);
        
        if (this.loadingState.errors.length > 0) {
            console.warn(`⚠️  ${this.loadingState.errors.length} hata oluştu:`);
            this.loadingState.errors.forEach(err => console.warn(`   - ${err}`));
        }
        
        console.log('═'.repeat(60));
        
        // Global event fırlat
        window.dispatchEvent(new CustomEvent('appLoaded', {
            detail: {
                duration,
                errors: this.loadingState.errors
            }
        }));
    }

    /**
     * Yükleme sırasında kritik hata oluştuğunda çağrılır
     * --------------------------------------------------
     * @param {Error} error - Hata objesi
     */
    onLoadError(error) {
        console.error('═'.repeat(60));
        console.error('❌ Uygulama yüklenirken kritik hata oluştu!');
        console.error('Hata:', error.message);
        console.error('═'.repeat(60));
        
        // Global hata event'i fırlat
        window.dispatchEvent(new CustomEvent('appLoadError', {
            detail: { error }
        }));
    }

    /**
     * Belirli bir loader instance'ına erişir
     * --------------------------------------
     * @param {string} name - Loader adı (header, tab, etc.)
     * @returns {Object|null}
     */
    getLoader(name) {
        return this.loaders[name] || null;
    }

    /**
     * Yükleme durumu bilgilerini döner
     * --------------------------------
     * @returns {Object}
     */
    getLoadingState() {
        return { ...this.loadingState };
    }
}

// ============================================================================
// AUTO-INITIALIZE
// ============================================================================
// DOM hazır olduğunda otomatik başlat
document.addEventListener('DOMContentLoaded', () => {
    window.appLoader = new AppLoader();
    window.appLoader.initialize();
});

// ============================================================================
// EXPORT
// ============================================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppLoader;
} else {
    window.AppLoader = AppLoader;
}
