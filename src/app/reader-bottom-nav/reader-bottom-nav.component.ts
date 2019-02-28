import {Component, OnInit} from '@angular/core';
import {EpubService} from '~/app/reader/epub.service';

@Component({
    selector: 'ns-reader-bottom-nav',
    templateUrl: './reader-bottom-nav.component.html',
    styleUrls: ['./reader-bottom-nav.component.css'],
    moduleId: module.id,
})
export class ReaderBottomNavComponent implements OnInit {

    isNightMode = false;

    constructor(private epubService: EpubService) {
    }

    ngOnInit() {
    }

    selectTab(number: number) {
        console.log(`Selected tab ----> ${number}`);
    }

    navPage(value: number) {
        if (value === 0) {
            this.epubService.previousPage();
        } else {
            this.epubService.nextPage();
        }
    }

    toggleNightMode() {
        this.isNightMode = !this.isNightMode;
        const themeName = this.isNightMode ? 'dark' : 'light';
        this.epubService.setTheme(themeName);
    }
}
