<div class="flex space-x-2 sm:space-x-5 items-center w-full">
    <div class="flex items-center justify-center rounded-full bg-primary-7 p-3 flex-shrink-0">
        <img class="w-4 sm:w-6 h-4 sm:h-6" src={icon} alt={label} />
    </div>
    <span class="font-overpass font-normal text-neutral-4 text-lg lg:text-xl sm:text-2xl xl:text-2xl leading-none">
        {label}
    </span>
</div>

<script>
    export let icon;
    export let label;
</script>