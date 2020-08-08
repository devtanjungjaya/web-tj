<script context="module">
    export async function preload({ params, query }) {
        const sitemap = this.fetch("sitemap.xml");
        const data = await Promise.all([
            this.fetch("destinasi-wisata.json"),
            this.fetch("paket-wisata.json"),
            this.fetch("produk-lokal.json"),
            this.fetch("penginapan.json"),
            this.fetch("potencies.json")
        ])
        .then(r => {
            return Promise.all(r.map(x => x.json()));
        })
        .then(([{ randomDestinations }, { randomTours }, { randomProducts }, { randomRooms }, potencies]) => { 
            return {
                randomDestinations,
                randomTours,
                randomProducts,
                randomRooms,
                potencies,
            };
        });
        return data;
    }
</script>

<svelte:head>
    <title>{title}</title>
    <link rel="canonical" href="https://www.bufferzonetanjunglesung.com/" />
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta name="twitter:title" content={title}>
    <meta name="twitter:description" content={description}>
    <meta name="twitter:image" content={image}>
</svelte:head>

<div 
    class="flex flex-col-reverse items-center sm:flex-row px-6 sm:px-8 md:px-16 pt-6 py-4 sm:py-8 md:py-16
    mb-8 md:mb-16 lg:mb-20"
>
    <div class="flex flex-col flex-shrink mr-auto justify-center items-start font-overpass">
        <h3 class="text-2xl xs:text-2xl md:text-2xl lg:text-3xl xl:text-4xl text-primary-6 font-bold leading-none">
            Hidden Treasure of
        </h3>
        <h1 
            class="text-4xl xs:text-5xl md:text-5xl xl:text-6xl text-primary-7 font-bold 
            whitespace-no-wrap leading-tight"
        >
            Tanjung Lesung
        </h1>
        <span class="sm:max-w-xs lg:max-w-full text-xl xs:text-2xl md:text-2xl lg:text-3xl xl:text-4xl text-neutral-3">
            Your Next Adventure!
        </span>
    </div>
    <div 
        class="items-center max-w-xs xs:max-w-sm xl:max-w-md w-full flex-grow mb-8 sm:ml-10 md:ml-16 sm:mb-0" 
        bind:clientWidth={width} 
        bind:clientHeight={height}
    >
        <div class="w-full h-0 relative" style="padding-bottom: 83.33%">
            <Image 
                wrapperClass="absolute rounded-2xl shadow-xl"
                imgClass="object-cover rounded-2xl" 
                alt="tanjung-jaya" 
                src="images/hero.webp"
            />
        </div>
    </div>
</div>

<div class="px-5 md:px-0">
    <Shortcut />
</div>

<div class="flex flex-col px-8 lg:px-20 xl:px-40 my-24 space-y-16 sm:space-y-24">
    {#each potencies as potency, i}
        <Promotion 
            img={potency.image.substring(potency.image.indexOf('image/'))}
            headline={potency.title}
            content={potency.content}
            photoFirst={i%2 === 0}
        />
    {/each}
</div>

<div class="flex items-center justify-center relative bg-primary-7 py-12 sm:py-24 w-full">
    <img 
        src="images/kemenparekraf.webp" 
        class="kemenparekraf absolute w-32 h-32 sm:w-48 sm:h-48 z-0" 
        alt="kemenparekraf"
        style="opacity: .1"
    />
    <span 
        class="font-playfair-display font-bold text-primary-2 text-4xl lg:text-5xl 
        text-center max-w-2xl lg:max-w-3xl z-10 leading-none px-4"
    >
        “ <span 
            class="font-overpass text-white text-2xl md:text-3xl lg:text-4xl leading-none"
          >
            10 Destinasi Pariwisata<br />Prioritas Kementerian Pariwisata RI
        </span> ”
    </span>
</div>

<div class="flex flex-col px-4 md:px-6 lg:px-20 xl:px-40 py-24 space-y-16">
    <Showcase 
        items={randomDestinations} 
        itemComponent={DestinationItem} 
        title="Destinasi Wisata"
        url="destinasi-wisata"
    />
    <Showcase 
        items={randomTours} 
        itemComponent={TourItem} 
        title="Paket Wisata"
        url="paket-wisata"
    />
    <Showcase 
        items={randomProducts} 
        itemComponent={ProductItem} 
        title="Produk Lokal"
        url="produk-lokal"
    />
    <Showcase 
        items={randomRooms} 
        itemComponent={RoomItem} 
        title="Penginapan"
        url="penginapan"
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
    import Image from '../components/Image.svelte';
    import Shortcut from "../components/Shortcut.svelte";

    export let randomDestinations;
    export let randomTours;
    export let randomProducts;
    export let randomRooms;
    export let potencies;

    let width = 300;
    let height = 300;
    let screenWidth = 1440;

    const title = "Hidden Treasure of Tanjung Lesung";
    const description = "Hidden Treasure of Tanjung Lesung merupakan kawasan desa-desa wisata di sekitar KEK Tanjung Lesung yang terdiri dari desa Tanjungjaya, Citeureup, Cigeulis, dan Banyuasih. Desa-desa ini memiliki potensi alam dan budaya yang begitu mempesona. Hidden Treasure of Tanjung Lesung dikelola oleh para warga yang tergabung dalam Pokdarwis (Kelompok Sadar Wisata) dari masing-masing desa.";
    const image = 'https://www.bufferzonetanjunglesung.com/images/hero.webp';
</script>

<style type="text/postcss">
.triangle {
    z-index: -5;
}

.kemenparekraf {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>
