export function iframeInsert(url) {
    const iframe = document.createElement('iframe');
    const URL = 'loopsmozat://' + url
    iframe.setAttribute('src', URL);
    iframe.style.height = 0;
    iframe.style.width = 0;
    iframe.style.position = 'absolute';
    iframe.style.zIndex = -1000;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    console.log('iframeInsert完毕=>%s', URL);
    // after 1000ms. remove the iframe to make it looks clean.
    setTimeout(function() {
        document.body.removeChild(iframe)
    }, 1000);
}

export function urlParse(){
    var hash = window.location.hash
    var url = window.location.search || hash.slice(hash.indexOf('?'));
    var obj = {};
    var reg = /[?&][^?&]+=[^?&]+/g;
    var arr = url.match(reg);
    if (arr) {
        arr.forEach(function(item){
            var tempArr = item.substring(1).split('=');
            var key = decodeURIComponent(tempArr[0]);
            var val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        })
    }
    return obj;
}

export function _di(name, id) {
    return function(obj){
        var params = obj||{};
        params.id = id||14225;
        params.ts = Date.now();
        var url = 'util/statistical?point=' + JSON.stringify(params);
        console.log(name, params)
        iframeInsert(url);
    }
}

export const eventTrack = {
    mcShopNow: _di('mc.shopnow', 41101),
}