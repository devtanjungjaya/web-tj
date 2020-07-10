<svelte:head>
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Overpass:wght@400;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
</svelte:head>

<Navbar />
<div class="my-20">
    <slot></slot>
</div>


<script>
    import Navbar from "../components/Navbar.svelte";
</script>