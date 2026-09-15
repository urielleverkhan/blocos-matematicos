import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Difficulty } from '../difficulty-selector/difficulty-selector';
import { Mode } from '../mode-tabs/mode-tabs';
import { Counts, ShelfComponent } from '../shelf/shelf';
import { TrailComponent } from '../trail/trail';

type Place = keyof Counts;
const places: { key: Place; label: string; value: number }[] = [
  { key: 'units', label: 'unidade', value: 1 },
  { key: 'tens', label: 'dezena', value: 10 },
  { key: 'hundreds', label: 'centena', value: 100 },
  { key: 'thousands', label: 'milhar', value: 1000 }
];

@Component({
  selector: 'app-exercise',
  standalone: true,
  templateUrl: './exercise.html',
  imports: [ShelfComponent, TrailComponent],
  styleUrl: './exercise.scss'
})
export class ExerciseComponent implements OnChanges {
  @Input({ required: true }) mode: Mode = 'build';
  @Input({ required: true }) difficulty: Difficulty = 'mid';
  @Output() readonly starEarned = new EventEmitter<void>();

  build = { target: 0, counts: {} as Counts };
  addition = { a: 0, b: 0, digitsA: [] as number[], digitsB: [] as number[], result: [] as number[], carry: 0, step: 0 };
  subtraction = { a: 0, b: 0, minuend: [] as number[], digitsB: [] as number[], step: 0, borrowed: false };
  feedback = '';
  feedbackError = false;
  celebrationVisible = false;
  readonly celebrationStars = [0, 1, 2, 3, 4, 5, 6, 7];
  readonly buildPlaces = places;

  ngOnChanges(): void {
    this.feedback = '';
    if (this.mode === 'build') this.newBuild();
    if (this.mode === 'add') this.newAddition();
    if (this.mode === 'sub') this.newSubtraction();
  }

  get buildTotal(): number { return this.valueOf(this.build.counts); }
  get additionDone(): boolean { return this.addition.step >= this.addition.digitsA.length; }
  get additionCounts(): Counts {
    const counts = this.countsOf(this.addition.a + this.addition.b);
    if (this.addition.step === 0) return this.sumCounts(this.addition.a, this.addition.b);
    return this.countsFromDigits(this.addition.result.map((digit, index) => index < this.addition.step ? digit : (this.addition.digitsA[index] ?? 0) + (this.addition.digitsB[index] ?? 0)));
  }
  get additionLines(): string[] {
    const lines = [`${this.addition.a} + ${this.addition.b}`];
    for (let i = 0; i < this.addition.step; i++) lines.push(`${places[i].label}: ${this.addition.digitsA[i]} + ${this.addition.digitsB[i]}${i === 0 && this.addition.carry ? ' + 1' : ''} = ${this.addition.result[i]}`);
    if (this.additionDone) lines.push(`${this.addition.a} + ${this.addition.b} = ${this.valueOf(this.countsFromDigits(this.addition.result))}`);
    return lines;
  }
  get subtractionCounts(): Counts { return this.countsFromDigits(this.subtraction.minuend); }
  get subtractionLines(): string[] {
    const lines = [`Começamos com ${this.subtraction.a} − ${this.subtraction.b}`];
    if (this.subtraction.borrowed) lines.push('Trocamos uma unidade de ordem maior por 10 da ordem atual! ✨');
    if (this.subtraction.step > 0) lines.push(`Já resolvemos ${this.subtraction.step} ordem(ns)`);
    if (this.subtraction.step >= this.subtraction.minuend.length) lines.push(`${this.subtraction.a} − ${this.subtraction.b} = ${this.valueOf(this.countsFromDigits(this.subtraction.minuend))}`);
    return lines;
  }

