const fs = require('fs');
const matter = require('gray-matter');
const marked = require('marked');

module.exports = function getMarkdownInDirectory(path) {
   return fs.readdirSync(path)
      .filter(filename => /\.md$/.test(filename))
      .map(filename => getMarkdownFromFile(path, filename));
}

function getMarkdownFromFile(path, filename) {
   const file = fs.readFileSync(`${path}${filename}`);
   const { data, content } = matter(file);

   const slug = filename.split('.')[0];
   const html = marked(content);

   return {
      ...data,
      slug,
      html
   }
}