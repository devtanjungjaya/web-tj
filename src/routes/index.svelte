<script context="module">
    export function preload({ params, query }) {
        return Promise.all([
            this.fetch("destinations.json"),
            this.fetch("tours.json"),
            this.fetch("products.json"),
            this.fetch("rooms.json"),
        ])
        .then(r => {
            return Promise.all(r.map(x => x.json()));
        })
        .then(([{ randomDestinations }, { randomTours }, { randomProducts }, { randomRooms }]) => { 
            return {
                randomDestinations,
                randomTours,
                randomProducts,
                randomRooms
            };
        });
    }
</script>

<div class="flex flex-col-reverse items-center sm:flex-row px-6 sm:px-8 md:px-16 py-6 sm:py-10 md:py-20">
    <div class="flex flex-col flex-shrink mr-auto justify-center items-start font-overpass">
        <h3 class="text-lg md:text-xl lg:text-2xl xl:text-3xl text-primary-6 font-bold">DESA</h3>
        <h1 class="text-4xl md:text-5xl xl:text-6xl text-primary-7 font-bold">Tanjungjaya</h1>
        <span class="sm:max-w-xs lg:max-w-full text-xl md:text-2xl lg:text-3xl xl:text-4xl text-neutral-3">Hidden Treasure of Banten</span>
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
    <Promotion 
        img="images/alam.jpg"
        headline="KEINDAHAN ALAM TERSEMBUNYI"
        content="Tanjungjaya memiliki potensi keindahan alam yang menarik untuk dikunjungi. Terdapat berbagai pantai, 
        air terjun, perkebunan, dan wisata alam lainnya yang siap memanjakan mata."
    />
    <Promotion 
        img="images/kerajinan.webp"
        headline="PESONA KERAJINAN LOKAL"
        content="Produk lokal yang dihasilkan kelompok Industri Kecil Menengah (IKM) turut menjadi potensi yang 
        dimiliki desa Tanjungjaya. Pastikan kamu membawa pulang oleh-oleh produk lokal ketika berkunjung ya!"
        photoFirst={false}
    />
    <Promotion 
        img="images/budaya.webp"
        headline="KEUNIKAN BUDAYA"
        content="Telusuri berbagai budaya warga asli yang unik dan menarik. Jalani keseruan beraktivitas bersama 
        warga desa Tanjungjaya dengan beragam kebudayaan yang disuguhkan."
    />
</div>

<div class="flex items-center justify-center relative bg-primary-7 py-24 w-full">
    <img 
        src="images/kemenparekraf.webp" 
        class="kemenparekraf absolute w-48 h-48 z-0" 
        alt="kemenparekraf"
        style="opacity: .1"
    />
    <span 
        class="font-playfair-display font-bold text-primary-2 text-4xl lg:text-5xl 
        text-center max-w-2xl lg:max-w-3xl z-10 leading-none"
    >
        “ <span class="font-overpass text-white text-3xl lg:text-4xl leading-none">
            10 Destinasi Pariwisata Prioritas Kementrian Pariwisata RI
        </span> ”
    </span>
</div>

<div class="flex flex-col px-4 md:px-6 lg:px-20 xl:px-40 py-24 space-y-16">
    <Showcase 
        items={randomDestinations} 
        itemComponent={DestinationItem} 
        title="Destinasi Wisata"
        url="destinations"
    />
    <Showcase 
        items={randomTours} 
        itemComponent={TourItem} 
        title="Paket Wisata"
        url="tours"
    />
    <Showcase 
        items={randomProducts} 
        itemComponent={ProductItem} 
        title="Produk Lokal"
        url="products"
    />
    <Showcase 
        items={randomRooms} 
        itemComponent={RoomItem} 
        title="Penginapan"
        url="rooms"
    />
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
    import Promotion from "../components/Promotion.svelte";
    import Showcase from "../components/Showcase.svelte";
    import DestinationItem from "../components/listing/DestinationItem.svelte";
    import TourItem from "../components/listing/TourItem.svelte";
    import ProductItem from "../components/listing/ProductItem.svelte";
    import RoomItem from "../components/listing/RoomItem.svelte";

    export let randomDestinations;
    export let randomTours;
    export let randomProducts;
    export let randomRooms;

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