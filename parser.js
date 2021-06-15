const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const crawl = require('./pupperteer/crawl');

// exports.getData = async html => {
//   const $ = await cheerio.load(html);
//   let data = $("title").text()
//    //console.log(data)
//    return data
// };

exports.getHTMLContent = async (url) => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36');
	await page.goto(url);

	const htmlPage = await page.evaluate(() => document.querySelector('*').outerHTML);
	await browser.close();
	return htmlPage;
};

// exports.getOpeningHour = async (htmlContent) => {
// 	const browser = await puppeteer.launch({ headless: true });
// 	const page = await browser.newPage();
// 	await page.setContent(htmlContent);
//   console.log("not use array from", htmlContent, typeof htmlContent)

// 	const filter = async () => {
// 		// console.log('\n\n\n document content', [...document.querySelectorAll('*')]);

// 		//   const expected =  [...document.querySelectorAll('*')].reduce((arr, elm) => {
// 		//     const childNodesText = [...elm.childNodes].filter(elm => elm.nodeType === 3);

// 		//     if (childNodesText[0]) {
// 		//       arr.push(...childNodesText);
// 		//     }

// 		//     return arr;
// 		//   }, [])
// 		//   .map(e => e.nodeValue)
// 		//   .filter((elm) => {
// 		//     if (elm.length > 500) {
// 		//       return false;
// 		//     }
// 		//     const matchedValue = elm.match(/((lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|lun|mar|mer|jeu|ven|sam|dim)|(\d{1,2}h\d{1,2}))/i);

// 		//     if (!matchedValue) {
// 		//       return false;
// 		//     }

// 		//     const prevValue = elm[matchedValue.index - 1];
// 		//     const prevValueValid = !prevValue || /\s/.test(prevValue);
// 		//     const nextValue = elm[matchedValue.index + matchedValue[0].length];
// 		//     const nextvValueValid = !nextValue || /\s/.test(nextValue);

// 		//     return prevValueValid && nextvValueValid;
// 		//  })
// 		//   return expected
// 		//  }
// 		// const expected = await [...new Set(Array.from(htmlContent, (elm) => elm.innerText).map(elm => elm.replace(/[\r\n\t]/g, "").trim() ))]
// 		const expected = await [...new Set(Array.from(document.querySelectorAll("*"), (elm) => elm.innerText))]
// 			.filter((elm) => {
//         // console.log("\n\n\nelm: ", elm)
// 				const matchedValue = elm.match(/((lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|lun|mar|mer|jeu|ven|sam|dim)|(\d{1,2}h\d{1,2}))/gi);

// 				if (!matchedValue) {
// 					return false;
//         }

// 	        const prevValue = htmlContent[matchedValue.index - 1];
// 	        const prevValueValid = !prevValue || /\s/.test(prevValue);
// 	        const nextValue = htmlContent[matchedValue.index + matchedValue[0].length];
// 	        const nextvValueValid = !nextValue || /\s/.test(nextValue);

// 	        return prevValueValid && nextvValueValid;
// 			});
// 		return expected;
// 	};

// 	// const filter2 = (htmlContent) =>{
// 	//  // console.log(htmlContent)
// 	//  const expected = []
// 	//   const matchedValue = htmlContent.match(/.*\d{1,2}:\d{1,2}\s*.{1}\s\d{1,2}h?\d{1,2}(:|h)\d{1,2}.*/);
// 	//   if (!matchedValue) {
// 	//           return false;
// 	//         }

// 	//         const prevValue = htmlContent[matchedValue.index - 1];
// 	//         const prevValueValid = !prevValue || /\s/.test(prevValue);
// 	//         const nextValue = htmlContent[matchedValue.index + matchedValue[0].length];
// 	//         const nextvValueValid = !nextValue || /\s/.test(nextValue);

// 	//         // return prevValueValid && nextvValueValid;

// 	//     return    expected.push(matchedValue)
// 	// }
// 	const data = await page.evaluate(filter)
// 	// const data = await filter();
//   console.log("get data",data)
// 	return data.join(' ');
// };

exports.getOpeningHour = async (htmlContent) => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.setContent(htmlContent);
  try {
    const htmlPage = await page.evaluate(() => 
    [...new Set(
      Array.from(document.querySelectorAll('*'), 
      (elm) => elm.innerText?.replace(/[\r\n\t]/g, ''))
    )]
  );

	let expected = htmlPage.filter((elm) => {
		const regex = /((?:du |le )?(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|lun|mar|mer|jeu|ven|sam|dim)|(\d{1,2}h\d{1,2}))/gi;
		const matchedValue = elm?.match(regex);

		if (elm?.length < 100 && matchedValue ) {
			return elm.search(regex) === 0 && elm;
		}
	});

	expected = expected.filter((val) => expected.indexOf(val) && expected.lastIndexOf(val));
	return expected.join(' ');
  } catch (error) {
    return error;
  }
	
};
