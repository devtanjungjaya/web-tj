<svelte:head>
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Overpass:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
</svelte:head>

{#if $preloading && $delayedPreloading}
    <div class="fixed w-full top-0 h-1 z-30 slider" transition:slide>
        <div class="line absolute bg-primary-7 h-full w-full"></div>
        <div class="absolute inc bg-primary-7 h-full"></div>
        <div class="absolute dec bg-primary-7 h-full"></div>
    </div>
{/if}

{#if segment !== '404'}
<Navbar />
{/if}
<div class="py-16 min-h-screen">
    <slot></slot>
</div>
{#if segment !== '404'}
    <Footer />
{/if}

<style>
.slider{
    overflow-x: hidden;
}

.line{
  opacity: 0.4;
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
    import Footer from '../components/Footer.svelte';
    import { derived } from 'svelte/store';
    import { stores } from '@sapper/app';
    import { slide } from 'svelte/transition';
    const { preloading } = stores();
    const delayedPreloading = derived(preloading, (currentPreloading, set) => {
        setTimeout(() => set(currentPreloading), 250);
    });

    export let segment;
</script>