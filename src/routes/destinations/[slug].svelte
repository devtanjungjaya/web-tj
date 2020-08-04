<script context="module">
   const mapboxAccessToken = "MAPBOX_ACCESS_TOKEN";

   export async function preload({ params: { slug }, query }) {
      const res = await this.fetch(`destinations/${slug}.json`);
      const data = await res.json();
      const neighborhood = await this.fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
         `${data.coordinate.lng},${data.coordinate.lat}.json?` +
         `access_token=${mapboxAccessToken}&types=neighborhood`
      ).then(r => r.json()).then(d => d.features.length ? d.features[0]['place_name'] : 
         'Buffer Zone KEK Tanjung Lesung');
      return {
         data,
         neighborhood
      }
   }
</script>

<script>
   import Decorator from "../../components/Decorator.svelte";
   import Header from "../../components/Item/Header.svelte";
   import Prices from "../../components/Item/Prices.svelte";
   import Facilities from "../../components/Item/Facilities.svelte";
   import Hours from "../../components/Item/Hours.svelte";
   import Link from "../../components/Item/Link.svelte";
   import Promotions from "../../components/Item/Promotions.svelte";
   import { onMount } from "svelte";

   let DOMPurify = null;
   let MapComponent;
   let PhotosComponent;

   onMount(async () => {
      DOMPurify = await import('dompurify');

      const mapModule = await import("../../components/Item/Map.svelte");
      MapComponent = mapModule.default;

      const photosModule = await import("../../components/Item/Photos.svelte");
      PhotosComponent = photosModule.default;
   })

   export let data;
   export let neighborhood;
   let title;
   let description;

   $: title = `${data.name} - Destinasi Wisata ${data.categories.join(", ")} di ${neighborhood}`;
   $: description = data.description.replace(/(<([^>]+)>)/g, "");
</script>

<svelte:head>
   <title>{title}</title>
   <meta name="description" content={description} />
   <meta property="og:title" content={title} />
   <meta property="og:type" content="website" />
   <meta property="og:description" content={description} />
   <meta property="og:image" content={data.photos.length ? data.photos[0].photoURI : ''} />
   <meta name="twitter:title" content={title}>
   <meta name="twitter:description" content={description}>
   <meta name="twitter:image" content={data.photos.length ? data.photos[0].photoURI : ''}>
</svelte:head>

<div class="px-4 sm:px-8 md:px-16 py-6 sm:py-12 flex flex-col">
   <Header
      typeURL="destinations"
      type="DESTINASI WISATA"
      title={data.name}
      categories={data.categories}
      {neighborhood}
   />
 
   <svelte:component this={PhotosComponent} photos={data.photos} />

   <div class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-10 xl:space-x-32 mt-10 sm:mt-20">
      <div class="flex flex-col max-w-4xl">
         {#if data.promotions && data.promotions.length}
            <Promotions promotions={data.promotions} />
         {/if}
         {#if DOMPurify}
            <p class="font-open-sans text-neutral-5 text-lg sm:text-xl prose">
               {@html DOMPurify.sanitize(data.description)}
            </p>
            <Decorator />
         {/if}
         <Facilities facilities={data.facilities} iconMap={data.facilityIconMap} />
         <Decorator />
         <Hours hours={data.hours} />
         {#if data.notes && DOMPurify}
            <Decorator />
            <div class="flex flex-col font-overpass">
               <span class="font-bold text-neutral-5 text-2xl sm:text-3xl mb-6 sm:mb-6">Catatan</span>
               <p class="font-open-sans font-normal text-neutral-5 text-lg sm:text-xl prose">
                  {@html DOMPurify.sanitize(data.notes)}
               </p>
            </div>
         {/if}
      </div>
      <div class="flex flex-col flex-shrink-0 self-start max-w-full space-y-6" style="width: 375px">
         <Prices prices={data.prices} />
         <svelte:component this={MapComponent} {...data.coordinate} />
         {#if data.gmaps}
            <Link url={data.gmaps} icon="ic_gmaps.png" label="Buka lokasi di Google Maps" />
         {/if}
      </div>
   </div>
</div>