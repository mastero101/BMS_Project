import { Component, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { MatSort } from '@angular/material/sort';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
})
export class MonitorComponent implements OnInit {
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
  data: any[] = [];
  pageSize = 15;
  pageSizeOptions: number[] = [15, 30, 60, 120];
  pageIndex = 0;
  kwhr: any;
  public chart: any;
  public watts = 0;

  constructor() {}

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.update = this.recoverUpdate();
    this.all = this.recoverAll();
    this.kwhr = this.recoverKwhr();
    this.createChart();
    setInterval(() => {
      this.recoverUpdate();
    }, 5000);
  }

  public canvasWidth = 300;
  public needleValue = 0;
  public centralLabel = 'W';
  public name = 'Watts';
  public options = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(44, 151, 222)', 'lightgray'],
    arcDelimiters: [0],
    rangeLabel: ['0', '500'],
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
        // Actualizar el valor de watts
        this.options.arcDelimiters = [this.watts/5];
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
        this.data = this.data
          .slice(-1440)
          .map((item) => {
            // Convertir el timestamp a una fecha/hora legible
            const date = new Date(item.time * 1000);
            const readableDate = date.toLocaleString();
            // Devolver un objeto con el nuevo valor de fecha/hora
            return {
              KWhr: item.KWhr,
              ampers: item.ampers,
              watts: item.watts,
              time: readableDate,
            };
          })
          .reverse();
        console.log(this.data);
        // Actualizar la propiedad 'data' del objeto 'this.chart'
      const chartData = {
        labels: this.data.map(item => item.time),
        datasets: [
          {
            label: 'Watts',
            data: this.data.map(item => item.watts),
            backgroundColor: 'blue',
          },
        ],
      };
      this.chart.data = chartData;
      this.chart.update();
      })
      .catch((error) => {
        console.log(error);
      });
    const div = document.getElementById('gauges');
    if (div) {
      div.style.marginTop = '56em';
    }
  }

  recoverKwhr() {
    axios
      .get('http://132.145.206.61:3000/kwhr')
      .then((response) => {
        this.kwhr =
          response.data[response.data.length - 1].KWhrAcumulado.toFixed(3);
        console.log(this.kwhr);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  get pagedData(): any[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.data.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: this.data.map((item) => item.time), // reemplazar con los valores de time de los datos recuperados
        datasets: [
          {
            label: 'Watts',
            data: this.data.map((item) => item.watts), // nueva matriz con los valores de watts de los datos recuperados
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        aspectRatio: 1,
      },
    });
  }
}
