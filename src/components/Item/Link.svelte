<a 
    href={url}
    target="_blank" 
    rel="external noopener noreferrer"
    class="flex border-1 border-neutral-1 rounded-2xl px-5 sm:px-6 py-3 sm:py-4 cursor-pointer 
    items-center hover:bg-gray-100"
>
    <img class="w-6 h-6 sm:w-7 sm:h-7 object-contain" src={icon} alt={label} />
    <span class="ml-3 font-overpass font-bold text-primary-8 text-lg sm:text-xl">{label}</span>
</a>

<script>
    export let url;
    export let icon;
    export let label;
</script>