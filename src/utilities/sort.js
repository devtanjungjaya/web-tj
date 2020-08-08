export const prioritizePromo = (a, b) => {
    const promotionsA = a.promotions ? a.promotions : [];
    const promotionsB = b.promotions ? b.promotions : [];
    if(promotionsA.length > 0 === promotionsB.length > 0) return 0;
    else if(promotionsA.length) return -1;
    else return 1;
}

export const prioritizePhoto = (a, b) => {
    const photosA = a.photos ? a.photos : [{photoURI: ""}];
    const photosB = b.photos ? b.photos : [{photoURI: ""}];
    if((photosA[0].photoURI !== '') === (photosB[0].photoURI !== '')) return 0;
    else if(photosA[0].photoURI) return -1;
    else return 1;
}