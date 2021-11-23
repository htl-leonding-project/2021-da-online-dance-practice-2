import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ContentService} from '../../content.service';

@Component({
  selector: 'app-audio-input',
  templateUrl: './audio-input.component.html',
  styleUrls: ['./audio-input.component.css']
})
export class AudioInputComponent implements OnInit, OnChanges {
  @Input() public audio!: number;
  audioSource = '';




  constructor(public contentService: ContentService) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.audio){
      this.contentService.getPath(this.audio).subscribe(path => {
        console.log(path);
        this.audioSource = path;
      });
    }
  }

}
