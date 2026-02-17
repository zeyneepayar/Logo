# Logo - Modüler Web Projesi

Bu proje HTML, CSS ve vanilla JavaScript kullanılarak oluşturulmuş **tamamen modüler** bir web uygulamasıdır.

## 🎯 Proje Özellikleri

### Modüler Komponentler

1. **Top Bar** (`components/header/topbar.html`)
   - Dil değiştirici (TR/EN)
   - Üst menü linkleri (Corporate, Investor relations, vb.)
   - Desktop'ta görünür, mobile'da gizli

2. **Main Header** (`components/header/mainheader.html`)
   - Logo bileşeni
   - Dropdown navigasyon menüleri
   - Arama kutusu
   - Contact Us butonu
   - Responsive tasarım

3. **Mobile Header** (`components/header/mobileheader.html`)
   - Hamburger menü
   - Tam ekran overlay
   - Mobil için optimize edilmiş navigasyon
   - Accordion dropdown'lar

4. **Bottom Bar** (`components/bottombar.html`)
   - Sabit alt bar
   - WhatsApp iletişim butonu
   - Dijital asistan ve çözüm bulucu linkleri

5. **Tab Navigation** (`components/tabs/tab-navigation.html`)
   - 4 farklı servis kategorisi
   - Dinamik içerik değiştirme

6. **Tab Content** (`components/tabs/tab-content.html`)
   - Hero banner bölümleri
   - Product showcase alanları

## 📁 Proje Yapısı

```
logo/
├── components/              # HTML Modülleri
│   ├── header/             # Header komponentleri
│   │   ├── topbar.html
│   │   ├── mainheader.html
│   │   └── mobileheader.html
│   ├── tabs/               # Tab komponentleri
│   │   ├── tab-navigation.html
│   │   └── tab-content.html
│   └── bottombar.html      # Alt bar komponenti
│
├── css/                    # Modüler CSS Dosyaları
│   ├── topbar.css
│   ├── mainheader.css
│   ├── mobileheader.css
│   ├── bottombar.css
│   ├── tabs.css
│   ├── hero-banner.css
│   └── product-showcase.css
│
├── js/
│   ├── modules/           # JavaScript Modülleri
│   │   ├── topbar.js
│   │   ├── mainheader.js
│   │   ├── mobileheader.js
│   │   ├── bottombar.js
│   │   └── tabs.js
│   └── headerLoader.js    # Component yükleyici
│
├── index.html             # Ana sayfa (sadece container'lar)
├── styles.css             # Genel stiller
├── script.js              # Product showcase komponenti
└── README.md              # Bu dosya
```

## 🚀 Kullanım

### Kurulum

1. Projeyi klonlayın veya indirin
2. `index.html` dosyasını tarayıcınızda açın

### Live Server ile Çalıştırma (Önerilen)

```bash
# VS Code Live Server eklentisi ile
# index.html'e sağ tıklayın > "Open with Live Server"
```

**Not:** Modüler yapı fetch API kullandığı için bir HTTP sunucusu gereklidir. Doğrudan dosyayı çift tıklayarak açarsanız CORS hatası alabilirsiniz.

## 🎨 Modüler Yapı Nasıl Çalışır?

### 1. HTML Komponentleri
Her header bileşeni ayrı bir HTML dosyasında tanımlanmıştır:
```html
<!-- index.html -->
<div id="topbarContainer"></div>
<div id="mainHeaderContainer"></div>
<div id="mobileHeaderContainer"></div>
```

### 2. Dinamik Yükleme
JavaScript `headerLoader.js` tüm bileşenleri otomatik yükler:
```javascript
window.headerLoader.loadAllComponents();
```

### 3. Bağımsız Modüller
Her modül kendi class'ına sahiptir:
- `TopBarModule` - Dil değiştirme ve üst menü
- `MainHeaderModule` - Ana navigasyon ve arama
- `MobileHeaderModule` - Mobil menü yönetimi

## 🔧 Özelleştirme

### Yeni Menü Öğesi Ekleme

**1. components/header/mainheader.html:**
```html
<div class="nav-item">
    <a href="#yeni-sayfa" class="nav-link">Yeni Menü</a>
</div>
```

### Renk Temasını Değiştirme

**css/mainheader.css:**
```css
:root {
    --primary-color: #E4002B;  /* Ana renk */
    --hover-color: #c40025;     /* Hover rengi */
}
```

### Dropdown Menü Düzenleme

**components/header/mainheader.html:**
```html
<div class="nav-item dropdown">
    <button class="nav-link">
        Menü Adı
        <svg class="dropdown-icon">...</svg>
    </button>
    <div class="dropdown-menu">
        <a href="#" class="dropdown-item">Alt Menü 1</a>
        <a href="#" class="dropdown-item">Alt Menü 2</a>
    </div>
</div>
```

## 📱 Responsive Tasarım

- **Desktop (1024px+)**: Tüm 3 modül görünür
- **Tablet/Mobile (<1024px)**: Top bar gizli, hamburger menü aktif

## 🎯 Event Sistemi

Modüller arası iletişim için custom event'ler kullanılır:

```javascript
// Dil değişikliği
window.addEventListener('languageChange', (e) => {
    console.log('Yeni dil:', e.detail.language);
});

// Arama
window.addEventListener('headerSearchSubmit', (e) => {
    console.log('Arama sorgusu:', e.detail.query);
});

// Mobil menü
window.addEventListener('mobileMenuOpened', () => {
    // Menü açıldı
});
```

## 🛠️ Geliştirme

### Yeni Modül Ekleme

1. `components/` altında yeni HTML dosyası oluşturun
2. `css/` altında modül için CSS dosyası ekleyin
3. `js/modules/` altında modül class'ı oluşturun
4. `headerLoader.js` içine yükleme kodunu ekleyin
5. `index.html` içine script ve link etiketlerini ekleyin

### Debug Modu

Console'da modüllere erişim:
```javascript
// Header loader'a erişim
window.headerLoader

// Belirli bir modüle erişim
window.headerLoader.getModule('topbar')
window.headerLoader.getModule('mainheader')
window.headerLoader.getModule('mobileheader')
```

## 🎨 Özellikler

- ✅ Tamamen modüler yapı
- ✅ Bağımsız bileşenler
- ✅ Responsive tasarım
- ✅ Dropdown menüler
- ✅ Arama fonksiyonu
- ✅ Dil değiştirme
- ✅ Mobil hamburger menü
- ✅ Smooth animasyonlar
- ✅ Event-driven mimari
- ✅ Kolay özelleştirme

## 🌐 Tarayıcı Desteği

- Chrome (son 2 versiyon)
- Firefox (son 2 versiyon)
- Safari (son 2 versiyon)
- Edge (son 2 versiyon)

## 📝 Lisans

Bu proje özgürce kullanılabilir ve özelleştirilebilir.

## 💡 İpuçları

- Her modül bağımsız çalışır, istediğiniz modülü kaldırabilir veya ekleyebilirsiniz
- CSS değişkenleri kullanarak renk temasını kolayca değiştirebilirsiniz
- Event sistemi sayesinde modüller arası iletişim kolaydır
- Mobile-first yaklaşımla tasarlandı
