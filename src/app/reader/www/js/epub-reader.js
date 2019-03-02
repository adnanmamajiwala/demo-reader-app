(function () {
    'use strict';

    let webViewInterface = window.nsWebViewInterface;
    let book;
    let rendition;
    let darkTheme = {'body': {'color': 'white', 'background-color': 'black'}};
    let lightTheme = {'body': {'color': 'black', 'background-color': 'white'}};

    webViewInterface.on('loadBook', function (bookUrl) {
        webViewInterface.emit('log', 'Starting to initialize the book');
        let width = Math.max(document.body.offsetWidth, document.body.clientWidth, document.body.scrollWidth) - 10;
        let height = Math.max(document.body.offsetHeight, document.body.clientHeight, document.body.scrollHeight) - 35;
        book = window.ePub(bookUrl);
        rendition = book.renderTo('book', {width: width, height: height});
        rendition.display().then(() => {
            webViewInterface.emit('displayedLocation', rendition.currentLocation().start);
        });

        rendition.themes.register('dark', darkTheme);
        rendition.themes.register('light', lightTheme);
        book.loaded.navigation.then((toc) => webViewInterface.emit('toc', toc));
    });

    webViewInterface.on('theme', (data) => {
        rendition.themes.select(data);
        document.body.style.backgroundColor = data === 'dark' ? 'black' : 'white';
    });

    webViewInterface.on('nextPage', () => {
        rendition.next().then(() => {
            webViewInterface.emit('displayedLocation', rendition.currentLocation().start);
        });
    });
    webViewInterface.on('previousPage', () => {
        rendition.prev().then(() => {
            webViewInterface.emit('displayedLocation', rendition.currentLocation().start);
        });
    });
    webViewInterface.on('navToChapter', (data) => {
        rendition.display(data).then(() => {
            webViewInterface.emit('displayedLocation', rendition.currentLocation().start);
        });
    });

})();
