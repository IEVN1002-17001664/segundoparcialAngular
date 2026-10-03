import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zodiaco',
  imports: [FormsModule, CommonModule],
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css'
})
export class Zodiaco {

  nombre: string = '';
  paterno: string = '';
  materno: string = '';

  dia: string = '';
  mes: string = '';
  anio: string = '';

  sexo: string = '';

  edad: number = 0;
  signo: string = '';
  nombreCompleto: string = '';
  imagen: string = '';

  imprimir(): void {

    this.nombreCompleto =
      this.nombre + ' ' + this.paterno + ' ' + this.materno;

    let diaN = parseInt(this.dia);
    let mesN = parseInt(this.mes);
    let anioN = parseInt(this.anio);

    let fechaActual = new Date();

    this.edad = fechaActual.getFullYear() - anioN;

    if (
      fechaActual.getMonth() + 1 < mesN ||
      (fechaActual.getMonth() + 1 == mesN &&
      fechaActual.getDate() < diaN)
    ) {
      this.edad--;
    }


    let signos = [
      'Rata',
      'Buey',
      'Tigre',
      'Conejo',
      'Dragón',
      'Serpiente',
      'Caballo',
      'Cabra',
      'Mono',
      'Gallo',
      'Perro',
      'Cerdo'
    ];


    let imagenes = [
      'https://i.imgur.com/7UJ0E4c.png',
      'https://i.imgur.com/eGviHem.png',
      'https://i.imgur.com/U78ZzKw.png',
      'https://i.imgur.com/9bl2kNP.png',
      'https://i.imgur.com/hjTUyoV.png',
      'https://i.imgur.com/HpAoMAw.png',
      'https://i.imgur.com/6c7HM6m.png',
      'https://i.imgur.com/Ko6YBOS.png',
      'https://i.imgur.com/mV3RGCu.png',
      'https://i.imgur.com/FI9KVzc.png',
      'https://i.imgur.com/gF5GCfN.png',
      'https://i.imgur.com/yji3USm.png'
    ];


    let posicion = anioN - 2020;


    while (posicion < 0) {
      posicion = posicion + 12;
    }


    while (posicion > 11) {
      posicion = posicion - 12;
    }


    this.signo = signos[posicion];

    this.imagen = imagenes[posicion];

  }


  limpiar(): void {

    this.nombre = '';
    this.paterno = '';
    this.materno = '';

    this.dia = '';
    this.mes = '';
    this.anio = '';

    this.sexo = '';

    this.edad = 0;
    this.signo = '';
    this.nombreCompleto = '';
    this.imagen = '';

  }

}