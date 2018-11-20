import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import '../../node_modules/jquery-ui/ui/widgets/draggable.js';
import '../../node_modules/jquery-ui/ui/widgets/resizable.js';
import '../../node_modules/jquery-ui/ui/widgets/droppable.js';
import '../../node_modules/grid-list/src/gridList.js';
import '../../node_modules/grid-list/src/jquery.gridList.js';
import { AppComponent } from './app.component';
import { WidgetTrayComponent } from './widget-tray/widget-tray.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { WidgetComponent } from './widget/widget.component';

@NgModule({
  declarations: [
    AppComponent,
    WidgetTrayComponent,
    WorkspaceComponent,
    WidgetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
