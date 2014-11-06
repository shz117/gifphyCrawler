function getGifs ($) {
    var gifs = [];
    $('.hoverable-gif').each(function (index, gif) {
        var gifObj = {};
        $(gif).find('img').each(function(index, img){
            gifObj.src = $(img).attr('data-animated');
            gifObj.static_src = img.src;
        });
        gifObj.tags = [];
        $(gif).find('.tag').each(function(i,tag){
            gifObj.tags.push($(tag).text().substring(1));
        });
        gifs.push(gifObj);
    });
    return gifs;
}

module.exports = {
    getGifs: getGifs
}