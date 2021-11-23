import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ContentService} from '../../content.service';

@Component({
  selector: 'app-video-input',
  templateUrl: './video-input.component.html',
  styleUrls: ['./video-input.component.css']
})
export class VideoInputComponent implements OnInit, OnChanges {
  @Input() public video!: number;
  videoSource = '';

  constructor(public contentService: ContentService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.video){
      this.contentService.getPath(this.video).subscribe(path => {
        console.log(path);
        this.videoSource = path;
      });
    }
  }

}
