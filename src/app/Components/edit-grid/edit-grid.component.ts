import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IGrid, IKeywords} from "../../Models/gird.model";
import {MatChipInputEvent} from "@angular/material/chips";
import {AppService} from "../../app.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-edit-grid',
    templateUrl: './edit-grid.component.html',
    styleUrls: ['./edit-grid.component.scss']
})
export class EditGridComponent implements OnInit, OnDestroy {
    keywords: IKeywords[] = [];
    displayError: boolean = false;
    errorMessage : string ="";
    removeKeywordSubscription: Subscription | undefined;
    addKeywordSubscription: Subscription | undefined;
    keywordsSubscription: Subscription | undefined;

    constructor(
        public dialogRef: MatDialogRef<EditGridComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IGrid,
        private appService: AppService
    ) {
    }

    ngOnInit(): void {
        this.getKeywordData();
    }

    getKeywordData() {
        if (this.keywordsSubscription) {
            this.keywordsSubscription.unsubscribe();
        }
        this.keywordsSubscription = this.appService.getKeywordsByDocId(this.data.documentId).subscribe((res:IGrid) => {
            this.keywords = res.keywords;
        });
    }

    addKeywordFromInput(event: MatChipInputEvent) {
        if (event.value) {
            if (this.addKeywordSubscription) {
                this.addKeywordSubscription.unsubscribe();
            }
            this.addKeywordSubscription = this.appService.creteNewKeyword({
                documentId: this.data.documentId,
                keyword: event.value
            }).subscribe(res => {
                this.getKeywordData();
                this.displayError = false;
                this.errorMessage="";
                event.chipInput!.clear();
            },errorResponse=>{
                debugger;
                this.displayError = true;
                this.errorMessage = errorResponse.error.message
            });
        }
    }

    removeKeyword(id: string) {
        if (this.removeKeywordSubscription) {
            this.removeKeywordSubscription.unsubscribe();
        }
        this.removeKeywordSubscription = this.appService.deleteKeyword(id).subscribe(res => {
            const index = this.keywords.findIndex(x => x.keywordId === id);
            this.keywords.splice(index, 1);
            this.displayError = false;
            this.errorMessage="";
        },errorResponse=>{
            this.displayError = true;
            this.errorMessage = errorResponse.error.message
        });
    }

    ngOnDestroy() {

        if (this.removeKeywordSubscription) {
            this.removeKeywordSubscription.unsubscribe();
        }
        if (this.addKeywordSubscription) {
            this.addKeywordSubscription.unsubscribe();
        }
        if (this.keywordsSubscription) {
            this.keywordsSubscription.unsubscribe();
        }
    }
}
