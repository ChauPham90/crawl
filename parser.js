const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
const crawl = require('./pupperteer/crawl')

// exports.getData = async html => {
//   const $ = await cheerio.load(html);
//   let data = $("title").text()
//    //console.log(data)
//    return data
// };

exports.getHTMLContent = async url => {
   const browser = await puppeteer.launch({ headless: true });
   const page = await browser.newPage();
   await  page.goto(url)
   //const htmlPage = await page.evaluate(() => document.querySelector('*').outerHTML);
   const htmlPage = await page.evaluate(() => document.querySelectorAll("*", (anchor) => anchor.map(link => link. outerHTML || "")));

   return htmlPage
}

exports.getOpeningHour = async (htmlContent) => {
  // const browser = await puppeteer.launch({ headless: true });
  // const page = await browser.newPage();
  // await page.setContent(htmlContent);
  
  const filter = () => {
  //  const expected = [...document.querySelectorAll('*')].reduce((arr, e) => {

    const expected = htmlContent.reduce((arr, e) => {
      const childNodesText = [...e.childNodes].filter(e => e.nodeType === 3);
      
      if (childNodesText[0]) {
        arr.push(...childNodesText);
      }
  
      return arr;
    }, [])
    .map(e => e.nodeValue)
    .filter((e) => {
      if (e.length > 500) {
        return false;
      }
      const matchedValue = e.match(/((lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|lun|mar|mer|jeu|ven|sam|dim)|(\d{1,2}h\d{1,2}))/i);
       
      if (!matchedValue) {
        return false;
      }
      
      const prevValue = e[matchedValue.index - 1];
      const prevValueValid = !prevValue || /\s/.test(prevValue);
      const nextValue = e[matchedValue.index + matchedValue[0].length];
      const nextvValueValid = !nextValue || /\s/.test(nextValue);
 
 
      return prevValueValid && nextvValueValid;
   })
    return expected 
   }

  // const filter2 = (htmlContent) =>{
  //  // console.log(htmlContent)
  //  const expected = []
  //   const matchedValue = htmlContent.match(/.*\d{1,2}:\d{1,2}\s*.{1}\s\d{1,2}h?\d{1,2}(:|h)\d{1,2}.*/);
  //   if (!matchedValue) {
  //           return false;
  //         }
          
  //         const prevValue = htmlContent[matchedValue.index - 1];
  //         const prevValueValid = !prevValue || /\s/.test(prevValue);
  //         const nextValue = htmlContent[matchedValue.index + matchedValue[0].length];
  //         const nextvValueValid = !nextValue || /\s/.test(nextValue);
     
     
  //         // return prevValueValid && nextvValueValid;

  //     return    expected.push(matchedValue)
  // }
  //const data = await page.evaluate(filter)
  const data = filter()
  return data.join(' ')
}