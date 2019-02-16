import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WebViewInterface} from 'nativescript-webview-interface';
import {isAndroid} from 'tns-core-modules/platform';
import {LoadEventData, WebView} from 'tns-core-modules/ui/web-view';

@Component({
    selector: 'ns-reader',
    templateUrl: './reader.component.html',
    styleUrls: ['./reader.component.css'],
    moduleId: module.id,
})
export class ReaderComponent implements OnInit, AfterViewInit {

    @ViewChild('epubWebView') epubWebViewRef: ElementRef;
    private webViewInterface: WebViewInterface;

    private get epubWebView() {
        return this.epubWebViewRef.nativeElement;
    }

    public ngOnInit(): void {
    }

    ngAfterViewInit() {
        setTimeout(() => this.setupWebViewInterface(), 500);
    }

    private setupWebViewInterface() {
        console.log('setup web views');
        const context = this;
        this.webViewInterface = new WebViewInterface(this.epubWebView, '~/app/reader/www/epub.html');

        this.webViewInterface.on('log', (arg) => console.log('log emitted -> ', arg));

        // load of webView.
        this.epubWebView.on(WebView.loadStartedEvent, (args: LoadEventData) => {
            context.onLoadStarted();
        });
        this.epubWebView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
            console.log('webview loaded');
            if (!args.error) {
                setTimeout(() => this.load_ePub(), 500);
            } else {
                console.error(args.error);
            }
        });
    }


    onLoadStarted() {
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
        }
    }

    load_ePub() {
        console.log('load finished2');
        const bookUrl = 'https://s3-us-west-2.amazonaws.com/pressbooks-samplefiles/MetamorphosisJacksonTheme/Metamorphosis-jackson.epub';
        this.webViewInterface.emit('loadBook', bookUrl);
    }

}
