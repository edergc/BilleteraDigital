// Modelo que comparten el padre y el hijo.
// Lo sacamos aparte para no repetir la forma del objeto en los dos lados.

export type TipoMovimiento = 'Recarga' | 'Gasto';

export interface Movimiento {
  id: number;             // sirve para el track del @for
  tipo: TipoMovimiento;   // Recarga o Gasto
  monto: number;          // cuánto se movió
  fecha: Date;            // cuándo se registró (para mostrar fecha y hora)
}