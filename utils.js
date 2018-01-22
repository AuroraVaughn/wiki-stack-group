module.exports = {}


function getFriendlyTitle(title) {
    let uriTitle = title.replace(/ /, '_')


    return uriTitle;
}


let x = getFriendlyTitle('d d d d d d d')
console.log(x);