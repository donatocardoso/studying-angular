import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlertStore } from './alert.store';

export const Alert = new AlertStore();

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  show = Alert.select((state) => state.show);
  variant = Alert.select((state) => state.variant);
  message = Alert.select((state) => state.message);

  constructor() {}

  Hide = () => Alert.Hide();
}
