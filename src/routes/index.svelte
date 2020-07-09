<div class="flex flex-col-reverse items-center sm:flex-row px-6 sm:px-8 md:px-16 py-6 sm:py-10 md:py-20">
    <div class="flex flex-col flex-shrink mr-auto justify-center items-start font-overpass">
        <h3 class="text-lg md:text-xl lg:text-2xl text-primary-6 font-bold">DESA</h3>
        <h1 class="text-4xl md:text-5xl lg:text-6xl text-primary-7 font-bold">Tanjungjaya</h1>
        <span class="sm:max-w-xs lg:max-w-full text-2xl md:text-3xl lg:text-4xl text-neutral-3">Hidden Treasure of Banten</span>
    </div>
    <div class="items-center w-full landing-1 flex-grow mb-8 sm:ml-10 md:ml-16 sm:mb-0" bind:clientWidth={width} bind:clientHeight={height}>
        <div class="w-full h-0 relative" style="padding-bottom: 83.33%">
            <img 
                class="absolute w-full h-full object-cover rounded-lg shadow-xl" 
                alt="tanjung-jaya" 
                src="images/landing-1.jpg"
            />
        </div>
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
    let width = 0;
    let height = 0;
    let screenWidth = 0;
</script>

<style type="text/postcss">
.triangle {
    z-index: -1;
}

.landing-1 {
    max-width: 600px;
    min-width: 200px;
}
</style>