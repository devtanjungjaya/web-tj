import rooms from './rooms/_rooms';
import products from './products/_products';
import destinations from './destinasi-wisata/_destinations';
import tours from './tours/_tours';
const { SitemapStream, streamToPromise } = require( 'sitemap' )
const { Readable } = require( 'stream' )

export async function get(req, res, next) {
    const siteUrls = [
        { url: "/", changefreq: "monthly", priority: 0.5 },
        { url: "/rooms/", changefreq: "weekly", priority: 0.8 },
        { url: "/products/", changefreq: "weekly", priority: 0.8 },
        { url: "/destinasi-wisata/", changefreq: "weekly", priority: 0.8 },
        { url: "/tours/", changefreq: "weekly", priority: 0.8 }
    ];

    const roomUrls = [...rooms.keys()].map(slug => ({
        url: `/rooms/${slug}/`,
        changefreq: "monthly",
        priority: 1.0
    }));

    const productUrls = [...products.keys()].map(slug => ({
        url: `/products/${slug}/`,
        changefreq: "monthly",
        priority: 1.0
    }));

    const destinationUrls = [...destinations.keys()].map(slug => ({
        url: `/destinasi-wisata/${slug}/`,
        changefreq: "monthly",
        priority: 1.0
    }));

    const tourUrls = [...tours.keys()].map(slug => ({
        url: `/tours/${slug}/`,
        changefreq: "monthly",
        priority: 1.0
    }));

    const urls = [...siteUrls, ...roomUrls, ...productUrls, ...destinationUrls, ...tourUrls];

    const stream = new SitemapStream({
        hostname: "https://web-tj.netlify.app",
        cacheTime: 600000
    });

    res.writeHead(200, {
        "Content-Type": "application/xml"
    });

    const xml = await streamToPromise(Readable.from(urls).pipe(stream)).then((data) =>
        data.toString()
    );

    res.end(xml);
}