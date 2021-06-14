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
    const html = await getHTML(url)
    saveHTML(html)
    //const data = await parser.getData(html)
    const htmlContent = await parser.getHTMLContent(url)
   //console.log(htmlContent)
    const openingHour = await parser.getOpeningHour(htmlContent)
    console.log(openingHour)
}

main('https://www.chaudronnerie-autret.fr/')