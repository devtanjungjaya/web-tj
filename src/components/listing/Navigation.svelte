<div class="hidden md:flex space-x-10 font-overpass font-bold text-lg lg:text-xl overflow-x-auto">
    {#each navigations as navigation}
        <a 
            rel="prefetch"
            class={`${current == navigation.url ? 'text-primary-7' : 'text-neutral-2 hover:text-neutral-4'} nav`}
            href={navigation.url}
        >
            {navigation.label}
        </a>
    {/each}
</div>

<div class="md:hidden">
<ClickOutside on:clickoutside={() => open = false}>
    <div class="relative">
        <div 
            class="flex items-center px-4 py-2 border-neutral-1 mr-2
            cursor-pointer hover:bg-gray-100 overflow-hidden border-1 rounded-2xl" 
            on:click={() => open = true}
        >
            <span 
                class="flex-grow font-overpass font-semibold text-neutral-7 text-base xs:text-lg mr-3 xs:mr-6"
            >
                {navigations.filter(n => n.url == current)[0].label}
            </span>
            <svg class="text-primary-7 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path 
                    fill-rule="evenodd" 
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 
                    01-1.414 0l-4-4a1 1 0 010-1.414z" 
                    clip-rule="evenodd">
                </path>
            </svg>
        </div>
        {#if open}
            <div 
                class={`absolute rounded-2xl border-neutral-1 border-1 p-4 mt-4 left-0 z-10 bg-white shadow-xl
                ${open ? 'flex flex-col space-y-2' : 'hidden'} overflow-y-auto min-w-full`}
            >
                {#each navigations.filter(n => n.url != current) as navigation}
                    <a 
                        rel="prefetch"
                        class="font-overpass font-semibold text-neutral-7 text-lg mr-6 whitespace-no-wrap 
                        hover:text-primary-7 w-full" 
                        href={navigation.url}
                        on:click={() => open = false}
                    >
                        {navigation.label}
                    </a>
                {/each}
            </div>
        {/if}
    </div>
</ClickOutside>
</div>

<script>
    import ClickOutside from "../ClickOutside.svelte";

    export let current;
    let open = false;

    const navigations = [
        {
            label: "Destinasi Wisata",
            url: "destinasi-wisata"
        },
        {
            label: "Paket Wisata",
            url: "paket-wisata"
        },
        {
            label: "Produk Lokal",
            url: "produk-lokal"
        },
        {
            label: "Penginapan",
            url: "penginapan"
        }
    ]
</script>