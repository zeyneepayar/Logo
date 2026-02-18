# 📦 Component Loader Sistemi - Dokümantasyon

## 🎯 Mimari Tasarım

Bu proje **modüler component yükleme sistemi** kullanır. Her loader **Single Responsibility Principle** prensibi gereği sadece kendi sorumluluğuna odaklanır.

---

## 📁 Klasör Yapısı

```
js/
├── loaders/                          # Tüm loader dosyaları
│   ├── BaseComponentLoader.js        # Base class (tüm loader'lar için)
│   ├── AppLoader.js                  # Ana koordinatör
│   ├── HeaderLoader.js               # Header component'leri
│   ├── TabLoader.js                  # Tab sistemi
│   ├── ProductShowcaseLoader.js      # Product showcase'ler
│   ├── InfoSectionLoader.js          # Info section'lar
│   ├── OnPremiseLoader.js            # On-premise section'lar
│   └── IndustriesLoader.js           # Industries showcase
├── modules/                          # JavaScript modülleri
├── data/                             # Veri dosyaları
└── ...
```

---

## 🔧 Loader'lar ve Sorumlulukları

### 1️⃣ **BaseComponentLoader** (Base Class)
**Dosya:** `js/loaders/BaseComponentLoader.js`

**Görevler:**
- ✅ HTML component'lerini fetch etme
- ✅ Component'leri DOM'a ekleme
- ✅ Hata yönetimi ve loglama
- ✅ Component durumu takibi
- ✅ Event sistemi

**Ana Metodlar:**
```javascript
loadComponent(name, containerId)           // Tekli yükleme
loadMultipleComponents(componentList)      // Toplu yükleme
fetchTemplate(name)                        // Template fetch (render etmeden)
getComponent(name)                         // Component erişimi
isComponentLoaded(name)                    // Yüklenme kontrolü
```

**Kullanım Örneği:**
```javascript
class MyLoader extends BaseComponentLoader {
  constructor() {
    super();
    this.componentPaths = {
      myComponent: 'components/my-component.html'
    };
  }
}
```

---

### 2️⃣ **HeaderLoader**
**Dosya:** `js/loaders/HeaderLoader.js`

**Sorumluluklar:**
- ✅ TopBar yükleme
- ✅ MainHeader yükleme
- ✅ MobileHeader yükleme
- ✅ BottomBar yükleme
- ✅ Dil senkronizasyonu
- ✅ Header event'leri

**Yüklediği Component'ler:**
- `components/header/topbar.html`
- `components/header/mainheader.html`
- `components/header/mobileheader.html`
- `components/bottombar.html`

**Ana Metod:**
```javascript
await headerLoader.loadAllComponents();
```

---

### 3️⃣ **TabLoader**
**Dosya:** `js/loaders/TabLoader.js`

**Sorumluluklar:**
- ✅ Tab navigation yükleme
- ✅ Tab content yükleme
- ✅ Tab sistemi başlatma

**Yüklediği Component'ler:**
- `components/tabs/tab-navigation.html`
- `components/tabs/tab-content.html`

**Ana Metod:**
```javascript
await tabLoader.loadTabSystem();
```

---

### 4️⃣ **ProductShowcaseLoader**
**Dosya:** `js/loaders/ProductShowcaseLoader.js`

**Sorumluluklar:**
- ✅ Product showcase template'lerini yükleme
- ✅ Birden fazla showcase container'a ekleme
- ✅ Showcase tab geçişleri

**Yüklediği Component'ler:**
- `components/product-showcase.html`

**Ana Metod:**
```javascript
await productShowcaseLoader.loadShowcases();
```

**HTML Kullanımı:**
```html
<div class="product-showcase-container"></div>
```

---

### 5️⃣ **InfoSectionLoader**
**Dosya:** `js/loaders/InfoSectionLoader.js`

**Sorumluluklar:**
- ✅ InfoSectionModule başlatma
- ✅ Info section'ları render etme

**Bağımlılıklar:**
- `js/modules/info-section.js`
- `js/data/info-section-data.js`

**Ana Metod:**
```javascript
await infoSectionLoader.loadInfoSections();
```

---

### 6️⃣ **OnPremiseLoader**
**Dosya:** `js/loaders/OnPremiseLoader.js`

**Sorumluluklar:**
- ✅ OnPremiseModule başlatma
- ✅ On-premise section'ları render etme

**Bağımlılıklar:**
- `js/modules/on-premise.js`
- `js/data/on-premise-data.js`

**Ana Metod:**
```javascript
await onPremiseLoader.loadOnPremiseSections();
```

---

### 7️⃣ **IndustriesLoader**
**Dosya:** `js/loaders/IndustriesLoader.js`

