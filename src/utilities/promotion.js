import { getDataFromFile } from "./markdown";

const promotionsData = getDataFromFile("data/promotion.yml");

const promotionsMap = promotionsData
                                .promotions
                                .reduce((map, promotion) => {
                                    let description = promotionsData.descriptions
                                                    .filter(d => d.promotion === promotion);
                                    description = description.length ? description[0].description : "";
                                    return map.set(promotion, {
                                        promotion,
                                        description 
                                    });
                                }, new Map());

export const promotions = [...promotionsMap.keys()];

export const processPromotions = (promotions) => promotions
                                                    .filter(promotion => promotionsMap.has(promotion))
                                                    .map(promotion => promotionsMap.get(promotion));