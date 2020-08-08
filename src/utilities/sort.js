export const prioritizePromo = (a, b) => {
    const promotionsA = a.promotions ? a.promotions : [];
    const promotionsB = b.promotions ? b.promotions : [];
    if(promotionsA.length > 0 === promotionsB.length > 0) return 0;
    else if(promotionsA.length) return -1;
    else return 1;
} 