import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as fs from 'tns-core-modules/file-system';
import {WebViewInterface} from 'nativescript-webview-interface';
import {WebView} from 'tns-core-modules/ui/web-view';

@Component({
    selector: 'ns-reader',
    templateUrl: './reader.component.html',
    styleUrls: ['./reader.component.css'],
    moduleId: module.id,
})
export class ReaderComponent implements OnInit {

    @ViewChild('epubWebView') epubWebViewRef: ElementRef;
    private webViewInterface: WebViewInterface;

    private get epubWebView(): WebView {
        return this.epubWebViewRef.nativeElement;
    }

    public ngOnInit(): void {
        this.configureBookWebView();
        this.webViewInterface = new WebViewInterface(this.epubWebView, '~/app/reader/www/epub.html');
        this.epubWebView.on(WebView.loadFinishedEvent, () => {
            this.webViewInterface.emit('loadBook', 'moby-dick.epub');
            // this.webViewInterface.emit('loadBook', 'https://s3-us-west-2.amazon
            // aws.com/pressbooks-samplefiles/MetamorphosisJacksonTheme/Metamorphosis-jackson.epub');
        });

        // const book = ePub.default('~/assets/sample.epub');
        // const rendition = book.renderTo('area', {});
        // const displayed = rendition.display();
        this.printFs('app/reader/www');
    }

    private configureBookWebView(): void {
        console.log('settings -->', this.epubWebView.android);
        const settings = this.epubWebView.android.getSettings();
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
    }


    printFs(path) {
        fs.knownFolders.currentApp().getFolder(path).getEntities()
            .then(value => {
                value.forEach(data => {
                    if (fs.knownFolders.currentApp().getFolder(data.name).isKnown) {
                        console.log('isKnown ----> ', data.name);
                    } else {
                        console.log('else ----> ', data);
                    }
                });

            });
    }

}
