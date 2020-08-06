<div class="flex flex-col space-y-4 font-bold">
    <h1 class="text-primary-9 text-xl">{title}</h1>
    <div class="flex flex-col space-y-3">
        {#each items as item}
        <a rel="prefetch" href={item.url} class="text-white text-lg footer-menu-link hover:underline">
            {item.label}
        </a>
        {/each}
    </div>
</div>

<style type="text/postcss">
@screen sm {
    .footer-menu-link {
        max-width: 150px
    }
}
</style>

<script>
    export let title;
    export let items;
</script>