<script context="module">
    const imgCache = new Map();
</script>

<script>
    export let wrapperClass = "";
    export let imgClass = "";
    export let src;
    export let alt;

    let loaded = false;
    let error = false;

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
                error = true;
                loaded = true;
            }
		}

		return {
			destroy(){}
		};
	}
</script>

<div 
    class={`w-full h-full flex items-center justify-center ${loaded ? '' : 'skeleton-box'} 
    ${wrapperClass} ${error ? 'bg-neutral-1' : ''}`}
>
    <img
        class={`${error ? 'h-10 w-10' : 'w-full h-full'} ${imgClass}`}
        class:invisible={!loaded}
        {alt}
        use:lazy={{ src }}
    />
</div>