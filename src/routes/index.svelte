<div class="flex flex-col-reverse items-center sm:flex-row px-6 sm:px-8 md:px-16 py-6 sm:py-10 md:py-20">
    <div class="flex flex-col flex-shrink mr-auto justify-center items-start font-overpass">
        <h3 class="text-lg md:text-xl lg:text-2xl xl:text-3xl text-primary-6 font-bold">DESA</h3>
        <h1 class="text-4xl md:text-5xl xl:text-6xl text-primary-7 font-bold">Tanjungjaya</h1>
        <span class="sm:max-w-xs lg:max-w-full text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-neutral-3">Hidden Treasure of Banten</span>
    </div>
    <div class="items-center w-full landing-1 flex-grow mb-8 sm:ml-10 md:ml-16 sm:mb-0" bind:clientWidth={width} bind:clientHeight={height}>
        <div class="w-full h-0 relative" style="padding-bottom: 83.33%">
            <img 
                class="absolute w-full h-full object-cover rounded-2xl shadow-xl" 
                alt="tanjung-jaya" 
                src="images/landing-1.webp"
            />
        </div>
    </div>
</div>

<div class="flex flex-col px-8 lg:px-20 xl:px-40 my-32 space-y-32 lg:space-y-24">
    <div class="flex flex-col sm:flex-row justify-center space-x-0 space-y-12 sm:space-x-12 sm:space-y-0">
        <div class="promo-img flex-shrink-0">
            <div class="relative h-0 w-full" style="padding-bottom: 80%">
                <img class="absolute w-full h-full object-cover rounded-2xl" src="images/alam.jpg" alt="alam"/>
            </div>
        </div>
        <div class="flex flex-col space-y-2 lg:space-y-8 self-center">
            <span class="text-primary-7 font-overpass font-bold text-3xl lg:text-4xl">KEINDAHAN ALAM TERSEMBUNYI</span>
            <p class="text-xl lg:text-2xl font-open-sans text-neutral-5 max-w-3xl">
                Tanjungjaya memiliki potensi keindahan alam yang menarik untuk dikunjungi. Terdapat berbagai pantai, 
                air terjun, perkebunan, dan wisata alam lainnya yang siap memanjakan mata. 
            </p>
        </div>
    </div>
    <div class="flex flex-col sm:flex-row-reverse justify-center space-x-0 space-y-12 sm:space-x-12 sm:space-y-0 sm:space-x-reverse">
        <div class="promo-img flex-shrink-0">
            <div class="relative h-0 w-full" style="padding-bottom: 80%">
                <img class="absolute w-full h-full object-cover rounded-2xl" src="images/kerajinan.webp" alt="kerajinan"/>
            </div>
        </div>
        <div class="flex flex-col space-y-2 lg:space-y-8 self-center">
            <span class="text-primary-7 font-overpass font-bold text-3xl lg:text-4xl">PESONA KERAJINAN LOKAL</span>
            <p class="text-xl lg:text-2xl font-open-sans text-neutral-5 max-w-3xl">
                Produk lokal yang dihasilkan kelompok Industri Kecil Menengah (IKM) turut menjadi potensi yang 
                dimiliki desa Tanjungjaya. Pastikan kamu membawa pulang oleh-oleh produk lokal ketika berkunjung ya!
            </p>
        </div>
    </div>
    <div class="flex flex-col sm:flex-row justify-center space-x-0 space-y-12 sm:space-x-12 sm:space-y-0">
        <div class="promo-img flex-shrink-0">
            <div class="relative h-0 w-full" style="padding-bottom: 80%">
                <img class="absolute w-full h-full object-cover rounded-2xl" src="images/budaya.webp" alt="budaya"/>
            </div>
        </div>
        <div class="flex flex-col space-y-2 lg:space-y-8 self-center">
            <span class="text-primary-7 font-overpass font-bold text-3xl lg:text-4xl">KEUNIKAN BUDAYA</span>
            <p class="text-xl lg:text-2xl font-open-sans text-neutral-5 max-w-3xl">
                Telusuri berbagai budaya warga asli yang unik dan menarik. Jalani keseruan beraktivitas bersama 
                warga desa Tanjungjaya dengan beragam kebudayaan yang disuguhkan.
            </p>
        </div>
    </div>
</div>

<div class="flex items-center justify-center relative bg-primary-7 py-32 w-full">
    <img src="images/kemenparekraf.webp" class="kemenparekraf absolute w-48 h-48 opacity-25 z-0" alt="kemenparekraf"/>
    <span 
        class="font-playfair-display font-bold text-primary-2 text-4xl lg:text-5xl 
        text-center max-w-2xl lg:max-w-3xl z-10"
    >
        “ <span class="font-overpass text-white text-4xl lg:text-5xl">
            10 Destinasi Pariwisata Prioritas Kementrian Pariwisata RI
        </span> ”
    </span>
</div>

<div class="flex flex-col px-8 lg:px-20 xl:px-40 py-24">
    <div>
        <span>Produk Lokal</span>
        <a rel="prefetch" href="products">LIHAT LAINNYA</a>
    </div>
</div>

<svelte:window bind:innerWidth={screenWidth} />

<svg 
    class="triangle absolute top-0 right-0 mt-16" 
    viewBox="0 0 600 600" 
    style={
        `max-width: calc(${width+(screenWidth > 768 ? 64 : (screenWidth > 640 ? 32 : 24))}px); 
        max-height: calc(${height+(screenWidth > 768 ? 180 : (screenWidth > 640 ? 160 : 160))}px)`
    }
>
    <defs>
        <linearGradient id="MyGradient" gradientTransform="rotate(90)">
            <stop offset="0%" stop-color="#0ED7CD" />
            <stop offset="35%" stop-color="#0BA79F" />
            <stop offset="100%" stop-color="#054844" />
        </linearGradient>
    </defs>
    <polygon fill="url(#MyGradient)" points="0,0 600,0 600,600" class="bg-primary-7"/>
</svg>

<script>
    let width = 300;
    let height = 300;
    let screenWidth = 1440;
</script>

<style type="text/postcss">
.triangle {
    z-index: -1;
}

.landing-1 {
    max-width: 532px;
}

.kemenparekraf {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>