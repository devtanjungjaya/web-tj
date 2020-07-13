import getMarkdownInDirectory from '../../utilities/markdown.js';
import formatRupiah from "../../utilities/currency";
const path = require('path');
const marked = require('marked');
const cwd = process.cwd()

let tours = getMarkdownInDirectory(path.join(cwd, 'content/tours/'));
tours = tours.map(tour => ({
    ...tour,
    prices: tour.prices.map(price => ({
        ...price, 
        value: formatRupiah(price.value)
    }))
}))
tours = tours.map(tour => ({
    ...tour, 
    description: marked(tour.description),
    activity: tour.activity ? marked(tour.activity) : null
}))
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