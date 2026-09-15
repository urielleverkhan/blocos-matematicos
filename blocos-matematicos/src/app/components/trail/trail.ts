import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trail',
  standalone: true,
  templateUrl: './trail.html',
  styleUrl: './trail.scss'
})
export class TrailComponent {
  @Input({ required: true }) lines: string[] = [];
}
