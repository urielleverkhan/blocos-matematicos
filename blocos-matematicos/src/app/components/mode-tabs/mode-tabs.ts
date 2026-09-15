import { Component, EventEmitter, Input, Output } from '@angular/core';

export type Mode = 'build' | 'add' | 'sub';

@Component({
  selector: 'app-mode-tabs',
  standalone: true,
  templateUrl: './mode-tabs.html',
  styleUrl: './mode-tabs.scss'
})
export class ModeTabsComponent {
  @Input({ required: true }) activeMode: Mode = 'build';
  @Output() readonly modeChange = new EventEmitter<Mode>();
  readonly tabs = [
    { mode: 'build' as Mode, icon: '🧱', label: 'Montar' },
    { mode: 'add' as Mode, icon: '➕', label: 'Somar' },
    { mode: 'sub' as Mode, icon: '➖', label: 'Subtrair' }
  ];
}
