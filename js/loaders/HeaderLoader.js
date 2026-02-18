/**
 * ============================================================================
 * HEADER LOADER
 * ============================================================================
 * 
 * Header ile ilgili tüm component'leri yükler ve başlatır.
 * BaseComponentLoader'dan türetilmiştir.
 * 
 * SORUMLULUKLAR:
 * --------------
 * ✓ TopBar component yükleme
 * ✓ MainHeader component yükleme
 * ✓ MobileHeader component yükleme
 * ✓ BottomBar component yükleme
 * ✓ Header modüllerini başlatma
 * ✓ Dil değişikliği senkronizasyonu
 * ✓ Global header event'lerini yönetme
 * 
 * YÜKLEMEZ (Başka loader'ların sorumluluğu):
 * ------------------------------------------
 * ✗ Tab sistemi (TabLoader)
 * ✗ Product showcase (ProductShowcaseLoader)
 * ✗ Info sections (InfoSectionLoader)
 * ✗ On-premise sections (OnPremiseLoader)
 * ✗ Industries showcase (IndustriesLoader)
 * 
 * @extends BaseComponentLoader
 * @author Logo Yazılım
 * @version 2.0.0
 * ============================================================================
 */

class HeaderLoader extends BaseComponentLoader {
    constructor() {
        super();
        
        /**
         * Header component dosya yolları
         * Bu loader sadece header ile ilgili component'leri bilir
         */
        this.componentPaths = {
            topbar: 'components/header/topbar.html',
            mainheader: 'components/header/mainheader.html',
            mobileheader: 'components/header/mobileheader.html',
            bottombar: 'components/bottombar.html'
        };
    }

    /**
     * Tüm header component'lerini yükler
     * ----------------------------------
     * Component'ler paralel olarak yüklenir (performans için)
     * 
     * @returns {Promise<boolean>} - Tüm yüklemeler başarılı mı?
     */
    async loadAllComponents() {
        console.log('🔄 Header components yükleniyor...');
        
        // Header component listesi
        const componentList = [
            { name: 'topbar', containerId: 'topbarContainer' },
            { name: 'mainheader', containerId: 'mainHeaderContainer' },
            { name: 'mobileheader', containerId: 'mobileHeaderContainer' },
            { name: 'bottombar', containerId: 'bottomBarContainer' }
        ];

        // BaseComponentLoader'ın paralel yükleme metodunu kullan
        const { success } = await this.loadMultipleComponents(componentList);
        
        if (success) {
            console.log('✅ Header components başarıyla yüklendi');
            
            // Component'ler yüklendikten sonra modülleri başlat
            this.initializeModules();
            return true;
        } else {
            console.warn('⚠️ Bazı header componentler yüklenemedi');
            return false;
        }
    }

    /**
     * Header JavaScript modüllerini başlatır
     * --------------------------------------
     * Component'ler DOM'a eklendikten sonra çağrılmalıdır
     */
    initializeModules() {
        console.log('🔄 Header modülleri başlatılıyor...');
        
        // TopBar modülünü başlat
        if (window.TopBarModule) {
            this.modules.topbar = new window.TopBarModule();
            this.modules.topbar.init();
            console.log('✅ TopBar modülü başlatıldı');
        } else {
            console.warn('⚠️ TopBarModule bulunamadı');
        }

        // MainHeader modülünü başlat
        if (window.MainHeaderModule) {
            this.modules.mainheader = new window.MainHeaderModule();
            this.modules.mainheader.init();
            console.log('✅ MainHeader modülü başlatıldı');
        } else {
            console.warn('⚠️ MainHeaderModule bulunamadı');
        }

        // MobileHeader modülünü başlat
        if (window.MobileHeaderModule) {
            this.modules.mobileheader = new window.MobileHeaderModule();
            this.modules.mobileheader.init();
            console.log('✅ MobileHeader modülü başlatıldı');
        } else {
            console.warn('⚠️ MobileHeaderModule bulunamadı');
        }

        // BottomBar modülünü başlat
        if (window.BottomBarModule) {
            this.modules.bottombar = new window.BottomBarModule();
            this.modules.bottombar.init();
            console.log('✅ BottomBar modülü başlatıldı');
        } else {
            console.warn('⚠️ BottomBarModule bulunamadı');
        }

        // Global event listener'ları kur
        this.setupGlobalEvents();
        
        console.log('✅ Tüm header modülleri başlatıldı');
    }

    /**
     * Global header event'lerini dinler
     * ---------------------------------
     * Dil değişiklikleri, search, mobile menu gibi event'leri yönetir
     */
    setupGlobalEvents() {
        // Dil değişikliği event'ini dinle
        window.addEventListener('languageChange', (e) => {
            console.log('📢 Dil değişti:', e.detail.language);
            this.syncLanguage(e.detail.language);
        });

        // Header search event'lerini dinle
        window.addEventListener('headerSearch', (e) => {
            console.log('🔍 Header search:', e.detail.query);
        });

        window.addEventListener('headerSearchSubmit', (e) => {
            console.log('🔍 Search gönderildi:', e.detail.query);
            // Search işlemini burada yönetebilirsiniz
        });

        // Mobile menu event'lerini dinle
        window.addEventListener('mobileMenuOpened', () => {
            console.log('📱 Mobile menu açıldı');
        });

        window.addEventListener('mobileMenuClosed', () => {
            console.log('📱 Mobile menu kapandı');
        });
    }

    /**
     * Dil değişikliklerini tüm header component'lerine senkronize eder
     * ----------------------------------------------------------------
     * Hem topbar hem de mobile menu'deki dil butonlarını günceller
     * 
     * @param {string} lang - Seçilen dil kodu (tr, en, vs.)
     */
    syncLanguage(lang) {
        const allLangButtons = document.querySelectorAll('.lang-btn, .mobile-lang-btn');
        
        allLangButtons.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        console.log(`✅ Dil senkronize edildi: ${lang}`);
    }
}

// ============================================================================
// EXPORT
// ============================================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeaderLoader;
} else {
    window.HeaderLoader = HeaderLoader;
}
