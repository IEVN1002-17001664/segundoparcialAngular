
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface ICinepolis {
  nombre: string;
  compradores: number;
  tarjeta: string;
  boletos: number;
  valorPagar: number;
}

@Component({
  selector: 'app-cinepolis',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cinepolis.html'
})
export class Cinepolis implements OnInit {

  formulario!: FormGroup;

  cinepolis: ICinepolis = {
    nombre: '',
    compradores: 1,
    tarjeta: 'No',
    boletos: 0,
    valorPagar: 0
  };

  registros: ICinepolis[] = [];

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      compradores: new FormControl(1),
      tarjeta: new FormControl('No'),
      boletos: new FormControl(0)
    });
  }

  procesar(): void {
    this.cinepolis.nombre = this.formulario.value.nombre;
    this.cinepolis.compradores = Number(this.formulario.value.compradores);
    this.cinepolis.tarjeta = this.formulario.value.tarjeta;
    this.cinepolis.boletos = Number(this.formulario.value.boletos);

    if (
      this.cinepolis.nombre.trim() === '' ||
      this.cinepolis.compradores < 1 ||
      this.cinepolis.boletos < 1
    ) {
      alert('Completa todos los campos correctamente');
      return;
    }

    if (this.cinepolis.boletos > this.cinepolis.compradores * 7) {
      alert('Máximo 7 boletos por persona');
      return;
    }

    let total = this.cinepolis.boletos * 12.000;

    if (this.cinepolis.boletos > 5) {
      total = total - total * 0.15;
    } else if (this.cinepolis.boletos >= 3) {
      total = total - total * 0.10;
    }

    if (this.cinepolis.tarjeta === 'Si') {
      total = total - total * 0.10;
    }

    this.cinepolis.valorPagar = total;

    this.registros = JSON.parse(
      localStorage.getItem('registrosCinepolis') || '[]'
    );

    this.registros.push({ ...this.cinepolis });

    localStorage.setItem(
      'registrosCinepolis',
      JSON.stringify(this.registros)
    );

    alert('Compra registrada correctamente');
  }

  limpiar(): void {
    this.formulario.reset({
      nombre: '',
      compradores: 1,
      tarjeta: 'No',
      boletos: 0
    });

    this.cinepolis = {
      nombre: '',
      compradores: 1,
      tarjeta: 'No',
      boletos: 0,
      valorPagar: 0
    };
  }
}
