import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-components',
  templateUrl: './list-components.component.html',
  styleUrls: ['./list-components.component.scss']
})
export class ListComponentsComponent implements OnInit {
  selectedOption: string = "";
  selectedOption2: string = "";
  selectedOption3: string = "";
  selectedOption4: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
