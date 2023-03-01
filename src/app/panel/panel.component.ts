import { Component, OnInit } from '@angular/core';
import {
  getDatabase,
  ref,
  update,
  child,
  get,
  onValue,
} from 'firebase/database';

import 'firebase/database';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  voltage: any;
  voltagefix: any;
  voltage2: any;
  voltage3: any;
  voltagefix3: any;
  voltageTotal: any;
  orden: any;
  tipo: any;
  nombre: any;
  fechaC: any;
  fechaE: any;
  frase: any;

  constructor() {}

  ngOnInit( ): void {
    this.voltage = this.getValue();
    this.voltage2 = this.getValue();
    this.voltage3 = this.getValue();
    this.voltageTotal = this.getValue();
  }

  getValue() {
    const db = getDatabase();
    const starCountR = ref(db, '/UsersData/N5GOhtaSNhOkN2eXtA0sMhWss4I2/readings/Voltage');
    onValue(starCountR, (snapshot) => {
      this.voltage = Number(snapshot.val());
      this.voltagefix = (this.voltage).toFixed(2);
    });
    const starCountRe = ref(db, '/UsersData/N5GOhtaSNhOkN2eXtA0sMhWss4I2/readings/Voltage2');
    onValue(starCountRe, (snapshot) => {
      this.voltage2 = Number(snapshot.val());
    });
    const starCountRef = ref(db, '/UsersData/N5GOhtaSNhOkN2eXtA0sMhWss4I2/readings/Voltage3');
    onValue(starCountRef, (snapshot) => {
      this.voltage3 = Number(snapshot.val());
      this.voltagefix3 = (this.voltage3).toFixed(2);
      this.voltageTotal = (this.voltage+this.voltage2+this.voltage3).toFixed(2);
    });
    //const refs = db.ref('dinosaurs');
    //  refs.orderByChild('weight').limitToLast(2).on('child_added', (snapshot) => {
    //    console.log(snapshot.key);
    //  });
  }

  updateCompensation(){
    
  }

  reload() {
    window.location.reload();
  }

  public canvasWidth = 300;
  public needleValue = 70;
  public centralLabel = '%';
  public name = 'Voltage';
  public name2 = 'Voltage 2';
  public name3 = 'Voltage 3';
  name4 = 'Voltage Total'
  public options = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(44, 151, 222)', 'lightgray'],
    arcDelimiters: [70],
    rangeLabel: ['0', '100'],
    needleStartValue: 0,
  };
}
