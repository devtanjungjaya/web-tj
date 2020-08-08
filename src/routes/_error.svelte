<script>
    export let status;
    export let error;
    const dev = process.env.NODE_ENV === "development";

    $: if(error && error.message && error.message.includes("Failed to fetch dynamically imported module")) {
        location.reload(true);
    }
</script>

<div class="container-inner mx-auto py-16 text-center">
    <h1
        class="text-2xl font-overpass font-bold text-neutral-4 inline p-4">
        {status}
    </h1>
    <p>{error.message}</p>

    {#if dev && error && error.stack}
        <pre>{error.stack}</pre>
    {/if}
</div>