import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-widget-tray',
  templateUrl: './widget-tray.component.html',
  styleUrls: ['./widget-tray.component.css']
})
export class WidgetTrayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $( "#draggable-div" ).draggable({ revert: true });
  }

}
