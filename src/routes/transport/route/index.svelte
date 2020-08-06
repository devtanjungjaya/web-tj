<header>
    <Header url="transport/route"/>
</header>
<br>
<div class="px-4 sm:px-8 md:px-16 flex flex-col">
    <div class="flex flex-row-reverse mb-8">
        <img src="trans_route_title.jpg" alt="Peta Transportasi Umum Menuju CEC" class="w-full sm:w-1/2">
    </div>
    {#if innerWidth >640}
        <div class="flex flex-row w-full items-center">
            <div class="w-2/3 pr-4">
                <img src="trans_route_map.jpg" alt="Menuju Bufferzone Tanjung Lesung" class=" w-full">
            </div>
            <div class="w-1/3 pl-4">
                <img src="trans_route_vertical.jpg" alt="Jadwal dan Biaya" class="w-full">
            </div>
        </div>
    {:else if innerWidth > 480}
        <div class="flex flex-col w-full items-center">
            <div class="w-full pb-4">
                <img src="trans_route_map.jpg" alt="Menuju Bufferzone Tanjung Lesung" class=" w-full">
            </div>
            <br>
            <div class="w-full pt-4">
                <img src="trans_route_horizontal.jpg" alt="Jadwal dan Biaya" class="w-full">
            </div>
        </div>
    {:else}
        <div class="flex flex-col w-full items-center">
            <div class="w-full pb-4">
                <img src="trans_route_map.jpg" alt="Menuju Bufferzone Tanjung Lesung" class=" w-full">
            </div>
            <br>
            <div class="w-full pt-4">
                <img src="trans_route_vertical.jpg" alt="Jadwal dan Biaya" class="w-full">
            </div>
        </div>
    {/if}
</div>

<svelte:window bind:innerWidth></svelte:window>

<script>
    import Header from "../../../components/transport/Header.svelte"
    $: innerWidth = 0
    const title = "Menuju Buffer Zone KEK Tanjung Lesung dengan Transportasi Umum"
    const description = "Menuju Buffer Zone KEK Tanjung Lesung dengan Transportasi Umum"
</script>

<svelte:head>
   <title>{title}</title>
   <meta name="description" content={description} />
   <meta property="og:title" content={title} />
   <meta property="og:type" content="website" />
   <meta property="og:description" content={description} />
   <meta property="og:image" content="images/landing-1.webp" />
   <meta name="twitter:title" content={title}>
   <meta name="twitter:description" content={description}>
   <meta name="twitter:image" content="images/landing-1.webp">
</svelte:head>