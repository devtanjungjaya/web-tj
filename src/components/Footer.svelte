<footer class="flex flex-col p-5 py-8 xs:p-8 lg:p-16 bg-primary-7 space-y-16 items-center">
    <div class="flex flex-col xl:flex-row space-y-10 xl:space-x-16 xl:space-y-0 font-overpass w-full">
        <div class="flex flex-col space-y-4 max-w-5xl xl:max-w-xl 2xl:max-w-2xl mr-auto">
            <h1 class="font-bold text-primary-9 text-xl">Tentang kami</h1>
            <h2 class="font-normal text-white text-lg text-justify">
                Hidden Treasure of Tanjung Lesung merupakan kawasan desa-desa wisata di sekitar 
                KEK Tanjung Lesung yang terdiri dari desa Tanjungjaya, Citeureup, Cigeulis, dan Banyuasih. 
                Desa-desa ini memiliki potensi alam dan budaya yang begitu mempesona. Hidden Treasure of 
                Tanjung Lesung dikelola oleh para warga yang tergabung dalam Pokdarwis (Kelompok Sadar Wisata) 
                dari masing-masing desa.
            </h2>
        </div>
        <div 
            class="flex flex-col sm:flex-row sm:justify-between space-y-8 sm:space-x-8 sm:space-y-0 
            xl:space-x-12 2xl:space-x-16"
        >
            {#each menus as menu}
                <FooterMenu {...menu} />
            {/each}
        </div>
    </div>
    <div 
        class="grid grid-cols-2 row-gap-16 lg:flex lg:flex-row lg:space-x-20 lg:justify-center w-full"
        style="justify-items: center"
    >
        {#each logos as logo}
            <img src={logo} alt={logo} class="h-10 xs:h-12" />
        {/each}
    </div>
</footer>

<script>
    import FooterMenu from './FooterMenu.svelte';

    const logos = [
        'images/logo-bufferzone.webp',
        'images/logo-pandeglang.webp',
        'images/logo-ugm-putih.webp',
        'images/logo-kkn-tanjungjaya-putih.webp'
    ];

    const categoryMenu = [
        {
            label: "Destinasi\nWisata",
            url: "destinations"
        },
        {
            label: "Paket Wisata",
            url: "tours"
        },
        {
            label: "Produk Lokal",
            url: "products"
        },
        {
            label: "Penginapan",
            url: "rooms"
        }
    ];

    const transportMenu = [
        {
            label: 'Peta transportasi',
            url: 'transport'
        },
        {
            label: 'Jalur\ntransportasi',
            url: 'transport/route'
        },
    ];

    const mapMenu = [
        {
            label: 'Peta fasilitas\nkesehatan',
            url: 'maps/fasilitas-kesehatan'
        },
        {
            label: 'Peta penginapan',
            url: 'maps/penginapan'
        },
    ];

    const contactMenu = [
        {
            label: 'Admin Tanjungjaya',
            url: 'contact'
        },
        {
            label: 'Admin Citeureup',
            url: 'contact'
        },
        {
            label: 'Admin Cigeulis',
            url: 'contact'
        },
        {
            label: 'Admin Banyuasih',
            url: 'contact'
        },
    ];

    const menus = [
        {
            title: "Kategori",
            items: categoryMenu
        },
        {
            title: "Transportasi",
            items: transportMenu
        },
        {
            title: "Peta",
            items: mapMenu
        },
        {
            title: "Kontak",
            items: contactMenu
        },
    ];
</script>