const request = require('request-promise')
const parser = require('./parser') 


const fs = require('fs')

async function getHTML(url){
    const html = await request.get(url)
    return html
}

function saveHTML(html){
    fs.writeFileSync("__test__/mock/test1.html", html)
}

async function main(url){
    // const html = await getHTML(url)
    // saveHTML(html)
    //const data = await parser.getData(html)
    const htmlContent = await parser.getHTMLContent(url)
   //console.log(htmlContent)
    const openingHour = await parser.getOpeningHour(htmlContent)
    console.log("\n\n result: ", openingHour)
}


// main('https://www.chaudronnerie-autret.fr/')
// ===> result:  Du lundi au jeudi : 7:45 – 12:15 , 13:45 – 17:30 Le vendredi : 7:45 – 12:15, 13:45 – 15h15

// main('https://carlierfred.wixsite.com/website')
// ===> result: Venez nous rencontrer Lun - Ven : 9h - 18hSam : 10h - 14hDim : Fermé

// main('https://www.woodeal.fr/')
// ===> result: Du lundi au vendredide 8H30 à 12H00et de 13H30 à 18H00

// main('http://blanchisserie-des-alpes.fr')
// ===> result:  du lundi au vendredi 07:00 à 12:00 et 12:30 à 16:00

main('http://www.assistancetregor.com')
// ===> result: 