import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EpubService} from '~/app/reader/epub.service';

@Component({
    selector: 'ns-reader',
    templateUrl: './reader.component.html',
    styleUrls: ['./reader.component.css'],
    moduleId: module.id,
})
export class ReaderComponent implements OnInit, AfterViewInit {

    @ViewChild('epubWebView') epubWebViewRef: ElementRef;
    toggleBottomNav = true;

    constructor(private epubService: EpubService) {
    }

    public ngOnInit(): void {
        this.epubService.epubWebView = this.epubWebViewRef.nativeElement;
    }

    ngAfterViewInit() {
        setTimeout(() => this.epubService.setupWebViewInterface(), 500);
    }

    onSwipe(event) {
        // console.log('swipe --->', event.direction);
        if (event.direction === 1) {
            this.epubService.previousPage();
        } else if (event.direction === 2) {
            this.epubService.nextPage();
        }
    }

    toggleNav() {
        this.toggleBottomNav = !this.toggleBottomNav;
    }
}
