import { Component, EventEmitter, Input, Output } from '@angular/core';

export type Difficulty = 'easy' | 'mid' | 'hard' | 'advanced' | 'milenar';

@Component({
  selector: 'app-difficulty-selector',
  standalone: true,
  templateUrl: './difficulty-selector.html',
  styleUrl: './difficulty-selector.scss'
})
export class DifficultySelectorComponent {
  @Input({ required: true }) activeDifficulty: Difficulty = 'mid';
  @Output() readonly difficultyChange = new EventEmitter<Difficulty>();
  readonly options = [
    { value: 'easy' as Difficulty, label: 'Fácil' },
    { value: 'mid' as Difficulty, label: 'Médio' },
    { value: 'hard' as Difficulty, label: 'Difícil' },
    { value: 'advanced' as Difficulty, label: 'Avançado' },
    { value: 'milenar' as Difficulty, label: 'Milenar' },
  ];
}
