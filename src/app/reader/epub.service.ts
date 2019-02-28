import {Injectable} from '@angular/core';
import {WebViewInterface} from 'nativescript-webview-interface';
import {LoadEventData, WebView} from 'tns-core-modules/ui/web-view';
import {isAndroid, isIOS} from 'tns-core-modules/platform';
import * as fs from 'tns-core-modules/file-system';

@Injectable({
    providedIn: 'root'
})
export class EpubService {

    private _epubWebView;
    private webViewInterface: WebViewInterface;

    constructor() {
    }

    set epubWebView(webView) {
        this._epubWebView = webView;
    }

    get epubWebView() {
        return this._epubWebView;
    }

    nextPage() {
        this.webViewInterface.emit('nextPage', null);
    }

    previousPage() {
        this.webViewInterface.emit('previousPage', null);
    }

    setTheme(themeName: string) {
        this.webViewInterface.emit('theme', themeName);
    }

    setupWebViewInterface() {
        console.log('setup web views');
        const context = this;
        this.webViewInterface = new WebViewInterface(this.epubWebView, '~/app/reader/www/epub.html');

        this.webViewInterface.on('log', (arg) => console.log('log emitted -> ', arg));

        // load of webView.
        this.epubWebView.on(WebView.loadStartedEvent, (args: LoadEventData) => context.onLoadStarted());
        this.epubWebView.on(WebView.loadFinishedEvent,
            (args: LoadEventData) => !args.error ? context.load_ePub() : console.error(args.error)
        );

    }

    private onLoadStarted() {
        if (isAndroid) {
            const settings = this.epubWebView.android.getSettings();
            settings.setAllowFileAccessFromFileURLs(true);
            settings.setAllowUniversalAccessFromFileURLs(true);
            settings.setBuiltInZoomControls(false);
            settings.setDisplayZoomControls(false);
            settings.setLoadWithOverviewMode(true);
            // settings.setUseWideViewPort(true);
            settings.setJavaScriptEnabled(true);
            settings.setAllowFileAccess(true);
            settings.setAllowContentAccess(true);
        } else if (isIOS) {
            console.log(this.epubWebView.ios.configuration.preferences);
        }
    }

    private load_ePub() {
        let bookUrl = 'https://s3-us-west-2.amazonaws.com/pressbooks-samplefiles/MetamorphosisJacksonTheme/Metamorphosis-jackson.epub';
        console.log('bookUrl -----> ', bookUrl);
        if (isIOS) {
            const webViewSRC: string = encodeURI(fs.knownFolders.currentApp().path);
            bookUrl = webViewSRC + '/app/reader/www/books/moby-dick.epub';
            console.log('bookUrl for IOS -----> ', bookUrl);
        }

        this.webViewInterface.emit('loadBook', bookUrl);
    }
}
