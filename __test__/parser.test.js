/**

@jest-environment jsdom
*/


const parser = require('../parser')
const fs = require('fs')
const path = require('path');
const crawl = require('../pupperteer/crawl');
const myMock = jest.fn();
const cheerio = require("cheerio");

const { beforeAll, it } = require('@jest/globals')

let html ;

beforeAll(async ()=>{
    html = fs.readFileSync(path.resolve(__dirname, 'mock/test.html'),'utf8')
    html1 = fs.readFileSync(path.resolve(__dirname, 'mock/test1.html'),'utf8')
 })

// it('should return correct "Pâtisserie | Le Chardon Bleu | Tartes - Entremets - Mousses"', async  ()=>{
//     const result = await parser.getData(html)
//     expect(result).toBe("Pâtisserie | Le Chardon Bleu | Tartes - Entremets - Mousses")
// })


it('should return correct openingHour', async ()=>{
    // crawl.goToPage = function(){
    //   return  fs.readFileSync(path.resolve(__dirname, 'mock/test1.html'))
    // }
    
    // crawl.crapPage =  function(){
    //     const $ = cheerio.load(html1);
    //     const expected =[ ...$("*")].reduce((arr, e) => {
    //       const childNodesText = [... e.childNodes].filter(e => $(e).children())
    //       if (childNodesText[0]) {
    //         arr.push(...childNodesText);
    //       }
    //       return arr;
    //     }, [])
    //     .map(e => $(e).text().trim('/n/s\t '))
    //      .filter((e) => {
    //         if (e.length > 200) {
    //           return false;
    //         }
    //         const matchedValue = e.match(/((lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|lun|mar|mer|jeu|ven|sam|dim)|(\d{1,2}h\d{1,2}))/i);
             
    //         if (!matchedValue) {
    //           return false;
    //         }
            
    //         const prevValue = e[matchedValue.index - 1];
    //         const prevValueValid = !prevValue || /\s/.test(prevValue);
    //         const nextValue = e[matchedValue.index + matchedValue[0].length];
    //         const nextvValueValid = !nextValue || /\s/.test(nextValue);
       
       
    //         return prevValueValid && nextvValueValid;
    //     })
    //    console.log(expected[0])

    //       return expected[0] 
    //      }

//    crawl.crapPage = myMock.mockReturnValue([
//     'Mardi :  9h -13h et de 14h -17h00',
//     'Mercredi : 9h – 13h et de 14h- 17h00',
//     'Jeudi : 9h -13h et de 14h -17h00',
//     'Vendredi : 9h -13h et de 14h -17h00',
//     'Samedi : de 9h -17h00 (sans interruption)'
//   ])
    
    const result = await parser.getOpeningHour(html1)
    
   expect(result).toBe("Du lundi au jeudi : 7:45 – 12:15 , 13:45 – 17:30 Le vendredi : 7:45 – 12:15, 13:45 – 15h15")
})

jest.setTimeout(30000);