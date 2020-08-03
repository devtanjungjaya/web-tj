<a rel="prefetch" href={typeURL} class="flex space-x-2 items-center cursor-pointer">
    <svg class="text-neutral-2 w-6 h-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        viewBox="0 0 24 24" stroke="currentColor"
    >
       <path d="M15 19l-7-7 7-7"></path>
    </svg>
    <span class="font-bold font-overpass text-neutral-2 text-base sm:text-lg md:text-xl pt-1">
       {type}
    </span>
 </a>
 <h1 class="font-bold font-overpass text-primary-7 text-3xl sm:text-4xl md:text-5xl mt-3 leading-none">
     {title}
</h1>
{#if neighborhood}
<h2 class="font-normal font-overpass text-neutral-2 text-base sm:text-lg md:text-xl">
    {neighborhood}
</h2>
{/if}
 <span class="font-bold font-overpass text-neutral-3 text-base sm:text-lg md:text-xl mt-2 mb-5 sm:mb-10">
     {categories.join(", ")}
</span>

<script>
    export let typeURL;
    export let type;
    export let title;
    export let categories;
    export let neighborhood;
</script>