const Hs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

const slugify = require('slugify');

//Files

//Blocking synchronous way
// const textin=fs.readFileSync("./txt/input.txt", 'utf-8')
// console.log(textin)

// const textOut= `This is what we know about the aocado : ${textin} .\n ${7+4}`;

// const text = fs.writeFileSync('./txt/output.txt' ,textOut);
// console.log (fs.readFileSync("./txt/output.txt", 'utf-8'))

//Non-blocing Asynchronous way

// Hs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if(err)throw err
//   Hs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     Hs.readFile('./txt/append.txt','utf-8',(err,data3)=>
//     {
//         console.log(data3);
//         Hs.writeFile('./txt/final.txt',`${data2}\n${data3},`,'utf-8',err=>{
//             if (err)throw err
//             console.log('file written successfully')
//         })
//     })
//   });
// });

// console.log('reading file.... ');

//SERVER

const tempOverview = Hs.readFileSync(
  `${__dirname}/templates/template_overview.html`,
  'utf-8'
);
const tempCard = Hs.readFileSync(
  `${__dirname}/templates/template_card.html`,
  'utf-8'
);

const tempProduct = Hs.readFileSync(
  `${__dirname}/templates/template_product.html`,
  'utf-8'
);
const data = Hs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //OVERVIEW PAGE
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join(' ');
    const output = tempOverview.replace('{%Product_cards%}', cardsHtml);
    res.end(output);
  }
  //PRODUCT PAGE
  else if (pathname === '/product') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  //API
  else if (pathname === '/api') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(data);
  }
  //NOT FOUND
  else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'My-own-header': 'hello-world',
    });

    res.end('<h1>OOPS Page not found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('server started at 8000');
});
