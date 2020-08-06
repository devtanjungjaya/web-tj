<header>
    <Header url="transport"/>
</header>

<section id="map">
    <Map/>
</section>

<section id="details">
    <Details/>
</section>

<style type="text/postcss">

</style>

<script>
    import Map from "../../components/transport/Map.svelte"
    import Header from "../../components/transport/Header.svelte"
    import Details from "../../components/transport/Details.svelte"
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