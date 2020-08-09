import getMarkdownInDirectory from '../../utilities/markdown.js';
import { processPromotions } from '../../utilities/promotion';
import { adminContactsMap } from '../../utilities/contact';
const marked = require('marked');

const wysiwyg = ['description', 'activity', 'notes'];

let tours = getMarkdownInDirectory('content/paket-wisata/');
tours = tours.map(tour => 
    Object.assign(
        tour, 
        Object.fromEntries(wysiwyg.map(w => tour[w] ? [w, marked(tour[w], { breaks: true })] : []))
    ))
    .map(tour => {
        return {
            ...tour,
            promotions: processPromotions(tour.promotions || []),
            contact: adminContactsMap.get(tour.contact) || { phoneNumbers: [] },
            photos: tour.photos.map(p => {
                p.photoURI = p.photoURI.substring(p.photoURI.indexOf('images/'))
                return p;
            })
        };
    });
export const map = new Map(tours.map(tour => [tour.slug, tour]));

export function getRandom() {
    return [...map.values()].sort(() => Math.random() - 0.5);;
}

export const facilityIconMap = {
    'Makan': 'ic_eat.svg',
    'Fotografer': 'ic_camera.svg',
    'Transportasi': 'ic_car.svg',
    'Pemandu wisata lokal': 'ic_binocular.svg',
    'Penginapan': 'ic_house.svg',
    'Welcome drink': 'ic_drink.svg'
}

export default map;