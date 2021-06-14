exports.goToPage= (html, page) =>{ return page.goto(html)}
exports.crapPage = (page, filter) => { return page.evaluate(filter)}
// exports.crapPage = (page, filter) => { return page.evaluate(filter)}