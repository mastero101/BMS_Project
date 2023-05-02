import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
})
export class MonitorComponent implements OnInit {
  watts: any;
  date2: any;
  all: any;
  kw: any;
  ampers: any;
  vrms: any;

  constructor() {}

  ngOnInit(): void {
    this.all = this.recoverAll();
  }

  public canvasWidth = 300;
  public needleValue = 70;
  public centralLabel = '%';
  public name = 'Voltage';
  public name2 = 'Voltage 2';
  public name3 = 'Voltage 3';
  public name4 = 'Voltage Total';
  public name5 = 'Watts';
  public options = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(44, 151, 222)', 'lightgray'],
    arcDelimiters: [70],
    rangeLabel: ['0', '100'],
    needleStartValue: 0,
  };

  recoverAll() {
    axios
      .get('http://132.145.206.61:3000/data')
      .then((response) => {
        this.all = response.data;
        this.watts = response.data[response.data.length - 1].watts;
        this.kw = response.data[response.data.length - 1].KWhr;
        this.ampers = response.data[response.data.length - 1].ampers;
        this.vrms = response.data[response.data.length - 1].vrms;
        const timestamp2 = response.data[response.data.length - 1].time;
        const date = new Date(parseInt(timestamp2) * 1000); // Multiplica por 1000 para obtener el valor en milisegundos
        const localTimeZone2 = new Intl.DateTimeFormat().resolvedOptions()
          .timeZone;
        this.date2 = date.toLocaleString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZone: localTimeZone2,
        });
        console.log(response.data);
        console.log(this.date2);
      })
      .catch((error) => {
        console.log();
      });
  }
}
