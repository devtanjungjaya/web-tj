<script context="module">
   export async function preload({ params: { slug }, query }) {
      const res = await this.fetch(`tours/${slug}.json`);
      const data = await res.json();
      if (res.status === 200) {
         return { data };
      } else {
         this.error(res.status, data.message);
      }
   }
</script>

<script>
   import Decorator from "../../components/Decorator.svelte";
   import Contact from "../../components/Contact.svelte";
   import Header from "../../components/Item/Header.svelte";
   import Photos from "../../components/Item/Photos.svelte";
   import Prices from "../../components/Item/Prices.svelte";
   import Link from "../../components/Item/Link.svelte";
   import Facilities from "../../components/Item/Facilities.svelte";

   export let data;
</script>

<div class="px-4 sm:px-8 md:px-16 py-6 sm:py-12 flex flex-col">
   <Header
      typeURL="tours"
      type="PAKET WISATA"
      title={data.name}
      categories={data.categories}
   />
 
   <Photos photos={data.photos} />

   <div class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-10 xl:space-x-32 mt-10 sm:mt-20">
      <div class="flex flex-col max-w-4xl">
         <p class="font-open-sans text-neutral-5 text-lg sm:text-xl">{@html data.description}</p>
         <Decorator />
         <Facilities facilities={data.facilities} iconMap={data.facilityIconMap} />
         <Decorator />
         <Contact {...data.contact} />
      </div>
      <div class="flex flex-col info-panel flex-shrink-0 self-start max-w-full space-y-6">
         <Prices prices={data.prices} />
      </div>
   </div>
</div>