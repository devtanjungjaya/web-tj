<div class="carousel">
	<div class="slides" bind:this={siema}>
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
    {#if dots}
	<ul>
		{#each {length: totalDots} as _, i}
			<li on:click={() => go(i*currentPerPage)} class={isDotActive(currentIndex, i) ? "active" : ""}></li>
		{/each}
	</ul>
    {/if}
</div>

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
	ul li {
		margin: 6px;
		border-radius: 100%;
		background-color: rgba(255,255,255,0.5);
		height: 8px;
		width: 8px;
	}
	ul li:hover {
		background-color: rgba(255,255,255,0.85);
	}
	ul li.active {
		background-color: rgba(255,255,255,1);
	}
</style>

<script>
	import { onMount, createEventDispatcher, tick } from 'svelte'
	
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
	
	let siema
	let controller
	let timer
	const dispatch = createEventDispatcher()
	$: pips = controller ? controller.innerElements : []
	$: currentPerPage = controller ? controller.perPage : perPage
	$: totalDots = controller ? Math.ceil(controller.innerElements.length / currentPerPage) : []
	
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
        return currentIndex >= dotIndex*currentPerPage && currentIndex < (dotIndex*currentPerPage)+currentPerPage
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
</script>