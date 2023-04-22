import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-register-componentes',
  templateUrl: './register-componentes.component.html',
  styleUrls: ['./register-componentes.component.scss']
})
export class RegisterComponentesComponent implements OnInit {

  modelo: any;
  precio: any;
  tienda: any;
  id: any;
  id2: any;
  elementoRecuperado: any;
  idRecuperado: any[] = [];
  idInit: number = 0;
  idInit2: any;
  elementoRecuperado2: any;

  constructor() {}

  ngOnInit() {
    this.recoverid();
  }

  cruds() {
    axios
      .post('https://nodemysql12.duckdns.org:443/', {
        tipo: "procesador",
        modelo: this.modelo,
        precio: this.precio,
        tienda: this.tienda,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  modelos() {
    this.modelo = (<HTMLInputElement>document.getElementById('modelo')).value;
    console.log(this.modelo);
  }

  precios() {
    this.precio = (<HTMLInputElement>document.getElementById('precio')).value;
    console.log(this.precio);
  }

  tiendas() {
    this.tienda = (<HTMLInputElement>(
      document.getElementById('tienda')
    )).value;
    console.log(this.tienda);
  }

  ids(){
    this.id = (<HTMLInputElement>document.getElementById('id')).value;
    console.log(this.id);
  }

  ids2(){
    this.id2 = (<HTMLInputElement>document.getElementById('id2')).value;
    console.log(this.id2);
  }

  delete() {
    axios
      .delete(`https://nodemysql12.duckdns.org:443/${this.id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  recover() {
    axios
      .get(`https://nodemysql12.duckdns.org:443/usuarios/${this.id2}`)
      .then(response => {
        this.elementoRecuperado = response.data;
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  recover2() {
    axios
      .get(`https://nodemysql12.duckdns.org:443/`)
      .then(response => {
        this.elementoRecuperado2 = response.data;
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    const div = document.getElementById('input');
    if (div) {
      div.style.marginTop = '27em';
    }
  }

  recoverid(){
    axios
      .get(`https://nodemysql12.duckdns.org:443/`)
      .then(response => {
        this.idRecuperado = response.data;
        this.idInit = response.data[response.data.length - 1].id;
        this.idInit = this.idInit+1;
        this.idInit2 = ("ID: " + this.idInit);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

}
