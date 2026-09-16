import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TipoMovimiento } from '../models/movimiento.model';

@Component({
  selector: 'app-nuevo-movimiento',
  standalone: true,
  // Necesitamos FormsModule para usar [ngModel] en el select y el input.
  imports: [FormsModule],
  templateUrl: './nuevo-movimiento.html',
  styleUrl: './nuevo-movimiento.css'
})
export class NuevoMovimientoComponent {

  // Requisito 2:
  // input() → Property Binding. El saldo BAJA del padre al hijo.
  // En el HTML del padre se ve como: [saldo]="saldo()"
  // Uso input.required 
  saldo = input.required<number>();

  // Requisito 3:
  // output() → Event Binding. El movimiento SUBE del hijo al padre.
  // En el HTML del padre se ve como: (nuevoMovimiento)="agregarMovimiento($event)"
  nuevoMovimiento = output<{ tipo: TipoMovimiento; monto: number }>();

  // Estado propio del formulario. No se guarda en el padre hasta registrar.
  tipo = signal<TipoMovimiento>('Recarga');
  monto = signal<number>(0);

  // Requisito 4:
  // Aquí validamos: si es Gasto y el monto pasa el saldo, hay error.
  // Uso computed para que se recalcule solo cuando cambian los signals.
  mostrarError = computed(
    () => this.tipo() === 'Gasto' && this.monto() > this.saldo()
  );

  // El botón solo se habilita si hay monto mayor a 0 y no hay error.
  // Esta señal es la que alimenta el [disabled] del botón.
  puedeRegistrar = computed(
    () => this.monto() > 0 && !this.mostrarError()
  );

  // Requisito 3: cuando hacen clic en el botón, emitimos el movimiento.
  // El padre lo va a recibir con (nuevoMovimiento)="agregarMovimiento($event)".
  registrar(): void {
    // Por si acaso, no emitimos si no se puede registrar.
    if (!this.puedeRegistrar()) {
      return;
    }
    // acá está la emisión del movimiento.
    this.nuevoMovimiento.emit({
      tipo: this.tipo(),
      monto: this.monto()
    });

    // Limpiamos el formulario después de registrar.
    this.tipo.set('Recarga');
    this.monto.set(0);
  }
}