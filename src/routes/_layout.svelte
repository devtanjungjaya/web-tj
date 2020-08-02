<svelte:head>
    <title>Buffer Zone KEK Tanjung Lesung</title>
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Overpass:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
</svelte:head>

{#if $preloading && $delayedPreloading}
    <div class="absolute top-0 w-full h-1 z-30 slider" transition:slide>
        <div class="line bg-primary-7 h-full"></div>
        <div class="subline inc bg-primary-7 h-full"></div>
        <div class="subline dec bg-primary-7 h-full"></div>
    </div>
{/if}

<Navbar />
<div class="py-16 min-h-screen">
    <slot></slot>
</div>

<style>
.slider{
    position:absolute;
    width:1000px;
    overflow-x: hidden;
}

.line{
  position:absolute;
  opacity: 0.4;
  width:150%;
}

.subline{
  position:absolute;
}
.inc{
  animation: increase 2s infinite;
}
.dec{
  animation: decrease 2s 0.5s infinite;
}

@keyframes increase {
   from { left: -5%; width: 5%; }
   to { left: 130%; width: 100%;}
}
@keyframes decrease {
   from { left: -80%; width: 80%; }
   to { left: 110%; width: 10%;}
}
</style>

<script>
    import Navbar from "../components/Navbar.svelte";
    import { derived } from 'svelte/store';
    import { stores } from '@sapper/app';
    import { slide } from 'svelte/transition';
    const { preloading } = stores();
    const delayedPreloading = derived(preloading, (currentPreloading, set) => {
        setTimeout(() => set(currentPreloading), 2);
    });

    $: console.log($preloading, $delayedPreloading);
</script>