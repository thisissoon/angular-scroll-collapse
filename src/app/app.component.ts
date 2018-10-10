import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Direction } from './scroll-collapse/shared/direction.enum';

@Component({
  selector: 'sn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  scrollDirectionHandler(event: Direction) {
    console.log('scrollDirection: ', event);
  }
  affixHandler(event: boolean) {
    console.log('affix: ', event);
  }
  minimiseHandler(event: boolean) {
    console.log('minimise: ', event);
  }
}
