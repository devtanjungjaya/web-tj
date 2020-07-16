import getMarkdownInDirectory from '../../utilities/markdown.js';
const marked = require('marked');

const wysiwyg = ['description', 'activity'];

let tours = getMarkdownInDirectory('content/tours/');
tours = tours.map(tour => 
    Object.assign(tour, Object.fromEntries(wysiwyg.map(w => tour[w] ? [w, marked(tour[w])] : []))))
export const map = new Map(tours.map(tour => [tour.slug, tour]));

export function getRandom() {
    return [...map.values()].sort(() => Math.random() - 0.5);;
}

export const facilityIconMap = {
    'Makan siang': 'ic_eat.svg',
    'Fotografer': 'ic_camera.svg',
    'Transportasi': 'ic_car.svg',
    'Pemandu wisata': 'ic_binocular.svg'
}

export default map;