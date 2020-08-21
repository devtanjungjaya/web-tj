const fs = require('fs');
const glob = require('tiny-glob');
const matter = require('gray-matter');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const cloudinaryImages = JSON.parse(fs.readFileSync('scripts/cloudinaryImages.json'));
const cloudinaryImagesBase = cloudinaryImages.map(c => c.split('.')[0]);

function oneSuccess(promises){
    return Promise.all(promises.map(p => {
      return p.then(
        val => Promise.reject(val),
        err => Promise.resolve(err)
      );
    })).then(
      errors => Promise.reject(errors),
      val => Promise.resolve(val)
    );
}

async function findCloudinary(string) {
    return await oneSuccess(cloudinaryImagesBase.map(async (c, i) => {
        if(c.includes(string)) return Promise.resolve(cloudinaryImages[i]);
        else return Promise.reject();
    }));
}

(async function() {
    let files = await glob('content/**/*.md');
    await Promise.all(files.map(async f => {
        const content = await readFile(f, 'utf8');
        const { data } = matter(content);
        const imgUrls = data.photos.map(p => p.photoURI);
        const map = new Map();
        await Promise.all(imgUrls.map(async imgUrl => {
            const imgName = imgUrl.split('/').pop().split('.')[0];
            const cloudinary = await findCloudinary(imgName);
            map.set(imgUrl, cloudinary);
        }));
        let re = new RegExp([...map.keys()].join("|"),"g");
        const result = content.replace(re, function(matched){
            return map.get(matched);
        });
        await writeFile(f, result, 'utf8');
    }));
})();