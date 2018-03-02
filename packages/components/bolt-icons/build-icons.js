const fs = require('fs-extra');
const globby = require('globby');
const uppercamelcase = require('uppercamelcase');
const path = require('path');
const cheerio = require('cheerio');
const prettier = require('prettier');
const SVGO = require('svgo');

const svgo = new SVGO({
  plugins: [
    {
      removeXMLNS: true,
    },
  ],
});

const rootDir = path.join(__dirname);
const buildDir = path.join(rootDir, 'src/icons');

/**
 * Transpile Icons
 * @param {array} icons
 * @returns {Promise<[{ id, fileName, location, icon}]>} - Returns an array of objects about each icon with props: id, fileName, location, & icon
 */
async function transpileIcons(icons) {
  await fs.mkdirp(buildDir);

  return Promise.all(icons.map(async (icon) => {
    // icons.forEach(async (i) => {
    const svg = await fs.readFile(icon, 'utf-8');
    const result = await svgo.optimize(svg);
    const optimizedSVG = result.data;
    const id = path.basename(icon, '.svg').replace(/ /g, '-');

    const $ = cheerio.load(optimizedSVG, {
      xmlMode: true,
    });

    const fileName = path.basename(icon).replace(/ /g, '-').replace('.svg', '.js');
    const location = path.join(buildDir, fileName);

    $('*').each((index, el) => {
      Object.keys(el.attribs).forEach((x) => {
        if (x === 'stroke') {
          $(el).attr(x, 'currentColor');
        }

        if (x === 'fill') {
          $(el).attr(x, 'currentColor');
        }
      });


      if (el.name === 'svg') {
        $(el).attr('otherProps', '...');
      }
      $(el).removeAttr('xmlns:xlink');

      if ($(el).attr('xlink:href')) {
        const xlinkHrefVal = $(el).attr('xlink:href');
        $(el).removeAttr('xlink:href');
        $(el).attr('xlinkHref', xlinkHrefVal);
      }
    });


    const element = `
const ${uppercamelcase(id)} = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    ${
      $('svg').toString()
        .replace(new RegExp('stroke="currentColor"', 'g'), 'stroke={color}')
        .replace('class="c-bolt-icon--background c-bolt-icon--circle-background"', 'class="c-bolt-icon--background c-bolt-icon--circle-background" fill="none"')
        .replace('d="M0 0h24v24H0z"', 'd="M0,64a64,64 0 1,0 128,0a64,64 0 1,0 -128,0" class="c-bolt-icon--background c-bolt-icon--circle-background" fill="none"')
        .replace(/width=".*?"/, 'width={size}')
        .replace(/height=".*?"/, 'height={size}')
        .replace('otherProps="..."', '{...otherProps}')
      }
  )
};
export default ${uppercamelcase(id)}
`;

    const component = prettier.format(element, {
      singleQuote: true,
      trailingComma: 'es5',
      bracketSpacing: true,
      parser: 'flow',
    });

    await fs.outputFile(location, component, 'utf-8');
    // Later when we call `const icons = await transpileIcons(iconPaths);` - `icons` will be an array of these objects:
    return {
      location,
      id,
      icon,
      fileName,
    };
  }));
}

function alphabetizeIconList(a, b) {
  if(a.id < b.id) return -1;
  if(a.id > b.id) return 1;
  return 0;
}

async function build() {
  try {
    const iconPaths = await globby(path.join(rootDir, 'src/svgs/**/*.svg'));
    await fs.remove(path.join(rootDir, 'src/icons')); // Clean folder
    await fs.outputFile(path.join(rootDir, 'src', 'index.js'), '', 'utf-8');
    const icons = await transpileIcons(iconPaths);
    const allExports = icons
      .sort(alphabetizeIconList) // we alphabetize the list so multiple compiles on same set doesn't result in a change that git notices
      .map(icon => `export ${uppercamelcase(icon.id)} from './icons/${icon.id}';`); // building up `export` lines
    allExports.push(''); // Adding empty item to end of array so file has empty line at bottom to conform to `.editorconfig`
    await fs.outputFile(
      path.join(rootDir, 'src', 'index.js'),
      allExports.join('\n'),
      'utf-8'
    );
    console.log(`Built ${iconPaths.length} icons.`);
  } catch (error) {
    console.error(error);
    console.error('Error trying to run "npm run build" for "@bolt/components-icons".');
    process.exitCode = 1;
  }
}

build();
