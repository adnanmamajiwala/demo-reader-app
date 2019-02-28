(function () {
    'use strict';

    let webViewInterface = window.nsWebViewInterface;
    let book;
    let rendition;

    webViewInterface.on('loadBook', function (bookUrl) {
        webViewInterface.emit('log', 'Starting to initialize the book');
        let width = Math.max(document.body.offsetWidth, document.body.clientWidth, document.body.scrollWidth) - 50;
        let height = Math.max(document.body.offsetHeight, document.body.clientHeight, document.body.scrollHeight) - 75;

        webViewInterface.emit('log', {width: width, height: height});
        book = window.ePub(bookUrl);
        rendition = book.renderTo('book', {width: width, height: height});
        rendition.display();

        // rendition.themes.fontSize('12pt');
        // rendition.themes.register({'light': {'body': {'color': 'purple'}}});
        rendition.themes.register('dark', {'body': {'color': 'white', 'background-color': 'black'}});
        rendition.themes.register('light', {'body': {'color': 'black', 'background-color': 'white'}});
        // rendition.themes.select('light');
        // book.loaded.navigation.then(function (toc) {
        //     window.nsWebViewInterface.emit('log', 'toc---->');
        //     window.nsWebViewInterface.emit('log', toc);
        // }).catch(data => {
        //     window.nsWebViewInterface.emit('log', 'error toc---->');
        //     window.nsWebViewInterface.emit('log', data);
        // });

    });

    webViewInterface.on('theme', (data) => {
        rendition.themes.select(data);
        document.body.style.backgroundColor = data === 'dark' ? 'black' : 'white';
    });
    webViewInterface.on('nextPage', () => rendition.next());
    webViewInterface.on('previousPage', () => rendition.prev());

})();
