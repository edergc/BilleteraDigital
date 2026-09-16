import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Movimiento, TipoMovimiento } from '../models/movimiento.model';
import { NuevoMovimientoComponent } from '../nuevo-movimiento/nuevo-movimiento';

@Component({
  selector: 'app-billetera',
  standalone: true,
  // Traemos al hijo para poder escuchar su output() y reaccionar.
  // (Requisito 3: cuando el hijo avise, el padre agrega el movimiento).
  // También importamos DatePipe porque en el HTML mostramos la fecha.
  imports: [NuevoMovimientoComponent, DatePipe],
  templateUrl: './billetera.html',
  styleUrl: './billetera.css'
})
export class BilleteraComponent {

  // Requisito 1: el padre guarda el saldo y el arreglo de movimientos.
  // Arrancamos con S/ 250.00 como dice el enunciado, y la lista vacía.
  // Usamos signals para que el template se actualice solo.
  saldo = signal<number>(250.00);
  movimientos = signal<Movimiento[]>([]);
  private nextId = 1; // para el track del @for (id único por movimiento)

  // Requisito 3: este método lo llama el hijo a través de su output().
  // En el HTML del padre está enganchado así:
  //   (nuevoMovimiento)="agregarMovimiento($event)"
  // Ese es el Event Binding: el evento sube del hijo al padre.
  agregarMovimiento(evento: { tipo: TipoMovimiento; monto: number }): void {

    // Regla de negocio: un gasto nunca puede superar el saldo.
    // (El hijo ya bloquea el botón, pero por si acaso lo validamos aquí también).
    if (evento.tipo === 'Gasto' && evento.monto > this.saldo()) {
      return;
    }

    // Actualizamos el saldo según el tipo.
    // Recarga → suma, Gasto → resta.
    this.saldo.update(s =>
      evento.tipo === 'Recarga' ? s + evento.monto : s - evento.monto
    );

    // Creamos el movimiento y lo metemos al inicio del arreglo
    // para que se vea primero el más reciente (como pide el enunciado).
    const nuevo: Movimiento = {
      id: this.nextId++,
      tipo: evento.tipo,
      monto: evento.monto,
      fecha: new Date()
    };
    this.movimientos.update(lista => [nuevo, ...lista]);
  }
}