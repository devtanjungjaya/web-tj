import { getDataFromFile } from "./markdown";

const adminContactsData = getDataFromFile("data/contact-admin.yml");

export const adminContactsMap = adminContactsData
                                .admins
                                .reduce((map, admin) => {
                                    let contact = adminContactsData.contacts
                                                    .filter(d => d.admin === admin);
                                    contact = contact.length ? contact[0].contacts : {};
                                    return map.set(admin, contact);
                                }, new Map());