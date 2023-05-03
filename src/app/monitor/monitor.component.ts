import { Component, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
  update: any;
  date3: any;
  wattsAll: any;
  kwAll: any;
  ampersAll: any;
  vrmsAll: any;
  data: any[] = []; // Aquí se almacenarán los datos recuperados de la API
  pageSize = 15; // El número de elementos a mostrar por página
  pageSizeOptions: number[] = [5, 10, 15, 30]; // Opciones de selección de tamaño de página
  pageIndex = 0; // El índice de la página actual

  constructor() {}
  
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.update = this.recoverUpdate();
    this.all = this.recoverAll();
  }

  public canvasWidth = 300;
  public needleValue = 70;
  public centralLabel = 'W';
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

  recoverUpdate() {
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

  recoverAll() {
  axios
    .get('http://132.145.206.61:3000/')
    .then((response) => {
      this.data = response.data;
      this.data = this.data.slice(-1440).map(item => {
        // Convertir el timestamp a una fecha/hora legible
        const date = new Date(item.time*1000);
        const readableDate = date.toLocaleString();
        // Devolver un objeto con el nuevo valor de fecha/hora
        return {
          KWhr: item.KWhr,
          ampers: item.ampers,
          watts: item.watts,
          time: readableDate
        };
      });
      console.log(this.data);
    })
    .catch((error) => {
      console.log(error);
    });
  const div = document.getElementById('gauges');
  if (div) {
    div.style.marginTop = '25em';
  }
}

  get pagedData(): any[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.data.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
  }
}
