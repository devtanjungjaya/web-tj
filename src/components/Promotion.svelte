<div 
    class={`flex flex-col ${photoFirst ? 'sm:flex-row' : 'sm:flex-row-reverse sm:space-x-reverse'} justify-center 
    space-x-0 space-y-6 sm:space-x-12 sm:space-y-0`}
>
    <div class="promo-img flex-shrink-0">
        <div class="relative h-0 w-full" style="padding-bottom: 80%">
            <Image 
                wrapperClass="absolute rounded-2xl"
                imgClass="object-cover rounded-2xl"
                src={img} 
                alt={img} />
        </div>
    </div>
    <div class="flex flex-col space-y-2 lg:space-y-8 self-center">
        <span class="text-primary-7 font-overpass font-bold text-2xl lg:text-3xl">{headline}</span>
        <p class="text-lg lg:text-xl font-open-sans text-neutral-5 max-w-3xl">
            {content}
        </p>
    </div>
</div>

<script>
    import Image from './Image.svelte';

    export let content;
    export let headline;
    export let photoFirst = true;
    export let img;
</script>

<style type="text/postcss">
.promo-img {
    width: 300px;
    max-width: 100%;
    height: fit-content;
    align-self: center;
}

@screen sm {
    .promo-img {
        width: 200px;
    }
}

@screen md {
    .promo-img {
        width: 300px;
    }
}

@screen lg {
    .promo-img {
        width: 362px;
    }
}
</style>