(function () {
    'use strict';

    let webViewInterface = window.nsWebViewInterface;
    let book;

    console.log('initializing the nsWebViewInterface events');

    function init() {
        console.log('initializing the nsWebViewInterface events');

        webViewInterface.on('loadBook', function (bookUrl) {
            try {
                console.log('Starting to initialize the book');
                book = ePub(bookUrl);
                book.renderTo('book').display();
                console.log('load completed');

            } catch (e) {
                console.error(e);
            }
        });

        webViewInterface.on('nextPage', function () {
            book.nextPage();
        });

        webViewInterface.on('previousPage', function () {
            book.prevPage();
        })
    }

    init();
})();
