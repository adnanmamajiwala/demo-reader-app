(function () {
    'use strict';

    let webViewInterface = window.nsWebViewInterface;
    let book;

    function init() {
        webViewInterface.emit( 'log', 'Inside init initializing the nsWebViewInterface events');
        webViewInterface.on('loadBook', function (bookUrl) {
            try {
                webViewInterface.emit( 'log', 'Starting to initialize the book');
                book = ePub(bookUrl);
                book.renderTo('book').display()
                    .then((data) => {
                        webViewInterface.emit( 'log', 'Loading book over');
                        webViewInterface.emit( 'log', data);
                    })
                    .catch((er)=>{
                        webViewInterface.emit( 'log', 'Error Loading book');
                        webViewInterface.emit( 'log', er);
                    });

            } catch (e) {
                webViewInterface.emit( 'log', 'error while loading');
                webViewInterface.emit( 'log', e);
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
