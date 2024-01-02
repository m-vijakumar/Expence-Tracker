import { NgModule } from "@angular/core";
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import {VirtualScrollerModule } from 'primeng/virtualscroller'
import { CardModule} from 'primeng/card'
import {DividerModule} from 'primeng/divider'
import {SelectButtonModule} from 'primeng/selectbutton'
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import {AvatarModule} from 'primeng/avatar'
import { ScrollerModule } from 'primeng/scroller';
import { ContextMenuModule } from "primeng/contextmenu";
import { ChipModule } from 'primeng/chip';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';

const PrimengComponents = [
    ButtonModule,
    ChartModule,
    VirtualScrollerModule,
    CardModule,
    DividerModule,
    SelectButtonModule,
    CalendarModule,
    InputNumberModule,
    InputTextModule,
    DropdownModule,
    ToolbarModule,
    MenuModule,
    AvatarModule,
    ScrollerModule,
    ContextMenuModule,
    ChipModule,
    ToastModule,
    DialogModule,
    PasswordModule

]
@NgModule({

    imports: [PrimengComponents],
    exports: [PrimengComponents]
  })
  export class primengModule { }