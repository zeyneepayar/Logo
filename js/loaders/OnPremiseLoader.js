/**
 * ============================================================================
 * ON-PREMISE LOADER
 * ============================================================================
 * 
 * On-Premise section component'lerini yükler ve on-premise modülünü başlatır.
 * BaseComponentLoader'dan türetilmiştir.
 * 
 * SORUMLULUKLAR:
 * --------------
 * ✓ On-Premise section modülünü başlatma
 * ✓ On-Premise data ile entegrasyon
 * ✓ On-Premise section'larını render etme
 * 
 * ÖNCELİKLER:
 * -----------
 * - OnPremiseModule (js/modules/on-premise.js) yüklenmiş olmalı
 * - onPremiseData (js/data/on-premise-data.js) yüklenmiş olmalı
 * 
 * @extends BaseComponentLoader
 * @author Logo Yazılım
 * @version 2.0.0
 * ============================================================================
 */

class OnPremiseLoader extends BaseComponentLoader {
    constructor() {
        super();
        
        /**
         * On-Premise component yolu
         */
        this.componentPaths = {
            onpremise: 'components/on-premise-section.html'
        };
    }

    /**
     * On-Premise section modülünü başlatır
     * ------------------------------------
     * OnPremiseModule sınıfını kullanarak section'ları yükler
     * 
     * @returns {Promise<boolean>} - Başlatma başarılı mı?
     */
    async loadOnPremiseSections() {
        console.log('🔄 On-Premise sections yükleniyor...');
        
        // OnPremiseModule kontrolü
        if (!window.OnPremiseModule) {
            console.warn('⚠️ OnPremiseModule bulunamadı');
            return false;
        }

        try {
            // OnPremiseModule instance'ı oluştur
            this.modules.onPremise = new window.OnPremiseModule();
            
            // Modülü başlat (component'leri render eder)
            const success = await this.modules.onPremise.initialize();
            
            if (success) {
                console.log('✅ On-Premise Sections başarıyla yüklendi');
                return true;
            } else {
                console.warn('⚠️ On-Premise Sections başlatılamadı');
                return false;
            }
            
        } catch (error) {
            console.error('❌ On-Premise section yükleme hatası:', error);
            return false;
        }
    }

    /**
     * On-Premise modülüne erişim sağlar
     * ---------------------------------
     * @returns {OnPremiseModule|null}
     */
    getOnPremiseModule() {
        return this.modules.onPremise || null;
    }
}

// ============================================================================
// EXPORT
// ============================================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OnPremiseLoader;
} else {
    window.OnPremiseLoader = OnPremiseLoader;
}
