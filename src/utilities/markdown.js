const fs = require('fs');
const matter = require('gray-matter');
const crypto = require("crypto");
const cwd = process.cwd()
const path = require('path');
const marked = require('marked');
var glob = require('glob');  

export default function getMarkdownInDirectory(filePath) {
   filePath = path.join(cwd, filePath);
   return shuffleArray(glob.sync(filePath + '**/*.md').map(filename => getMarkdownFromFile(filename)));
}

function getMarkdownFromFile(filename) {
   const file = fs.readFileSync(filename);
   const { data, content } = matter(file);

   const slug = slugify(data.name, filename);
   const html = marked(content);

   return {
      ...data,
      slug,
      html
   }
}

export const getDataFromFile = function(filePath) {
   filePath = path.join(cwd, filePath);
   const file = fs.readFileSync(filePath);
   const { data } = matter(file);

   return data;
}

function slugify(name, identifier) {
   const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
   const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
   const p = new RegExp(a.split('').join('|'), 'g');
 
   return name.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
      .concat("-", crypto.createHash('sha256').update(identifier).digest('hex').slice(0, 8));
 }

export function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
   }
   return array;
}