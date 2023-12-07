import { NgModule } from "@angular/core";
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import {VirtualScrollerModule } from 'primeng/virtualscroller'
import { CardModule} from 'primeng/card'
import {DividerModule} from 'primeng/divider'
const PrimengComponents = [
    ButtonModule,
    ChartModule,
    VirtualScrollerModule,
    CardModule,
    DividerModule
]
@NgModule({

    imports: [PrimengComponents],
    exports: [PrimengComponents]
  })
  export class primengModule { }