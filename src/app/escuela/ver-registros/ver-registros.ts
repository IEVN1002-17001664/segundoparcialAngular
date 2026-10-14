
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { ICinepolis } from '../cinepolis/cinepolis';

@Component({
  selector: 'app-ver-registros',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ver-registros.html'
})
export class VerRegistros implements OnInit {

  registros: ICinepolis[] = [];

  formulario!: FormGroup;

  indiceEdicion = -1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      compradores: new FormControl(1),
      tarjeta: new FormControl('No'),
      boletos: new FormControl(1)
    });

    this.cargarRegistros();
  }

  cargarRegistros(): void {
    const datos = localStorage.getItem('registrosCinepolis');

    this.registros = datos ? JSON.parse(datos) : [];
  }

  editarRegistro(index: number): void {
    const registro = this.registros[index];

    this.formulario.patchValue({
      nombre: registro.nombre,
      compradores: registro.compradores,
      tarjeta: registro.tarjeta,
      boletos: registro.boletos
    });

    this.indiceEdicion = index;
  }

  guardarCambios(): void {
    const nombre = String(
      this.formulario.value.nombre ?? ''
    ).trim();

    const compradores = Number(
      this.formulario.value.compradores
    );

    const tarjeta = this.formulario.value.tarjeta;

    const boletos = Number(
      this.formulario.value.boletos
    );

    if (
      nombre === '' ||
      !Number.isInteger(compradores) ||
      compradores < 1 ||
      !Number.isInteger(boletos) ||
      boletos < 1
    ) {
      alert('Completa todos los campos correctamente');
      return;
    }

    if (boletos > compradores * 7) {
      alert('Máximo 7 boletos por persona');
      return;
    }

    let total = boletos * 12;

    if (boletos > 5) {
      total = total - total * 0.15;
    } else if (boletos >= 3) {
      total = total - total * 0.10;
    }

    if (tarjeta === 'Si') {
      total = total - total * 0.10;
    }

    this.registros[this.indiceEdicion] = {
      nombre: nombre,
      compradores: compradores,
      tarjeta: tarjeta,
      boletos: boletos,
      valorPagar: total
    };

    localStorage.setItem(
      'registrosCinepolis',
      JSON.stringify(this.registros)
    );

    this.cancelarEdicion();

    alert('Registro actualizado correctamente');
  }

  cancelarEdicion(): void {
    this.indiceEdicion = -1;

    this.formulario.reset({
      nombre: '',
      compradores: 1,
      tarjeta: 'No',
      boletos: 1
    });
  }

  eliminarRegistro(index: number): void {
    if (this.indiceEdicion === index) {
      this.cancelarEdicion();
    } else if (this.indiceEdicion > index) {
      this.indiceEdicion--;
    }

    this.registros.splice(index, 1);

    localStorage.setItem(
      'registrosCinepolis',
      JSON.stringify(this.registros)
    );
  }

  regresar(): void {
    this.router.navigateByUrl('/escuela/Cinepolis');
  }
}
