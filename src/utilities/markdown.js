const fs = require('fs');
const matter = require('gray-matter');
const crypto = require("crypto");
const cwd = process.cwd()
const path = require('path');
const marked = require('marked');

export default function getMarkdownInDirectory(filePath) {
   filePath = path.join(cwd, filePath);
   return fs.readdirSync(filePath)
      .filter(filename => /\.md$/.test(filename))
      .map(filename => getMarkdownFromFile(filePath, filename));
}

function getMarkdownFromFile(path, filename) {
   const file = fs.readFileSync(path + filename);
   const { data, content } = matter(file);

   const slug = slugify(data.name);
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

function slugify(string) {
   const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
   const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
   const p = new RegExp(a.split('').join('|'), 'g');
 
   return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
   //   .concat("-", Math.floor(1000 + Math.random() * 9000));
      .concat("-", crypto.randomBytes(2).toString('hex'));
 }