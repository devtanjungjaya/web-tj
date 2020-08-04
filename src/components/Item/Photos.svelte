<Carousel
   bind:this={carousel}
   perPage={{
      1600: photos.length >= 4 ? 4 : 3,
      1024: photos.length >= 3 ? 3 : 2, 
      768: photos.length >= 2 ? 2 : 1 
   }} 
   on:init={() => {
      showPhoto = true;
   }}
   on:controller={() => {
      initialize = true;
      updateImgRatio();
   }}
>
   {#each photos as photo, i}
      <div 
         class="px-1 sm:px-4"
         class:invisible={!showPhoto}
         style={`height: ${imgHeight(innerWidth)}px`}
         on:mousedown={handleMouseDown}
         on:mouseup={e => handleMouseUp(e, i)}
      >
         <Image 
            class="object-cover w-full h-full rounded-2xl"
            placeholderClass="object-cover w-full h-full rounded-2xl"
            wrapperClass="skeleton-box rounded-2xl w-full h-full"
            ratio={imgRatio*100 + "%"}
            src={photo.photoURI} 
         />
      </div>
   {/each}
</Carousel>

{#if initialIndex != null}
   <PhotoDetail 
      {photos} 
      {initialIndex} 
      on:close={_ => initialIndex = null}
   />
{/if}

<svelte:head>
   {#if initialIndex != null}
      <style>
         body {
            overflow-y: hidden;
         }
      </style>
   {/if}
</svelte:head>

<svelte:window bind:innerWidth={innerWidth} />

<script>
   import Carousel from '../../components/Carousel.svelte';
   import PhotoDetail from "./PhotoDetail.svelte";
   import Image from "svelte-image";

   export let photos;

   const delta = 6;

   let startX;
   let startY;
   let initialIndex = null;
   let innerWidth;
   let showPhoto = false;
   let carousel;
   let imgRatio = 100;
   let initialize = false;

   $: if(initialize && innerWidth) updateImgRatio();

   function updateImgRatio() {
      if(!carousel && !carousel.width()) return;
      imgRatio = imgHeight(innerWidth) / ((carousel.width() / itemPerPage()) - padding());
   }

   function itemPerPage() {
      if(innerWidth >= 1600) return photos.length >= 4 ? 4 : 3;
      else if(innerWidth >= 1024) return photos.length >= 3 ? 3 : 2
      else if(innerWidth >= 768) return photos.length >= 2 ? 2 : 1;
      else return 1;
   }

   function padding() {
      if(innerWidth >= 640) return 32;
      else return 8;
   }

   function imgHeight(width) {
      return width >= 640 ? 360 : 250;
   }

   function handleMouseDown(event) {
      startX = event.pageX;
      startY = event.pageY;
   }

   function handleMouseUp(event, index) {
      const diffX = Math.abs(event.pageX - startX);
      const diffY = Math.abs(event.pageY - startY);

      if (diffX < delta && diffY < delta) {
         initialIndex = index;
      }
   }

</script>