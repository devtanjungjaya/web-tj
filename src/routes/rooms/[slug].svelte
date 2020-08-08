<script context="module">
   const mapboxAccessToken = "MAPBOX_ACCESS_TOKEN";

   export async function preload({ params: { slug }, query }) {
      const res = await this.fetch(`rooms/${slug}.json`);
      const data = await res.json();
      if(res.status === 200) {
         const neighborhood = await this.fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
            `${data.coordinate.lng},${data.coordinate.lat}.json?` +
            `access_token=${mapboxAccessToken}&types=neighborhood`
         ).then(r => r.json()).then(d => d.features.length ? d.features[0]['place_name'] : 
            'Buffer Zone KEK Tanjung Lesung');
         return {
            data,
            neighborhood
         }
      } else {
         return this.redirect(404, '404');
      }
   }
</script>

<script>
   import Decorator from "../../components/Decorator.svelte";
   import Contact from "../../components/Item/Contact.svelte";
   import Header from "../../components/Item/Header.svelte";
   import Prices from "../../components/Item/Prices.svelte";
   import Link from "../../components/Item/Link.svelte";
   import Facilities from "../../components/Item/Facilities.svelte";
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
   let image;

   $: title = `${data.name} - ${data.category} - Penginapan di ${neighborhood}`;
   $: description = `${data.description.replace(/(<([^>]+)>)/g, "").replace(/(\r\n|\n|\r)/gm, "")} ${data.notes ? 
      data.notes.replace(/(<([^>]+)>)/g, "").replace(/(\r\n|\n|\r)/gm, "") : ""}`;
   $: image = data.photos.length ? 'https://bufferzonetanjunglesung.com/' + data.photos[0].photoURI : '';
</script>

<svelte:head>
   <title>{title}</title>
   <link rel="canonical" href={"https://bufferzonetanjunglesung.com/rooms/" + data.slug} />
   <meta name="description" content={description} />
   <meta property="og:title" content={title} />
   <meta property="og:type" content="website" />
   <meta property="og:description" content={description} />
   <meta property="og:image" content={image} />
   <meta name="twitter:title" content={title}>
   <meta name="twitter:description" content={description}>
   <meta name="twitter:image" content={image}>
</svelte:head>

<div class="px-4 sm:px-8 md:px-16 py-6 sm:py-12 flex flex-col">
   <Header
      typeURL="rooms"
      type="PENGINAPAN"
      title={data.name}
      categories={[data.category]}
      {neighborhood}
   />
 
   <svelte:component this={PhotosComponent} photos={data.photos} />

   <div 
      class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-10 xl:space-x-32 lg:justify-between 
      mt-10 sm:mt-20 max-w-7xl">
      <div class="flex flex-col">
         {#if data.promotions && data.promotions.length}
            <Promotions promotions={data.promotions} />
         {/if}
         {#if DOMPurify}
            <p class="font-open-sans text-neutral-5 text-lg sm:text-xl prose">
               {@html DOMPurify.sanitize(data.description)}
            </p>
         {/if}
         {#if data.roomFacilities && data.roomFacilities.length}
            <Decorator />
            <Facilities 
               label="Fasilitas kamar" 
               facilities={data.roomFacilities} 
               iconMap={data.roomFacilityIconMap} 
            />
         {/if}
         {#if data.publicFacilities && data.publicFacilities.length}
            <Decorator />
            <Facilities 
               label="Fasilitas publik" 
               facilities={data.publicFacilities} 
               iconMap={data.publicFacilityIconMap} 
            />
         {/if}
         {#if data.notes && DOMPurify}
            <Decorator />
            <div class="flex flex-col font-overpass">
               <span class="font-bold text-neutral-5 text-2xl sm:text-3xl mb-2 sm:mb-3 leading-none">Catatan</span>
               <p class="font-open-sans font-normal text-neutral-5 text-lg sm:text-xl prose">
                  {@html DOMPurify.sanitize(data.notes)}
               </p>
            </div>
         {/if}
      </div>
      <div class="flex flex-col flex-shrink-0 self-start max-w-full space-y-6" style="width: 375px">
         <Prices prices={data.prices} />
         {#if data.coordinate}
            <svelte:component this={MapComponent} {...data.coordinate} />
         {/if}
         {#if data.gmaps}
            <Link url={data.gmaps} icon="ic_gmaps.png" label="Buka lokasi di Google Maps" />
         {/if}
         {#if data.contact && data.contact.phoneNumbers && data.contact.phoneNumbers.length}
         <Contact {...data.contact} name="Silahkan hubungi admin untuk pemesanan atau informasi lebih lanjut"/>
         {/if}
      </div>
   </div>
</div>