**Sorumluluklar:**
- ✅ IndustriesShowcaseModule başlatma
- ✅ Industries showcase'leri render etme

**Bağımlılıklar:**
- `js/modules/industries-showcase.js`
- `js/data/industries-data.js`

**Ana Metod:**
```javascript
await industriesLoader.loadIndustriesShowcase();
```

---

### 8️⃣ **AppLoader** (Ana Koordinatör) ⭐
**Dosya:** `js/loaders/AppLoader.js`

**Görevler:**
- ✅ Tüm loader'ları koordine etme
- ✅ Loader'ları sırayla başlatma
- ✅ Yükleme sürelerini ölçme
- ✅ Hataları toplama ve raporlama
- ✅ Global event'ler fırlatma

**Yükleme Sırası:**
1. Header
2. Tab System
3. Product Showcases
4. Info Sections
5. On-Premise Sections
6. Industries Showcase

**Otomatik Başlatma:**
```javascript
// index.html'de otomatik başlatılır
document.addEventListener('DOMContentLoaded', () => {
  window.appLoader = new AppLoader();
  window.appLoader.initialize();
});
```

**Manuel Başlatma:**
```javascript
const app = new AppLoader();
await app.initialize();
```

**Loader'a Erişim:**
```javascript
const headerLoader = window.appLoader.getLoader('header');
const tabLoader = window.appLoader.getLoader('tab');
```

---

## 🚀 Yeni Loader Ekleme Rehberi

### Adım 1: Loader Dosyası Oluştur
```javascript
// js/loaders/MyNewLoader.js
class MyNewLoader extends BaseComponentLoader {
  constructor() {
    super();
    this.componentPaths = {
      myComponent: 'components/my-component.html'
    };
  }

  async loadMyComponents() {
    console.log('🔄 My components yükleniyor...');
    const success = await this.loadComponent('myComponent', 'myContainer');
    if (success) {
      console.log('✅ My components yüklendi');
    }
    return success;
  }
}

window.MyNewLoader = MyNewLoader;
```

### Adım 2: index.html'e Ekle
```html
<!-- Diğer loader'larla birlikte -->
<script src="js/loaders/MyNewLoader.js"></script>
```

### Adım 3: AppLoader'a Entegre Et
```javascript
// AppLoader.js içinde
this.loaders.myNew = null;

async loadMyNewComponents() {
  console.log('📦 [X/X] My New Components yükleniyor...');
  this.loaders.myNew = new window.MyNewLoader();
  await this.loaders.myNew.loadMyComponents();
}

// initialize() metoduna ekle
await this.loadMyNewComponents();
```

---

## 📊 Avantajlar

### ✅ **Single Responsibility Principle**
Her loader sadece kendi sorumluluğuna odaklanır.

### ✅ **Bağımsız Geliştirme**
Farklı ekipler farklı loader'lar üzerinde çalışabilir.

### ✅ **Kolay Test**
Her loader ayrı test edilebilir.

### ✅ **Kolay Bakım**
Bir değişiklik sadece ilgili loader'ı etkiler.

### ✅ **Genişletilebilir**
Yeni loader eklemek çok kolay.

### ✅ **Merkezi Hata Yönetimi**
BaseComponentLoader tüm hatalarla ilgilenir.

---

## 🐛 Debug ve Loglama

### Console Log'ları
Tüm loader'lar detaylı log verir:
```
🚀 Uygulama başlatılıyor...
═══════════════════════════════════════
📦 [1/6] Header yükleniyor...
🔄 4 component yükleniyor...
✅ topbar component loaded
✅ mainheader component loaded
...
✅ Uygulama başarıyla yüklendi!
⏱️  Yükleme süresi: 245ms
═══════════════════════════════════════
```

### Event Listener
```javascript
window.addEventListener('appLoaded', (e) => {
  console.log('Yükleme tamamlandı!', e.detail);
});

window.addEventListener('appLoadError', (e) => {
  console.error('Yükleme hatası!', e.detail.error);
});
```

---

## 📞 Destek

Sorularınız için: **Logo Yazılım**  
Versiyon: **2.0.0**  
Tarih: **Şubat 2026**

---

## 🎓 Best Practices

1. **Her loader bir şey yapmalı** - Single responsibility
2. **Loader'lar birbirine bağımlı olmamalı** - Loose coupling
3. **Hata durumlarını yönet** - try-catch kullan
4. **Log at** - Debug için önemli
5. **Async/await kullan** - Modern JavaScript
6. **componentPaths tanımla** - Yolları merkezi tut
7. **BaseComponentLoader'ı extend et** - Code reuse

---

**Mutlu Kodlamalar! 🚀**
