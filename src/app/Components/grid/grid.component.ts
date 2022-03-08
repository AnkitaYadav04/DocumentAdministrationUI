import {Component, OnDestroy, OnInit} from '@angular/core';
import {IGrid, IKeywords} from "../../Models/gird.model";
import {AppService} from "../../app.service";
import {MatDialog} from '@angular/material/dialog';
import {EditGridComponent} from "../edit-grid/edit-grid.component";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['id', 'product', 'keywords', 'edit'];
    dataSource: IGrid[] = [];
    gridDataSubscription: Subscription | undefined;

    constructor(private appService: AppService, private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getGridData('');
        this.appService.searchFilter$.subscribe(value => {
            this.getGridData(value);
        })

    }

    getGridData(value: string) {
        if (this.gridDataSubscription) {
            this.gridDataSubscription.unsubscribe();
        }
        this.gridDataSubscription = this.appService.getPosts(value).subscribe(res => {
            this.dataSource = res;
        })
    }

    openDialog(data: IGrid) {
        const dialogRef = this.dialog.open(EditGridComponent, {
            data: data,
            width: '60%',

        });
        dialogRef.afterClosed().subscribe(() => {
            this.getGridData('');
        });

    }

    getTooltipValue(keywords: any) {
        return keywords.map((i: { text: any; }) => i.text).join(', ');
    };

    ngOnDestroy() {
        if (this.gridDataSubscription) {
            this.gridDataSubscription.unsubscribe();
        }
    }
}
