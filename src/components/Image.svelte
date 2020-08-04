<script context="module">
    const imgCache = new Map();
</script>

<script>
    export let wrapperClass = "";
    export let imgClass = "";
    export let src;
    export let alt;
    export let contain = false;

    let loaded = false;
    let error = false;
    let imgWidth = 0;

    function lazy(node, data) {
		if (imgCache.has(data.src)) {
            const img = imgCache.get(data.src);
            if(contain) imgWidth = img.naturalWidth / img.naturalHeight * node.clientHeight;
            node.setAttribute('src', data.src);
            loaded = true;
		} else {
			const img = new Image();
            img.src = data.src;
            img.onload = () => {
                if(contain) imgWidth = img.naturalWidth / img.naturalHeight * node.clientHeight;
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
        class={`${error ? 'h-10 w-10' : 'w-full h-full bg-gray-100'} ${error ? '' : imgClass}
        ${loaded ? '' : 'invisible'}`}
        style={contain ? `width: ${imgWidth}px` : ''}
        {alt}
        use:lazy={{ src }}
    />
</div>