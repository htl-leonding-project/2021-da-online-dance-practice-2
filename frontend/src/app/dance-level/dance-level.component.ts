import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dance-level',
  templateUrl: './dance-level.component.html',
  styleUrls: ['./dance-level.component.css']
})
export class DanceLevelComponent implements OnInit {
  @Input() levelname!: string;

  name!: string;

  constructor() { }

  ngOnInit(): void {
    this.name = this.levelname;
  }

}
