/**
 * ============================================================================
 * BASE COMPONENT LOADER
 * ============================================================================
 * 
 * Tüm loader sınıflarının temel (base) sınıfıdır.
 * Component yükleme, hata yönetimi ve event sistemi gibi ortak fonksiyonları sağlar.
 * 
 * KULLANIM:
 * ---------
 * Yeni bir loader oluşturmak için bu sınıfı extend edin:
 * 
 * class MyLoader extends BaseComponentLoader {
 *   constructor() {
 *     super();
 *     this.componentPaths = {
 *       myComponent: 'components/my-component.html'
 *     };
 *   }
 * }
 * 
 * SORUMLULUKLAR:
 * --------------
 * ✓ HTML component'lerini fetch etme
 * ✓ Component'leri DOM container'lara ekleme
 * ✓ Hata yönetimi ve loglama
 * ✓ Component yüklenme durumlarını takip etme
 * ✓ Custom event'ler fırlatma
 * 
 * @author Logo Yazılım
 * @version 2.0.0
 * ============================================================================
 */

class BaseComponentLoader {
    constructor() {
        // Alt sınıflar tarafından override edilecek - Component dosya yolları
        this.componentPaths = {};
        
        // Yüklenen component'lerin DOM referansları
        this.components = {};
        
        // İlişkili JavaScript modülleri
        this.modules = {};
        
        // Yüklenen component isimlerinin Set'i (중복 önleme için)
        this.loadedComponents = new Set();
    }

    /**
     * Tek bir component'i yükler ve DOM'a ekler
     * ----------------------------------------
     * @param {string} name - Component adı (componentPaths içinde tanımlı olmalı)
     * @param {string} containerId - Hedef container'ın ID'si
     * @returns {Promise<boolean>} - Yükleme başarılı mı?
     * 
     * @example
     * await loader.loadComponent('topbar', 'topbarContainer');
     */
    async loadComponent(name, containerId) {
        try {
            // 1. Component path'ini al
            const componentPath = this.getComponentPath(name);
            
            // 2. HTML dosyasını fetch et
            const response = await fetch(componentPath);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${componentPath}`);
            }
            
            // 3. HTML içeriğini al
            const html = await response.text();
            
            // 4. Hedef container'ı bul
            const container = document.getElementById(containerId);
            
            if (!container) {
                throw new Error(`Container bulunamadı: #${containerId}`);
            }
            
            // 5. HTML'i container'a ekle
            container.innerHTML = html;
            
            // 6. Referansları kaydet
            this.components[name] = container;
            this.loadedComponents.add(name);
            
            // 7. Başarı hook'unu çağır
            this.onComponentLoaded(name, container);
            
            console.log(`✅ ${name} component loaded`);
            return true;
            
        } catch (error) {
            // Hata hook'unu çağır
            this.onComponentError(name, error);
            console.error(`❌ ${name} yükleme hatası:`, error.message);
            return false;
        }
    }

    /**
     * Birden fazla component'i paralel olarak yükler
     * ----------------------------------------------
     * Performans için Promise.all kullanılır
     * 
     * @param {Array<{name: string, containerId: string}>} componentList 
     * @returns {Promise<Object>} - {success: boolean, results: Array<boolean>}
     * 
     * @example
     * await loader.loadMultipleComponents([
     *   { name: 'header', containerId: 'headerContainer' },
     *   { name: 'footer', containerId: 'footerContainer' }
     * ]);
     */
    async loadMultipleComponents(componentList) {
        console.log(`🔄 ${componentList.length} component yükleniyor...`);
        
        // Tüm yüklemeleri paralel başlat
        const loadPromises = componentList.map(({name, containerId}) => 
            this.loadComponent(name, containerId)
        );

        // Tüm yüklemelerin tamamlanmasını bekle
        const results = await Promise.all(loadPromises);
        const successCount = results.filter(r => r).length;
        
        // Sonuçları logla
        if (successCount === results.length) {
            console.log(`✅ Tüm component'ler yüklendi (${successCount}/${results.length})`);
            return { success: true, results };
        } else {
            console.warn(`⚠️ Bazı component'ler yüklenemedi (${successCount}/${results.length})`);
            return { success: false, results };
        }
    }

    /**
     * Component template'ini fetch eder (DOM'a eklemeden)
     * ---------------------------------------------------
     * Birden fazla yerde aynı template kullanılacaksa tercih edilir
     * 
     * @param {string} name - Component adı
     * @returns {Promise<string|null>} - HTML template string veya null
     * 
     * @example
     * const template = await loader.fetchTemplate('productCard');
     * document.querySelectorAll('.card-container').forEach(el => {
     *   el.innerHTML = template;
     * });
     */
    async fetchTemplate(name) {
        try {
            const componentPath = this.getComponentPath(name);
            const response = await fetch(componentPath);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${componentPath}`);
            }
            
            return await response.text();
            
        } catch (error) {
            console.error(`Template fetch hatası (${name}):`, error.message);
            return null;
        }
    }

    /**
     * Component dosya yolunu döner
     * ----------------------------
     * @param {string} name - Component adı
     * @returns {string} - Component path
     */
    getComponentPath(name) {
        return this.componentPaths[name] || `components/${name}.html`;
    }

    /**
     * Yüklenen bir component'in DOM referansına erişir
     * ------------------------------------------------
     * @param {string} name - Component adı
     * @returns {HTMLElement|null}
     */
    getComponent(name) {
        return this.components[name] || null;
    }

    /**
     * Bir component'in yüklenip yüklenmediğini kontrol eder
     * -----------------------------------------------------
     * @param {string} name - Component adı
     * @returns {boolean}
     */
    isComponentLoaded(name) {
        return this.loadedComponents.has(name);
    }

    /**
     * Yüklenen bir JavaScript modülüne erişir
     * ---------------------------------------
     * @param {string} name - Module adı
     * @returns {Object|null}
     */
    getModule(name) {
        return this.modules[name] || null;
    }

    /**
     * HOOK: Component başarıyla yüklendiğinde çağrılır
     * ------------------------------------------------
     * Alt sınıflar bu metodu override ederek özel işlemler yapabilir
     * 
     * @param {string} name - Component adı
     * @param {HTMLElement} container - Container elementi
     */
    onComponentLoaded(name, container) {
        // Custom event fırlat
        this.dispatchEvent('componentLoaded', { name, container });
    }

    /**
     * HOOK: Component yüklenirken hata oluştuğunda çağrılır
     * -----------------------------------------------------
     * Alt sınıflar bu metodu override ederek özel hata işlemleri yapabilir
     * 
     * @param {string} name - Component adı
     * @param {Error} error - Hata objesi
     */
    onComponentError(name, error) {
        // Custom event fırlat
        this.dispatchEvent('componentError', { name, error });
    }

    /**
     * Custom event dispatch eder
     * --------------------------
     * @param {string} eventName - Event adı
     * @param {Object} detail - Event detayları
     */
    dispatchEvent(eventName, detail) {
        const event = new CustomEvent(eventName, { 
            detail,
            bubbles: true,
            cancelable: true 
        });
        window.dispatchEvent(event);
    }

    /**
     * Tüm referansları temizler (memory leak önleme)
     * ----------------------------------------------
     */
    cleanup() {
        this.components = {};
        this.modules = {};
        this.loadedComponents.clear();
        console.log('🧹 Components cleaned up');
    }
}

// ============================================================================
// EXPORT
// ============================================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BaseComponentLoader;
} else {
    window.BaseComponentLoader = BaseComponentLoader;
}
