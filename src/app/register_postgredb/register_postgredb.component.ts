import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-register_postgredb',
  templateUrl: './register_postgredb.component.html',
  styleUrls: ['./register_postgredb.component.scss'],
})
export class Register_postgredbComponent implements OnInit {
  nombre: any;
  apellido: any;
  foto: any;
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
      .post('https://129.80.128.21:443/', {
        nombre: this.nombre,
        apellido: this.apellido,
        foto: this.foto,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  name() {
    this.nombre = (<HTMLInputElement>document.getElementById('nombre')).value;
    console.log(this.nombre);
  }

  apellid() {
    this.apellido = (<HTMLInputElement>document.getElementById('apellido')).value;
    console.log(this.apellido);
  }

  fotos() {
    this.foto = (<HTMLInputElement>(
      document.getElementById('foto')
    )).value;
    console.log(this.foto);
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
      .delete(`https://129.80.128.21:443/${this.id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  recover() {
    axios
      .get(`https://129.80.128.21:443/usuarios/${this.id2}`)
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
      .get(`https://129.80.128.21:443/`)
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
      .get(`https://129.80.128.21:443/`)
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
