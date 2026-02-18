/**
 * ============================================================================
 * TAB LOADER
 * ============================================================================
 * 
 * Tab navigation ve tab content component'lerini yükler ve tab sistemini başlatır.
 * BaseComponentLoader'dan türetilmiştir.
 * 
 * SORUMLULUKLAR:
 * --------------
 * ✓ Tab navigation component yükleme
 * ✓ Tab content component yükleme
 * ✓ Tab sistemi modülünü başlatma
 * ✓ Tab geçiş animasyonlarını yönetme
 * 
 * @extends BaseComponentLoader
 * @author Logo Yazılım
 * @version 2.0.0
 * ============================================================================
 */

class TabLoader extends BaseComponentLoader {
    constructor() {
        super();
        
        /**
         * Tab component dosya yolları
         */
        this.componentPaths = {
            tabnavigation: 'components/tabs/tab-navigation.html',
            tabcontent: 'components/tabs/tab-content.html'
        };
    }

    /**
     * Tab component'lerini yükler ve tab sistemini başlatır
     * -----------------------------------------------------
     * @returns {Promise<boolean>} - Yükleme başarılı mı?
     */
    async loadTabSystem() {
        console.log('🔄 Tab sistemi yükleniyor...');
        
        // Tab component listesi
        const componentList = [
            { name: 'tabnavigation', containerId: 'tabNavigationContainer' },
            { name: 'tabcontent', containerId: 'tabContentContainer' }
        ];

        // Component'leri paralel yükle
        const { success } = await this.loadMultipleComponents(componentList);
        
        if (success) {
            console.log('✅ Tab components başarıyla yüklendi');
            
            // Tab modülünü başlat
            this.initializeTabModule();
            return true;
        } else {
            console.warn('⚠️ Tab components yüklenemedi');
            return false;
        }
    }

    /**
     * Tab sistemi JavaScript modülünü başlatır
     * ----------------------------------------
     */
    initializeTabModule() {
        console.log('🔄 Tab modülü başlatılıyor...');
        
        if (window.TabSystem) {
            this.modules.tabs = new window.TabSystem();
            console.log('✅ Tab sistemi başlatıldı');
        } else {
            console.warn('⚠️ TabSystem modülü bulunamadı');
        }
    }
}

// ============================================================================
// EXPORT
// ============================================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TabLoader;
} else {
    window.TabLoader = TabLoader;
}
