/**
 * ============================================================================
 * INFO SECTION LOADER
 * ============================================================================
 * 
 * Info section component'lerini yükler ve info section modülünü başlatır.
 * BaseComponentLoader'dan türetilmiştir.
 * 
 * SORUMLULUKLAR:
 * --------------
 * ✓ Info section modülünü başlatma
 * ✓ Info section data ile entegrasyon
 * ✓ Farklı tab'lar için info section render etme
 * 
 * ÖNCELİKLER:
 * -----------
 * - InfoSectionModule (js/modules/info-section.js) yüklenmiş olmalı
 * - infoSectionData (js/data/info-section-data.js) yüklenmiş olmalı
 * 
 * @extends BaseComponentLoader
 * @author Logo Yazılım
 * @version 2.0.0
 * ============================================================================
 */

class InfoSectionLoader extends BaseComponentLoader {
    constructor() {
        super();
        
        /**
         * Info section component yolu
         */
        this.componentPaths = {
            infosection: 'components/info-section.html'
        };
    }

    /**
     * Info section modülünü başlatır
     * ------------------------------
     * InfoSectionModule sınıfını kullanarak section'ları yükler
     * 
     * @returns {Promise<boolean>} - Başlatma başarılı mı?
     */
    async loadInfoSections() {
        console.log('🔄 Info sections yükleniyor...');
        
        // InfoSectionModule kontrolü
        if (!window.InfoSectionModule) {
            console.warn('⚠️ InfoSectionModule bulunamadı');
            return false;
        }

        try {
            // InfoSectionModule instance'ı oluştur
            this.modules.infoSection = new window.InfoSectionModule();
            
            // Modülü başlat (component'leri render eder)
            const success = await this.modules.infoSection.initialize();
            
            if (success) {
                console.log('✅ Info Sections başarıyla yüklendi');
                return true;
            } else {
                console.warn('⚠️ Info Sections başlatılamadı');
                return false;
            }
            
        } catch (error) {
            console.error('❌ Info section yükleme hatası:', error);
            return false;
        }
    }

    /**
     * Info section modülüne erişim sağlar
     * -----------------------------------
     * @returns {InfoSectionModule|null}
     */
    getInfoSectionModule() {
        return this.modules.infoSection || null;
    }
}

// ============================================================================
// EXPORT
// ============================================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InfoSectionLoader;
} else {
    window.InfoSectionLoader = InfoSectionLoader;
}
