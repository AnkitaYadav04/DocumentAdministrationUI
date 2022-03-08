import {Component} from '@angular/core';
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DocumentAdministrationUI';
  keyWordQuery: string="";

  constructor(private appService: AppService) {
  }

  onSearch() {
    this.appService.setSearchFilter(this.keyWordQuery);
  }
}
