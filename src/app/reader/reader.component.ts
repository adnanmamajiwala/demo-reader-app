import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EpubService} from '~/app/reader/epub.service';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import {RadSideDrawer} from 'nativescript-ui-sidedrawer';
import Navigation, {NavItem} from 'epubjs/types/navigation';
import {DisplayedLocation} from 'epubjs/types/rendition';

@Component({
    selector: 'ns-reader',
    templateUrl: './reader.component.html',
    styleUrls: ['./reader.component.css'],
    moduleId: module.id,
})
export class ReaderComponent implements OnInit, AfterViewInit {

    @ViewChild('epubWebView') epubWebViewRef: ElementRef;
    @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;
    toggleBottomNav = true;
    drawer: RadSideDrawer;
    navItems: Array<NavItem>;
    displayedLocation: DisplayedLocation;

    constructor(private epubService: EpubService,
                private changeDetectionRef: ChangeDetectorRef) {
    }

    public ngOnInit(): void {
        this.epubService.epubWebView = this.epubWebViewRef.nativeElement;
    }

    ngAfterViewInit() {
        setTimeout(() => this.epubService.setupWebViewInterface(), 500);
        this.drawer = this.drawerComponent.sideDrawer;
        this.epubService.getNavigationObservable()
            .subscribe((nav: Navigation) => {
                this.navItems = !!nav ? nav.toc : new Array<NavItem>();
                this.changeDetectionRef.detectChanges();
            });
        this.epubService.getDisplayedLocationObservable()
            .subscribe((data) => {
                this.displayedLocation = !!data ? data : null;
                this.changeDetectionRef.detectChanges();
            });

        this.changeDetectionRef.detectChanges();
    }

    onSwipe(event) {
        if (event.direction === 1) {
            this.epubService.previousPage();
        } else if (event.direction === 2) {
            this.epubService.nextPage();
        }
    }

    navigateToChapter(url: string) {
        this.epubService.gotoChapter(url);
        this.drawer.closeDrawer();
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }

    get pageNumber(): string {
        const displayed = !!this.displayedLocation ? this.displayedLocation.displayed : null;
        return !!displayed ? 'Page '.concat(displayed.page.toString(), ' of ', displayed.total.toString()) : '';
    }

    get sectionNumber(): string {
        return !!this.displayedLocation ? 'Section ' + this.displayedLocation.index : '';
    }
}
