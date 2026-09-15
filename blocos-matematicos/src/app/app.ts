import { Component, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header';
import { Mode, ModeTabsComponent } from './components/mode-tabs/mode-tabs';
import { Difficulty, DifficultySelectorComponent } from './components/difficulty-selector/difficulty-selector';
import { ExerciseComponent } from './components/exercise/exercise';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ModeTabsComponent, DifficultySelectorComponent, ExerciseComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly mode = signal<Mode>('build');
  readonly difficulty = signal<Difficulty>('mid');
  readonly stars = signal(0);

  setMode(mode: Mode): void {
    this.mode.set(mode);
  }

  setDifficulty(difficulty: Difficulty): void {
    this.difficulty.set(difficulty);
  }

  awardStar(): void {
    this.stars.update((value) => value + 1);
  }
}
