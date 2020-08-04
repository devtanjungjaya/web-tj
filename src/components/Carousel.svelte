<div class="carousel">
	<div bind:this={siema}>
		<slot></slot>
	</div>
	{#if controls}
		{#if currentIndex > 0}
			<img 
				src="ic_left.svg"
				alt="left-carousel"
				class="rounded-full bg-white shadow-md cursor-pointer control left p-4 hidden sm:block" 
				on:click={left} 
			/>
		{/if}
		{#if typeof currentPerPage === 'object' || 
		(controller && currentIndex + controller.perPage < controller.innerElements.length)}
			<img 
				src="ic_right.svg" 
				alt="right-carousel"
				class="rounded-full bg-white shadow-md cursor-pointer control right p-4 hidden sm:block" 
				on:click={right} 
			/>
		{/if}
	{/if}
    {#if dots && totalDots > 1}
	<ul>
		{#each {length: totalDots} as _, i}
			<li
				on:click={() => go(i*currentPerPage)} 
				class={"m-1 rounded-full h-2 w-2 cursor-pointer " + 
				(isDotActive(currentIndex, i) ? "bg-primary-6" : 
				"hover:opacity-100 opacity-50 bg-neutral-1")}
			></li>
		{/each}
	</ul>
    {/if}
</div>

<svelte:window bind:innerWidth={innerWidth} />

<style>
	.carousel {
		position: relative;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
	
	.control {
        position: absolute;
		top: 50%;
		z-index: 5;
        transform: translateY(-50%);
        width: 48px;
        height: 48px;
	}
    .control:focus {
        outline: none;
    }
    .left {
        left: -5px;
    }
    .right {
        right: -5px;
    }
	ul {
		list-style-type: none;
		position: absolute;
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: -30px;
		padding: 0;
	}
</style>

<script>
	import { onMount, createEventDispatcher, tick } from 'svelte'
	const dispatch = createEventDispatcher()
	
	export let perPage = 3
	export let autoplay = 0
	export let duration = 200
	export let easing = 'ease-out'
	export let startIndex = 0
	export let draggable = true
	export let multipleDrag = true	
	export let dots = true	
	export let controls = true
	export let threshold = 20
	export let rtl = false
	let currentIndex = startIndex;
	
	let innerWidth;
	let siema
	let controller;
	let timer
	
	$: pips = controller ? controller.innerElements : []
	$: currentPerPage = controller ? itemPerPage(innerWidth) : 0;
	$: totalDots = controller && currentPerPage ? controller.innerElements.length - (currentPerPage-1) : 0
	$: if(innerWidth && controller) currentIndex = controller.currentSlide
	$: if(controller) dispatch("controller");

	onMount(async () => {
        const { default: s } = await import('siema');
		controller = new s({
			selector: siema,
			perPage: typeof perPage === 'object' ? perPage : Number(perPage),
  			duration,
  			easing,
  			startIndex,
  			draggable,
 			multipleDrag,
  			threshold,
			rtl,
			onInit: () => { dispatch("init") },  
			onChange: handleChange
        })
		
		if(autoplay) {
			timer = setInterval(right, autoplay);
		}
		return () => {
			autoplay && clearInterval(timer)
			controller.destroy()
		}
	})
	export function isDotActive (currentIndex, dotIndex) {
        if (currentIndex < 0) currentIndex = pips.length + currentIndex;
        return currentIndex === dotIndex;
    }
	
	export function left () {
		controller.prev()
	}
	
	export function right () {
		controller.next()
	}
	export function go (index) {
		controller.goTo(index)
	}
	
	export function width() {
		return controller.selectorWidth;
	}

	export function pause() {
		clearInterval(timer);
	}
	export function resume() {
		if (autoplay) {
			timer = setInterval(right, autoplay);
		}
	}
	function handleChange (event) {
		currentIndex = controller.currentSlide;
		dispatch('change', {
			currentSlide: controller.currentSlide,
			slideCount: controller.innerElements.length
		} )
	}
	function itemPerPage(screenWidth) {
		const photos = controller.innerElements.length;
		if(screenWidth >= 1600) return photos >= 4 ? 4 : 3;
		else if(screenWidth >= 1024) return photos >= 3 ? 3 : 2
		else if(screenWidth >= 768) return photos >= 2 ? 2 : 1;
		else return 1;
   	}
</script>