  addPlace(place: Place): void {
    const current = this.build.counts[place] ?? 0;
    this.build.counts = { ...this.build.counts, [place]: current + 1 };
    this.normalizeBuild();
  }
  resetBuild(): void { this.build.counts = { units: 0, tens: 0 }; this.feedback = ''; }
  checkBuild(): void {
    this.feedbackError = this.buildTotal !== this.build.target;
    this.feedback = this.buildTotal === this.build.target ? 'Isso aí! Você montou certinho! 🎉' : this.buildTotal > this.build.target ? 'Passou um pouquinho! Tire alguns blocos.' : 'Quase lá! Ainda falta um pouco.';
    if (!this.feedbackError) {
      this.celebrate();
      this.starEarned.emit();
      setTimeout(() => this.newBuild(), 1000);
    }
  }
  joinAdditionPlace(): void {
    const index = this.addition.step;
    const sum = this.addition.digitsA[index] + this.addition.digitsB[index] + this.addition.carry;
    this.addition.result[index] = sum % 10;
    this.addition.carry = Math.floor(sum / 10);
    this.addition.step++;
    if (this.addition.step === this.addition.digitsA.length && this.addition.carry) this.addition.result.push(this.addition.carry);
  }
  nextAddition(): void { this.celebrate(); this.starEarned.emit(); this.newAddition(); }
  subtractPlace(): void {
    const index = this.subtraction.step;
    if (this.subtraction.minuend[index] < this.subtraction.digitsB[index]) this.borrow(index);
    this.subtraction.minuend[index] -= this.subtraction.digitsB[index];
    this.subtraction.step++;
  }
  nextSubtraction(): void { this.celebrate(); this.starEarned.emit(); this.newSubtraction(); }

  private borrow(index: number): void {
    let source = index + 1;
    while (source < this.subtraction.minuend.length && this.subtraction.minuend[source] === 0) source++;
    if (source >= this.subtraction.minuend.length) return;
    this.subtraction.minuend[source]--;
    for (let position = source - 1; position > index; position--) this.subtraction.minuend[position] += 9;
    this.subtraction.minuend[index] += 10;
    this.subtraction.borrowed = true;
  }
  private random(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min; }
  private range(): { min: number; max: number } {
    if (this.difficulty === 'easy') return { min: 2, max: 19 };
    if (this.difficulty === 'mid') return { min: 11, max: 59 };
    if (this.difficulty === 'hard') return { min: 22, max: 99 };
    if (this.difficulty === 'advanced') return { min: 100, max: 999 };
    return { min: 1000, max: 9999 };
  }
  private newBuild(): void { const range = this.range(); this.build = { target: this.random(range.min, range.max), counts: { units: 0, tens: 0 } }; this.feedback = ''; }
  newAddition(): void {
    const range = this.range(); const a = this.random(range.min, range.max); const b = this.random(range.min, Math.min(range.max, 9999 - a));
    const length = Math.max(String(a).length, String(b).length);
    this.addition = { a, b, digitsA: this.digitsOf(a, length), digitsB: this.digitsOf(b, length), result: Array(length).fill(0), carry: 0, step: 0 };
  }
  newSubtraction(): void {
    const range = this.range(); const a = this.random(range.min, range.max); const b = this.random(1, a - 1); const length = String(a).length;
    this.subtraction = { a, b, minuend: this.digitsOf(a, length), digitsB: this.digitsOf(b, length), step: 0, borrowed: false };
  }
  private digitsOf(value: number, length = String(value).length): number[] { return String(value).padStart(length, '0').split('').reverse().map(Number); }
  private countsOf(value: number): Counts { return this.countsFromDigits(this.digitsOf(value)); }
  private countsFromDigits(digits: number[]): Counts {
    const counts: Counts = { units: digits[0] ?? 0, tens: digits[1] ?? 0 };
    if (digits.length > 2) counts.hundreds = digits[2];
    if (digits.length > 3) counts.thousands = digits[3];
    return counts;
  }
  private sumCounts(a: number, b: number): Counts { return this.countsFromDigits(this.digitsOf(a).map((digit, index) => digit + (this.digitsOf(b)[index] ?? 0))); }
  private valueOf(counts: Counts): number { return (counts.units ?? 0) + (counts.tens ?? 0) * 10 + (counts.hundreds ?? 0) * 100 + (counts.thousands ?? 0) * 1000; }
  private normalizeBuild(): void {
    const total = this.buildTotal;
    this.build.counts = this.countsOf(total);
  }
  private celebrate(): void {
    this.celebrationVisible = true;
    setTimeout(() => this.celebrationVisible = false, 1100);
  }
}
