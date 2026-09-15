import { Component, Input } from '@angular/core';

export type Counts = { units: number; tens: number; hundreds?: number; thousands?: number };

@Component({
  selector: 'app-shelf',
  standalone: true,
  templateUrl: './shelf.html',
  styleUrl: './shelf.scss'
})
export class ShelfComponent {
  @Input({ required: true }) counts: Counts = { tens: 0, units: 0 };
  get columns(): { label: string; count: number; kind: 'unit' | 'ten' | 'hundred' | 'thousand' }[] {
    const columns: { label: string; count: number; kind: 'unit' | 'ten' | 'hundred' | 'thousand' }[] = [
      { label: 'DEZENAS', count: this.counts.tens, kind: 'ten' },
      { label: 'UNIDADES', count: this.counts.units, kind: 'unit' }
    ];
    if (this.counts.hundreds !== undefined) columns.unshift({ label: 'CENTENAS', count: this.counts.hundreds, kind: 'hundred' as const });
    if (this.counts.thousands !== undefined) columns.unshift({ label: 'MILHARES', count: this.counts.thousands, kind: 'thousand' as const });
    return columns;
  }
  blocks(count: number): number[] { return Array.from({ length: count }); }
}
