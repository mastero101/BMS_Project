import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-list-components',
  templateUrl: './list-components.component.html',
  styleUrls: ['./list-components.component.scss'],
})
export class ListComponentsComponent implements OnInit {
  procesadores: { precio: number; modelo: string }[] = [];
  motherboard: { precio: number; modelo: string }[] = [];
  ram: { precio: number; modelo: string }[] = [];
  almacenamiento: { precio: number; modelo: string }[] = [];
  disipador: { precio: number; modelo: string }[] = [];
  fuentedepoder: { precio: number; modelo: string }[] = [];
  grafica: { precio: number; modelo: string }[] = [];
  gabinetes: { precio: number; modelo: string }[] = [];
  precioSeleccionado: number = 0;
  precioSeleccionado2: number = 0;
  precioSeleccionado3: number = 0;
  precioSeleccionado4: number = 0;
  precioSeleccionado5: number = 0;
  precioSeleccionado6: number = 0;
  precioSeleccionado7: number = 0;
  precioSeleccionado8: number = 0;
  modeloSeleccionado: any;
  modeloSeleccionado2: any;
  modeloSeleccionado3: any;
  modeloSeleccionado4: any;
  modeloSeleccionado5: any;
  modeloSeleccionado6: any;
  modeloSeleccionado7: any;
  modeloSeleccionado8: any;
  sumaPrecios: number = 0;
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
      .then((response) => {
        this.elementoRecuperado2 = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    const div = document.getElementById('input');
    if (div) {
      div.style.marginTop = '27em';
    }
  }

  recoverid() {
    axios
      .get(`https://nodemysql12.duckdns.org:443/`)
      .then((response) => {
        this.idRecuperado = response.data;
        this.idInit = response.data[response.data.length - 1].id;
        this.idInit = this.idInit + 1;
        this.idInit2 = 'ID: ' + this.idInit;
        console.log(response);
      })
      .catch((error) => {
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
    axios
      .get('https://nodemysql12.duckdns.org:443/procesadores')
      .then((response) => {
        this.procesadores = response.data.map(
          (item: { modelo: any; precio: any }) => ({
            modelo: item.modelo,
            precio: item.precio,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setPrecioSeleccionado(procesadorSeleccionado: any) {
    if (procesadorSeleccionado) {
      this.precioSeleccionado = procesadorSeleccionado.precio;
      this.modeloSeleccionado = procesadorSeleccionado.modelo;
      this.sumatoriaPrecios();
    } else {
      this.precioSeleccionado = 0;
    }
  }

  recovertMotherboard() {
    axios
      .get('https://nodemysql12.duckdns.org:443/motherboards')
      .then((response) => {
        this.motherboard = response.data.map(
          (item: { modelo: any; precio: number }) => ({
            modelo: item.modelo,
            precio: item.precio,
          })
        );
        this.precioSeleccionado2 = 0;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setPrecioSeleccionado2(modelo: string) {
    const motherboardSeleccionada = this.motherboard.find(
      (item) => item.modelo === modelo
    );
    if (motherboardSeleccionada) {
      this.precioSeleccionado2 = motherboardSeleccionada.precio;
      this.modeloSeleccionado2 = motherboardSeleccionada.modelo;
    }
    this.sumatoriaPrecios();
  }

  recoverRam() {
    axios
      .get('https://nodemysql12.duckdns.org:443/rams')
      .then((response) => {
        this.ram = response.data.map(
          (item: { modelo: any; precio: number }) => ({
            modelo: item.modelo,
            precio: item.precio,
          })
        );
        this.precioSeleccionado3 = 0;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setPrecioSeleccionado3(modelo: string) {
    const ramSeleccionada = this.ram.find((item) => item.modelo === modelo);
    if (ramSeleccionada) {
      this.precioSeleccionado3 = ramSeleccionada.precio;
      this.modeloSeleccionado3 = ramSeleccionada.modelo;
    }
    this.sumatoriaPrecios();
  }

  recoverAlmacenamiento() {
    axios
      .get('https://nodemysql12.duckdns.org:443/almacenamientos')
      .then((response) => {
        this.almacenamiento = response.data.map(
          (item: { modelo: any; precio: number }) => ({
            modelo: item.modelo,
            precio: item.precio,
          })
        );
        this.precioSeleccionado4 = 0;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setPrecioSeleccionado4(modelo: string) {
    const almacenamientoSeleccionado = this.almacenamiento.find(
      (item) => item.modelo === modelo
    );
    if (almacenamientoSeleccionado) {
      this.precioSeleccionado4 = almacenamientoSeleccionado.precio;
      this.modeloSeleccionado4 = almacenamientoSeleccionado.modelo;
    }
    this.sumatoriaPrecios();
  }

  recoverDisipador() {
    axios
      .get('https://nodemysql12.duckdns.org:443/disipadores')
      .then((response) => {
        this.disipador = response.data.map(
          (item: { modelo: any; precio: number }) => ({
            modelo: item.modelo,
            precio: item.precio,
          })
        );
        this.precioSeleccionado5 = 0;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setPrecioSeleccionado5(modelo: string) {
    const disipadorSeleccionado = this.disipador.find(
      (item) => item.modelo === modelo
    );
    if (disipadorSeleccionado) {
      this.precioSeleccionado5 = disipadorSeleccionado.precio;
      this.modeloSeleccionado5 = disipadorSeleccionado.modelo;
    }
    this.sumatoriaPrecios();
  }

  recoverFuente() {
    axios
      .get('https://nodemysql12.duckdns.org:443/fuentes')
      .then((response) => {
        this.fuentedepoder = response.data.map(
          (item: { modelo: any; precio: number }) => ({
            modelo: item.modelo,
            precio: item.precio,
          })
        );
        this.precioSeleccionado6 = 0;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setPrecioSeleccionado6(modelo: string) {
    const fuenteSeleccionado = this.fuentedepoder.find(
      (item) => item.modelo === modelo
    );
    if (fuenteSeleccionado) {
      this.precioSeleccionado6 = fuenteSeleccionado.precio;
      this.modeloSeleccionado6 =  fuenteSeleccionado.modelo;
    }
    this.sumatoriaPrecios();
  }

  recoverGrafica() {
    axios
      .get('https://nodemysql12.duckdns.org:443/graficas')
      .then((response) => {
        this.grafica = response.data.map(
          (item: { modelo: any; precio: number }) => ({
            modelo: item.modelo,
            precio: item.precio,
          })
        );
        this.precioSeleccionado7 = 0;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setPrecioSeleccionado7(modelo: string) {
    const graficaSeleccionado = this.grafica.find(
      (item) => item.modelo === modelo
    );
    if (graficaSeleccionado) {
      this.precioSeleccionado7 = graficaSeleccionado.precio;
      this.modeloSeleccionado7 = graficaSeleccionado.modelo;
    }
    this.sumatoriaPrecios();
  }

  recoverGabinetes() {
    axios
      .get('https://nodemysql12.duckdns.org:443/gabinetes')
      .then((response) => {
        this.gabinetes = response.data.map(
          (item: { modelo: any; precio: number }) => ({
            modelo: item.modelo,
            precio: item.precio,
          })
        );
        this.precioSeleccionado8 = 0;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setPrecioSeleccionado8(modelo: string) {
    const gabineteSeleccionado = this.gabinetes.find(
      (item) => item.modelo === modelo
    );
    if (gabineteSeleccionado) {
      this.precioSeleccionado8 = gabineteSeleccionado.precio;
      this.modeloSeleccionado8 = gabineteSeleccionado.modelo;
    }
    this.sumatoriaPrecios();
  }

  sumatoriaPrecios() {
    this.sumaPrecios =
      this.precioSeleccionado +
      this.precioSeleccionado2 +
      this.precioSeleccionado3 +
      this.precioSeleccionado4 +
      this.precioSeleccionado5 +
      this.precioSeleccionado6 +
      this.precioSeleccionado7 +
      this.precioSeleccionado8;
    console.log(this.sumaPrecios);
  }

  exportToText() {
    const text = `Procesador: ${this.modeloSeleccionado}, $${this.precioSeleccionado}`;
    const text2 = `Placa Madre: ${this.modeloSeleccionado2}, $${this.precioSeleccionado2}`;
    const text3 = `Ram: ${this.modeloSeleccionado3}, $${this.precioSeleccionado3}`;
    const text4 = `Almacenamiento: ${this.modeloSeleccionado4}, $${this.precioSeleccionado4}`;
    const text5 = `Enfriamiento: ${this.modeloSeleccionado5}, $${this.precioSeleccionado5}`;
    const text6 = `Fuente: ${this.modeloSeleccionado6}, $${this.precioSeleccionado6}`;
    const text7 = `Grafica: ${this.modeloSeleccionado7}, $${this.precioSeleccionado7}`;
    const text8 = `Gabinete: ${this.modeloSeleccionado8}, $${this.precioSeleccionado8}`;
    const text9 = `Total: $${this.sumaPrecios}`
    const allText = [text, text2, text3, text4, text5, text6, text7, text8, text9].join('\n');
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(allText));
    element.setAttribute('download', 'armado.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
