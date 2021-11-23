import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DanceLevelComponent} from './dance-level/dance-level.component';
import {DanceCourseComponent} from './dance-course/dance-course.component';
import {ContentComponent} from './content/content.component';
import {LevelWrapperComponent} from './level-wrapper/level-wrapper.component';
import {CourseWrapperComponent} from './course-wrapper/course-wrapper.component';

const routes: Routes = [
  { path: 'level-wrapper', component: LevelWrapperComponent },
  { path: 'course-wrapper', component: CourseWrapperComponent },
  { path: 'content-component', component: ContentComponent },
  { path: '', component: DanceLevelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
