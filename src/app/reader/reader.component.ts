import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WebViewInterface} from 'nativescript-webview-interface';
import {isAndroid} from 'tns-core-modules/platform';

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

    onLoadFinished(args) {
        console.log('load finished2');
        console.log(args.errors);
        this.webViewInterface = new WebViewInterface(this.epubWebView, '~/app/reader/www/epub.html');
        const bookUrl = 'https://s3-us-west-2.amazonaws.com/pressbooks-samplefiles/MetamorphosisJacksonTheme/Metamorphosis-jackson.epub';
        this.webViewInterface.emit('loadBook', bookUrl);
    }

}
