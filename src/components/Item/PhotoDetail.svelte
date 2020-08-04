<div class="fixed inset-0 bg-white flex flex-col z-20" transition:fly={{duration:150, y: 600}}>
    <div class="py-3 px-2 w-full flex items-center">
        <span 
            class="font-normal font-overpass text-neutral-3 text-base sm:text-lg md:text-xl mx-auto pl-12 pt-1"
            style="height: fit-content"    
        >
            {currentIndex+1}/{photos.length}
        </span>
        <svg 
            class="text-neutral-5 cursor-pointer w-10 h-10 p-2 rounded-full hover:bg-gray-100" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            on:click={() => dispatch("close")}
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
    <div 
        class="md:px-3 w-full flex items-center justify-center absolute" 
        style="top: 40%; transform: translateY(-40%)"
    >
        <Carousel 
            perPage="1" 
            dots={false} 
            startIndex={initialIndex}
            on:change={({ detail: { currentSlide }}) => {
                currentIndex = currentSlide;
            }}
        >
            {#each photos as photo, i}
            <div 
                class="max-h-full"
                style="height: 60vh"    
            >
                <Image
                    imgClass="object-contain"
                    size="h-full"
                    src={photo.photoURI}
                    alt={photo.description}
                />
            </div>
            {/each}
        </Carousel>
    </div>
    <span 
        class="py-6 px-2 text-center mt-auto font-open-sans font-normal text-neutral-6 
        text-base sm:text-lg"
    >
        {photos[currentIndex].description}
    </span>
</div>


<script>
    import Image from "../Image.svelte";
    import Carousel from "../Carousel.svelte";
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let photos;
    export let initialIndex = 0;

    let currentIndex = initialIndex;
</script>