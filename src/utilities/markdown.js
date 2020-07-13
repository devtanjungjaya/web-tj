const fs = require('fs');
const matter = require('gray-matter');
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

   const slug = filename.split('.')[0];
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