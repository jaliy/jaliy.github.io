/**root font-size set*/
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
        html.style.fontSize = windowWidth / 6.4 + 'px';
        // 等价于html.style.fontSize = windowWidth / 640 * 100 + 'px';
        // 这个6.4就是根据设计稿的横向宽度来确定的，假如你的设计稿是750
		// 那么 html.style.fontSize = windowWidth / 7.5 + 'px';
    }, false);
})();