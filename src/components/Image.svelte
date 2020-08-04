<script context="module">
    const imgCache = new Map();
</script>

<script>
    export let wrapperClass = "";
    export let imgClass = "";
    export let src;
    export let alt;

    let loaded = false;

    function lazy(node, data) {
		if (imgCache.has(data.src)) {
            node.setAttribute('src', data.src);
            loaded = true;
		} else {
			const img = new Image();
            img.src = data.src;
            img.onload = () => {
                imgCache.set(data.src, img);
                node.setAttribute('src', data.src);
                loaded = true;
            };
            img.onerror = () => {
                node.setAttribute('src', 'ic_no_photo.svg');
                node.classList.remove('w-full');
                node.classList.remove('h-full');
                node.classList.add("h-10");
                node.classList.add("w-10");
                loaded = true;
            }
		}

		return {
			destroy(){}
		};
	}
</script>

<div 
    class={`w-full h-full flex items-center justify-center ${loaded ? 'bg-neutral-1' : 'skeleton-box'} 
    ${wrapperClass}`}
>
    <img
        class={`w-full h-full ${imgClass}`}
        class:invisible={!loaded}
        {alt}
        use:lazy={{ src }}
    />
</div>