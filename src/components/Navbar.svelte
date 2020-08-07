<div 
    class="flex items-center fixed top-0 w-full border-b-1 border-neutral-1 py-5 px-4 md:px-6 lg:px-16 
    bg-white font-overpass font-bold text-neutral-3 text-lg lg:text-xl z-20"
>
    <a rel="prefetch" href="/" class="mr-auto cursor-pointer hover:text-primary-7">Home</a>
    <div class="hidden sm:flex items-center space-x-10 lg:space-x-20">
        <div class="relative group cursor-pointer">
            <span class="group-hover:text-primary-7">Kategori</span>
            <div class="h-3 w-full absolute hidden group-hover:block"></div>
            <div 
                class={`absolute rounded-2xl border-neutral-1 border-1 p-4 mt-3 left-0 z-10 bg-white shadow-xl
                hidden group-hover:flex flex-col space-y-2 overflow-y-auto`}
            >
                {#each navigations as navigation}
                    <a  
                        rel="prefetch"
                        class="font-overpass font-semibold text-neutral-7 text-lg mr-6 whitespace-no-wrap 
                        hover:text-primary-7 w-full" 
                        href={navigation.url}
                    >
                        {navigation.label}
                    </a>
                {/each}
            </div>
        </div>        
        <div class="relative group cursor-pointer">
            <span class="group-hover:text-primary-7">Transportasi</span>
            <div class="h-3 w-full absolute hidden group-hover:block"></div>
            <div 
                class={`absolute rounded-2xl border-neutral-1 border-1 p-4 mt-3 left-0 z-10 bg-white shadow-xl
                hidden group-hover:flex flex-col space-y-2 overflow-y-auto`}
                style="min-width: 125px"
            >
                {#each transportations as transportation}
                    <a  
                        rel="prefetch"
                        class="font-overpass font-semibold text-neutral-7 text-lg mr-6 whitespace-no-wrap 
                        hover:text-primary-7 w-full" 
                        href={transportation.url}
                    >
                        {transportation.label}
                    </a>
                {/each}
            </div>
        </div>
        <div class="relative group cursor-pointer">
            <span class="group-hover:text-primary-7">Peta</span>
            <div class="h-3 w-full absolute hidden group-hover:block"></div>
            <div 
                class={`absolute rounded-2xl border-neutral-1 border-1 p-4 mt-3 left-0 z-10 bg-white shadow-xl
                hidden group-hover:flex flex-col space-y-2 overflow-y-auto`}
            >
                {#each map_navigations as navigation}
                    <a 
                        rel="prefetch"
                        class="font-overpass font-semibold text-neutral-7 text-lg mr-6 whitespace-no-wrap 
                        hover:text-primary-7 w-full" 
                        href={navigation.url}
                    >
                        {navigation.label}
                    </a>
                {/each}
            </div>
        </div>
        <a rel="prefetch" href="contact" class="hover:text-primary-7">Kontak</a>
    </div>
    <svg 
        class="text-primary-7 sm:hidden w-6 h-6 rounded-full cursor-pointer"
        bind:this={menu}
        on:click={() => open = true} 
        fill="currentColor" 
        viewBox="0 0 20 20"
    >
        <path 
            fill-rule="evenodd" 
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 
            01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" 
            clip-rule="evenodd"
        >
        </path>
    </svg>
</div>

{#if open}
<div class="inset-0 fixed w-full h-screen bg-neutral-9 opacity-25 z-20" transition:fade={{duration:150}}></div>
<ClickOutside on:clickoutside={() => open = false} exclude={[menu]}>
    <div 
        class="top-0 right-0 fixed w-auto h-screen flex flex-col justify-center pl-8 pr-16 text-center bg-white 
        space-y-8 z-30 items-start overflow-y-auto" 
        transition:fly={{duration:150, x: 150}}
    >
        <div class="flex flex-col items-start">
            <span class="font-bold font-overpass text-neutral-3 text-base text-left mb-2">KATEGORI</span>
            <div class="flex flex-col items-start space-y-2">
                {#each navigations as navigation}
                    <a 
                        rel="prefetch"
                        class="font-overpass font-semibold text-neutral-7 text-lg whitespace-no-wrap 
                        hover:text-neutral-6" 
                        href={navigation.url}
                        on:click={() => open = false}
                    >
                        {navigation.label}
                    </a>
                {/each}
            </div>
        </div>
        <div class="flex flex-col items-start">
            <span class="font-bold font-overpass text-neutral-3 text-base text-left mb-2">TRANSPORTASI</span>
            <div class="flex flex-col items-start space-y-2">
                {#each transportations as transportation}
                    <a 
                        rel="prefetch"
                        class="font-overpass font-semibold text-neutral-7 text-lg whitespace-no-wrap 
                        hover:text-neutral-6" 
                        href={transportation.url}
                        on:click={() => open = false}
                    >
                        {transportation.label}
                    </a>
                {/each}
            </div>
        </div>
        <div class="flex flex-col items-start">
            <span class="font-bold font-overpass text-neutral-3 text-base text-left mb-2">PETA</span>
            <div class="flex flex-col items-start space-y-2">
                {#each map_navigations as navigation}
                    <a 
                        rel="prefetch"
                        class="font-overpass font-semibold text-neutral-7 text-lg whitespace-no-wrap 
                        hover:text-neutral-6" 
                        href={navigation.url}
                        on:click={() => open = false}
                    >
                        {navigation.label}
                    </a>
                {/each}
            </div>
        </div>
        <a 
            rel="prefetch"
            href="contact"
            class="font-overpass font-semibold text-primary-7 text-lg whitespace-no-wrap"
            on:click={() => open = false}
        >
            Kontak
        </a>
        <svg 
            class="text-neutral-2 cursor-pointer w-6 h-6 rounded-full absolute top-0 right-0 mr-4" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            on:click={() => open = false}
        >
            <path 
                fill-rule="evenodd" 
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 
                4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 
                5.707a1 1 0 010-1.414z" 
                clip-rule="evenodd"
            >
            </path>
        </svg>
    </div>
</ClickOutside>
{/if}

<script>
    import { fly, fade } from "svelte/transition";
    import ClickOutside from "./ClickOutside.svelte"

    let open = false;
    let menu;

    const navigations = [
        {
            label: "Destinasi Wisata",
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
    ]
    const transportations = [
        {
            label: "Peta Transportasi",
            url: "transport"
        },
        {
            label: "Jalur Transportasi",
            url: "transport/route"
        }
    ]
    const map_navigations=[
        {
            label: "Mitigasi Bencana",
            url: "maps/mitigasi-bencana"
        },
        {
            label: "Fasilitas Kesehatan",
            url: "maps/fasilitas-kesehatan"
        },
        {
            label: "Penginapan",
            url: "maps/penginapan"
        },
        {
            label: "Penggunaan Lahan",
            url: "maps/penggunaan-lahan"
        },
        {
            label: "Potensi Kampung",
            url: "maps/potensi-kampung"
        },
    ]
</script>
