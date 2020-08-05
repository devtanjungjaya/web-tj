import getMarkdownInDirectory from '../../utilities/markdown.js';
import { processPromotions } from '../../utilities/promotion';
import { adminContactsMap } from '../../utilities/contact';
const marked = require('marked');

const wysiwyg = ['description', 'notes'];

let products = getMarkdownInDirectory('content/products/');
products = products.map(product => 
        Object.assign(product, Object.fromEntries(wysiwyg.map(w => product[w] ? [w, marked(product[w])] : [])))
    )
    .map(product => {
        return {
            ...product,
            promotions: processPromotions(product.promotions || []),
            contact: adminContactsMap.get(product.contact) || { phoneNumbers: [] },
            photos: product.photos.map(p => {
                p.photoURI = p.photoURI.substring(p.photoURI.indexOf('images/'))
                return p;
            })
        };
    });
export const map = new Map(products.map(product => [product.slug, product]));

export function getRandom() {
    return [...map.values()].sort(() => Math.random() - 0.5);;
}

export default map;