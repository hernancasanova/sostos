const conversions = [
  {
    from: /=/g,
    to: '%3D'
  },
  {
    from: /:/g,
    to: '%3A'
  },
  {
    from: /\//g,
    to: '%2F'
  },
  {
    from: /-/g,
    to: '%2D'
  },
  {
    from: /&/g,
    to: '%26'
  },
  {
    from: /#/g,
    to: '%23'
  },
  {
    from: /;/g,
    to: '%3B'
  },
  {
    from: /\+/g,
    to: '%2B'
  }
];
const PRE_URL = 'https://www.wiris.net/demo/editor/render.png?demo-image&centerbaseline=false&mml=';
const POST_URL = '&maxWidth=220px';
const fixImageUrl = url => {
  let urlFixed = url;
  conversions.forEach(conversion => {
    urlFixed = urlFixed.replace(conversion.from, conversion.to);
  });
  return urlFixed;
};
const mathMLToUrl = mathML => {
  console.log(`${PRE_URL}${fixImageUrl(encodeURI(mathML))}${POST_URL}`);
  return `${PRE_URL}${fixImageUrl(encodeURI(mathML))}${POST_URL}`;
};

export { mathMLToUrl };
