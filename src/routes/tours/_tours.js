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
tours = tours.map(tour => ({...tour, description: marked(tour.description)}))
export const map = new Map(tours.map(tour => [tour.slug, tour]));

export function getRandom() {
    return [...map.values()].sort(() => Math.random() - 0.5);;
}

export default map;