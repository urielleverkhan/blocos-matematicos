import { Component, EventEmitter, Input, Output } from '@angular/core';

export type Counts = { units: number; tens: number; hundreds?: number; thousands?: number; carryTens?: number; carryHundreds?: number };

@Component({
  selector: 'app-shelf',
  standalone: true,
  templateUrl: './shelf.html',
  styleUrl: './shelf.scss'
})
export class ShelfComponent {
  @Input({ required: true }) counts: Counts = { tens: 0, units: 0 };
  @Input() interactive = false;
  @Input() operationLayout = false;
  @Input() buildLayout = false;
  @Input() subtractionLayout = false;
  @Output() readonly blockRemoved = new EventEmitter<Exclude<keyof Counts, 'carryTens' | 'carryHundreds'>>();
  get columns(): { label: string; count: number; kind: 'unit' | 'ten' | 'hundred' | 'thousand'; carry?: number; carryClass?: boolean }[] {
    const columns: { label: string; count: number; kind: 'unit' | 'ten' | 'hundred' | 'thousand'; carry?: number; carryClass?: boolean }[] = [
      { label: 'DEZENAS', count: this.counts.tens, kind: 'ten', carry: this.counts.carryTens },
      { label: 'UNIDADES', count: this.counts.units, kind: 'unit' }
    ];
    if (this.counts.hundreds !== undefined || this.counts.carryHundreds) {
      columns.unshift({
        label: 'CENTENAS',
        count: (this.counts.hundreds ?? 0) + (this.counts.carryHundreds ?? 0),
        kind: 'hundred',
        carry: this.counts.carryHundreds,
        carryClass: true
      });
    }
    if (this.counts.thousands !== undefined) columns.unshift({ label: 'MILHARES', count: this.counts.thousands, kind: 'thousand' as const });
    return columns;
  }
  blocks(count: number): number[] { return Array.from({ length: count }); }
  remove(kind: 'unit' | 'ten' | 'hundred' | 'thousand'): void {
    if (!this.interactive) return;
    const place = { unit: 'units', ten: 'tens', hundred: 'hundreds', thousand: 'thousands' }[kind] as Exclude<keyof Counts, 'carryTens' | 'carryHundreds'>;
    this.blockRemoved.emit(place);
  }
}
