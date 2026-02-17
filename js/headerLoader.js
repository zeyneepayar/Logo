// Header Component Loader
class HeaderComponentLoader {
    constructor() {
        this.components = {
            topbar: null,
            mainheader: null,
            mobileheader: null,
            bottombar: null
        };
        this.modules = {};
        this.componentPaths = {
            topbar: 'components/header/topbar.html',
            mainheader: 'components/header/mainheader.html',
            mobileheader: 'components/header/mobileheader.html',
            bottombar: 'components/bottombar.html',
            tabnavigation: 'components/tabs/tab-navigation.html',
            tabcontent: 'components/tabs/tab-content.html',
            productshowcase: 'components/product-showcase.html'
        };
    }

    async loadComponent(name, containerId) {
        try {
            const componentPath = this.componentPaths[name] || `components/${name}.html`;
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load ${name} component`);
            }
            
            const html = await response.text();
            const container = document.getElementById(containerId);
            
            if (container) {
                container.innerHTML = html;
                this.components[name] = container;
                console.log(`✅ ${name} component loaded`);
                return true;
            }
            
            return false;
        } catch (error) {
            console.error(`Error loading ${name}:`, error);
            return false;
        }
    }

    async loadAllComponents() {
        console.log('🔄 Loading header components...');
        
        const loadPromises = [
            this.loadComponent('topbar', 'topbarContainer'),
            this.loadComponent('mainheader', 'mainHeaderContainer'),
            this.loadComponent('mobileheader', 'mobileHeaderContainer'),
            this.loadComponent('bottombar', 'bottomBarContainer'),
            this.loadComponent('tabnavigation', 'tabNavigationContainer'),
            this.loadComponent('tabcontent', 'tabContentContainer')
        ];

        const results = await Promise.all(loadPromises);
        
        if (results.every(result => result)) {
            console.log('✅ All header components loaded successfully');
            this.initializeModules();
            this.loadProductShowcases();
            this.loadInfoSections();
            this.loadOnPremiseSections();
            this.loadIndustriesShowcase();
        } else {
            console.warn('⚠️ Some components failed to load');
        }
    }

    async loadProductShowcases() {
        console.log('🔄 Loading product showcases...');
        const containers = document.querySelectorAll('.product-showcase-container');
        
        if (containers.length === 0) {
            console.warn('⚠️ No product showcase containers found');
            return;
        }

        try {
            const response = await fetch('components/product-showcase.html');
            if (!response.ok) throw new Error('Product showcase template yüklenemedi');
            
            const template = await response.text();
            
            containers.forEach(container => {
                container.innerHTML = template;
            });

            this.attachShowcaseEvents();
            console.log(`✅ ${containers.length} Product Showcase loaded`);
        } catch (error) {
            console.error('Product showcase yükleme hatası:', error);
        }
    }

    attachShowcaseEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('showcase-tab-btn')) {
                this.handleShowcaseTabSwitch(e.target);
            }
        });
    }

    async loadInfoSections() {
        console.log('🔄 Loading info sections...');
        
        if (!window.InfoSectionModule) {
            console.warn('⚠️ InfoSectionModule not found');
            return;
        }

        try {
            this.modules.infoSection = new window.InfoSectionModule();
            const success = await this.modules.infoSection.initialize();
            
            if (success) {
                console.log('✅ Info Sections loaded successfully');
            } else {
                console.warn('⚠️ Info Sections failed to load');
            }
        } catch (error) {
            console.error('Info section yükleme hatası:', error);
        }
    }

    async loadIndustriesShowcase() {
        console.log('🔄 Loading industries showcase...');
        
        if (!window.IndustriesShowcaseModule) {
            console.warn('⚠️ IndustriesShowcaseModule not found');
            return;
        }

        try {
            this.modules.industriesShowcase = new window.IndustriesShowcaseModule();
            const success = await this.modules.industriesShowcase.initialize();
            
            if (success) {
                console.log('✅ Industries Showcase loaded successfully');
            } else {
                console.warn('⚠️ Industries Showcase failed to load');
            }
        } catch (error) {
            console.error('Industries showcase yükleme hatası:', error);
        }
    }

    async loadOnPremiseSections() {
        console.log('🔄 Loading on-premise sections...');
        
        if (!window.OnPremiseModule) {
            console.warn('⚠️ OnPremiseModule not found');
            return;
        }

        try {
            this.modules.onPremise = new window.OnPremiseModule();
            const success = await this.modules.onPremise.initialize();
            
            if (success) {
                console.log('✅ On-Premise Sections loaded successfully');
            } else {
                console.warn('⚠️ On-Premise Sections failed to load');
            }
        } catch (error) {
            console.error('On-Premise sections yükleme hatası:', error);
        }
    }

    handleShowcaseTabSwitch(button) {
        const targetTab = button.dataset.showcaseTab;
        const showcaseSection = button.closest('.product-showcase');
        
        if (!showcaseSection) return;

        showcaseSection.querySelectorAll('.showcase-tab-btn')
            .forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        showcaseSection.querySelectorAll('.showcase-content')
            .forEach(content => content.classList.remove('active'));
        
        const targetContent = showcaseSection.querySelector(`[data-showcase-content="${targetTab}"]`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }

    initializeModules() {
        console.log('🔄 Initializing header modules...');
        
        // Initialize TopBar Module
        if (window.TopBarModule) {
            this.modules.topbar = new window.TopBarModule();
            this.modules.topbar.init();
            console.log('✅ TopBar module initialized');
        }

        // Initialize MainHeader Module
        if (window.MainHeaderModule) {
            this.modules.mainheader = new window.MainHeaderModule();
            this.modules.mainheader.init();
            console.log('✅ MainHeader module initialized');
        }

        // Initialize MobileHeader Module
        if (window.MobileHeaderModule) {
            this.modules.mobileheader = new window.MobileHeaderModule();
            this.modules.mobileheader.init();
            console.log('✅ MobileHeader module initialized');
        }

        // Initialize BottomBar Module
        if (window.BottomBarModule) {
            this.modules.bottombar = new window.BottomBarModule();
            this.modules.bottombar.init();
            console.log('✅ BottomBar module initialized');
        }

        // Initialize Tab System
        if (window.TabSystem) {
            this.modules.tabs = new window.TabSystem();
            console.log('✅ TabSystem initialized');
        }

        this.setupGlobalEvents();
        console.log('✅ All header modules initialized');
    }

    setupGlobalEvents() {
        // Listen for language changes
        window.addEventListener('languageChange', (e) => {
            console.log('Global language change event:', e.detail.language);
            // Sync language across all components
            this.syncLanguage(e.detail.language);
        });

        // Listen for search events
        window.addEventListener('headerSearch', (e) => {
            console.log('Header search event:', e.detail.query);
        });

        window.addEventListener('headerSearchSubmit', (e) => {
            console.log('Header search submit:', e.detail.query);
            // Handle search submission
        });

        // Listen for mobile menu events
        window.addEventListener('mobileMenuOpened', () => {
            console.log('Mobile menu opened');
        });

        window.addEventListener('mobileMenuClosed', () => {
            console.log('Mobile menu closed');
        });
    }

    syncLanguage(lang) {
        // Sync language across both topbar and mobile menu
        const allLangButtons = document.querySelectorAll('.lang-btn, .mobile-lang-btn');
        allLangButtons.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    getModule(name) {
        return this.modules[name] || null;
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.headerLoader = new HeaderComponentLoader();
    window.headerLoader.loadAllComponents();
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeaderComponentLoader;
} else {
    window.HeaderComponentLoader = HeaderComponentLoader;
}
