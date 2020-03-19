import { Component } from '@angular/core';
import { Child } from '../interfaces/child.interface';
import { ChildrenService } from '../services/children.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public children: Array<Child> = [];
  private choresByChild: Array<string> = [];

  constructor(private childrenService: ChildrenService) { }

  ionViewDidEnter() {
    this.refresh();
  }

  private compareSets(setA: Array<string>, setB: Array<string>) {
    return setA.every( e => setB.includes(e) )
  }
  private arraysEqual(a: Array<string>, b: Array<string>) {
    return a.length === b.length && a.every((el, ix) => el === b[ix]);
  }

  refresh() {
    this.childrenService.getAll().then((children: Array<Child>) => {
      let newChoresByChild: Array<string> = [];
      children.forEach((child) => {
        child.chores.forEach((chore) => {
          if (!chore.complete)
            newChoresByChild.push(child.id + ":" + chore.id);
        });
      });

      console.log(newChoresByChild);
      console.log(this.choresByChild);
      console.log(this.arraysEqual(newChoresByChild, this.choresByChild));
      
      if (!this.arraysEqual(newChoresByChild, this.choresByChild)) {
        console.log("Updating dashboard");
        console.log("this.chore ")
        this.children = children;
        this.choresByChild = newChoresByChild;
      } else {
        console.log("No need to update dashboard");
      }

      setTimeout(() => {
        this.refresh();
      }, 3000);
    });
  }

}
