/**
 * ============================================================================
 * INDUSTRIES LOADER
 * ============================================================================
 * 
 * Industries showcase component'lerini yükler ve industries modülünü başlatır.
 * BaseComponentLoader'dan türetilmiştir.
 * 
 * SORUMLULUKLAR:
 * --------------
 * ✓ Industries showcase modülünü başlatma
 * ✓ Industries data ile entegrasyon
 * ✓ Farklı sektörler için showcase render etme
 * 
 * ÖNCELİKLER:
 * -----------
 * - IndustriesShowcaseModule (js/modules/industries-showcase.js) yüklenmiş olmalı
 * - industriesData (js/data/industries-data.js) yüklenmiş olmalı
 * 
 * @extends BaseComponentLoader
 * @author Logo Yazılım
 * @version 2.0.0
 * ============================================================================
 */

class IndustriesLoader extends BaseComponentLoader {
    constructor() {
        super();
        
        /**
         * Industries component yolu
         */
        this.componentPaths = {
            industries: 'components/industries-showcase.html'
        };
    }

    /**
     * Industries showcase modülünü başlatır
     * -------------------------------------
     * IndustriesShowcaseModule sınıfını kullanarak showcase'leri yükler
     * 
     * @returns {Promise<boolean>} - Başlatma başarılı mı?
     */
    async loadIndustriesShowcase() {
        console.log('🔄 Industries showcase yükleniyor...');
        
        // IndustriesShowcaseModule kontrolü
        if (!window.IndustriesShowcaseModule) {
            console.warn('⚠️ IndustriesShowcaseModule bulunamadı');
            return false;
        }

        try {
            // IndustriesShowcaseModule instance'ı oluştur
            this.modules.industriesShowcase = new window.IndustriesShowcaseModule();
            
            // Modülü başlat (component'leri render eder)
            const success = await this.modules.industriesShowcase.initialize();
            
            if (success) {
                console.log('✅ Industries Showcase başarıyla yüklendi');
                return true;
            } else {
                console.warn('⚠️ Industries Showcase başlatılamadı');
                return false;
            }
            
        } catch (error) {
            console.error('❌ Industries showcase yükleme hatası:', error);
            return false;
        }
    }

    /**
     * Industries modülüne erişim sağlar
     * ---------------------------------
     * @returns {IndustriesShowcaseModule|null}
     */
    getIndustriesModule() {
        return this.modules.industriesShowcase || null;
    }
}

// ============================================================================
// EXPORT
// ============================================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IndustriesLoader;
} else {
    window.IndustriesLoader = IndustriesLoader;
}
