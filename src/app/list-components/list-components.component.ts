import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-list-components',
  templateUrl: './list-components.component.html',
  styleUrls: ['./list-components.component.scss']
})
export class ListComponentsComponent implements OnInit {
  procesadores: { precio: number; modelo: string }[] = [];
  motherboard: { modelo: string }[] = [];
  ram: { modelo: string }[] = [];
  almacenamiento: { modelo: string }[] = [];
  disipador: { modelo: string }[] = [];
  fuentedepoder: { modelo: string }[] = [];
  grafica: { modelo: string }[] = [];
  gabinetes: { modelo: string }[] = [];
  selectedOption: string = "";
  selectedOption2: string = "";
  selectedOption3: string = "";
  selectedOption4: string = "";
  selectedOption5: string = "";
  selectedOption6: string = "";
  selectedOption7: string = "";
  precioSeleccionado: number = 0;
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

  constructor() { }

  ngOnInit(): void {
    this.recoverid();
    this.recoverProcesadores();
    this.recovertMotherboard();
    this.recoverRam();
    this.recoverAlmacenamiento();
    this.recoverDisipador();
    this.recoverFuente();
    this.recoverGrafica();
    this.recoverGabinetes();
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

//  recoverProcesadores(){
//    axios.get('https://nodemysql12.duckdns.org:443/procesadores')
//    .then(response => {
//      this.procesadores = response.data;
//    })
//    .catch(error => {
//      console.log(error);
//    });
//  }

  recoverProcesadores() {
    axios.get('https://nodemysql12.duckdns.org:443/procesadores')
      .then(response => {
        this.procesadores = response.data.map((item: { modelo: any; precio: any; }) => ({
          modelo: item.modelo,
          precio: item.precio,
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }

  setPrecioSeleccionado(procesadorSeleccionado: any) {
    if (procesadorSeleccionado) {
      this.precioSeleccionado = procesadorSeleccionado.precio;
    } else {
      this.precioSeleccionado = 0;
    }
  }

  recovertMotherboard(){
    axios.get('https://nodemysql12.duckdns.org:443/motherboards')
    .then(response => {
      this.motherboard = response.data;
    })
    .catch(error => {
      console.log(error);
    });
  }

  recoverRam(){
    axios.get('https://nodemysql12.duckdns.org:443/rams')
    .then(response => {
      this.ram = response.data;
    })
    .catch(error => {
      console.log(error);
    });
  }

  recoverAlmacenamiento(){
    axios.get('https://nodemysql12.duckdns.org:443/almacenamientos')
    .then(response => {
      this.almacenamiento = response.data;
    })
    .catch(error => {
      console.log(error);
    });
  }

  recoverDisipador(){
    axios.get('https://nodemysql12.duckdns.org:443/disipadores')
    .then(response => {
      this.disipador = response.data;
    })
    .catch(error => {
      console.log(error);
    });
  }

  recoverFuente(){
    axios.get('https://nodemysql12.duckdns.org:443/fuentes')
    .then(response => {
      this.fuentedepoder = response.data;
    })
    .catch(error => {
      console.log(error);
    });
  }

  recoverGrafica(){
    axios.get('https://nodemysql12.duckdns.org:443/graficas')
    .then(response => {
      this.grafica = response.data;
    })
    .catch(error => {
      console.log(error);
    });
  }

  recoverGabinetes(){
    axios.get('https://nodemysql12.duckdns.org:443/gabinetes')
    .then(response => {
      this.gabinetes = response.data;
    })
    .catch(error => {
      console.log(error);
    });
  }

}
