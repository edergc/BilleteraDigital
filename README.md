# 🟡 UPay · Billetera Digital UPN

![Angular](https://img.shields.io/badge/Angular-17+-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)
![Estado](https://img.shields.io/badge/Estado-Completado-success)

> 💡 **¿Qué es esto?**  
> Una billetera digital hecha en Angular, tipo Yape o Plin pero simplificada, para el curso de **Soluciones Web y Aplicaciones Distribuidas** de la **UPN**.  
> Permite ver el saldo, hacer recargas, hacer gastos y ver el historial de movimientos.

---

## 👥 Integrantes — Grupo 9

| # | Nombre completo | Rol |
|---|-----------------|-----|
| 1 | **Iván David Asencio Julcamoro** | Desarrollo |
| 2 | **Eder Guerrero Carranza** | Desarrollo |
| 3 | **José Eduardo Ruiz Castillo** | Desarrollo |
| 4 | **Nelver Vigo Cabanillas** | Desarrollo |

**Curso:** Soluciones Web y Aplicaciones Distribuidas  
**Evaluación:** T1 — Caso 2 (Angular)  
**Institución:** Universidad Privada del Norte (UPN)

---

## 🎯 ¿Qué hace la aplicación?

- 💰 Muestra el saldo disponible (arranca con **S/ 250.00** de prueba).
- ➕ Permite registrar **Recargas** (suman al saldo).
- ➖ Permite registrar **Gastos** (restan del saldo).
- 🚫 **Regla importante**: no puedes gastar más de lo que tienes. Si intentas gastar más que tu saldo, el botón se bloquea y sale un mensaje de error.
- 📋 Cada movimiento queda guardado con su **fecha y hora**.
- 🔝 El historial se ordena del más reciente al más antiguo.
- 🧑 No hay login ni múltiples usuarios: es una sola billetera compartida durante la sesión.

---

## 🧩 ¿Cómo está armado el proyecto?

Son **dos componentes** que se comunican entre sí:

```
┌─────────────────────────────────────────────┐
│  BilleteraComponent  (padre)                │
│  - Mantiene el saldo                        │
│  - Mantiene la lista de movimientos         │
│  - Muestra el saldo y el historial          │
└─────────────────────────────────────────────┘
              │                ▲
     input()  │                │  output()
    [saldo]   │                │  (nuevoMovimiento)
              ▼                │
┌─────────────────────────────────────────────┐
│  NuevoMovimientoComponent  (hijo)           │
│  - Solo tiene el formulario                 │
│  - Valida que el gasto no supere el saldo   │
│  - Avisa al padre cuando hay un movimiento  │
└─────────────────────────────────────────────┘
```

- 🔵 **`input()`** → Property Binding → el saldo **baja** del padre al hijo.
- 🔴 **`output()`** → Event Binding → el movimiento **sube** del hijo al padre.

---

## 🛠️ Tecnologías usadas

- ⚡ **Angular 17+** (componentes **standalone**, sin `NgModule`)
- 🎯 **Signals** (`signal`, `computed`, `input`, `output`)
- 🔀 **Control de flujo nuevo**: `@if` y `@for` (nada de `*ngIf` ni `*ngFor`)
- 🎨 **Bootstrap 5** (por CDN) para todo el diseño
- 📘 **TypeScript**
- 🟢 **Node.js 18+** y **npm**

---

## 📁 Estructura del proyecto

```
billetera-digital/
├── public/
│   ├── favicon.ico
│   └── logo.png
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── movimiento.model.ts
│   │   ├── billetera/
│   │   │   ├── billetera.ts
│   │   │   ├── billetera.html
│   │   │   └── billetera.css
│   │   ├── nuevo-movimiento/
│   │   │   ├── nuevo-movimiento.ts
│   │   │   ├── nuevo-movimiento.html
│   │   │   └── nuevo-movimiento.css
│   │   ├── app.ts
│   │   ├── app.html
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── README.md
```

---

## ✅ Requisitos funcionales cumplidos

| # | Requisito | Dónde se cumple | ✔️ |
|---|-----------|-----------------|---|
| 1 | El padre mantiene el saldo y el arreglo de movimientos | `billetera.ts` | ✅ |
| 1 | Saldo mostrado con interpolación | `billetera.html` → `{{ saldo().toFixed(2) }}` | ✅ |
| 1 | Lista con `@for` | `billetera.html` | ✅ |
| 1 | Mensaje con `@if` si la lista está vacía | `billetera.html` | ✅ |
| 2 | Hijo recibe saldo con `input()` | `nuevo-movimiento.ts` | ✅ |
| 2 | Formulario con Bootstrap (`form-select`, `form-control`) | `nuevo-movimiento.html` | ✅ |
| 3 | Hijo emite con `output()` | `nuevo-movimiento.ts` | ✅ |
| 3 | Padre agrega el movimiento al recibirlo | `billetera.html` + `billetera.ts` | ✅ |
| 4 | Gasto > saldo → botón deshabilitado (`[disabled]`) | `nuevo-movimiento.html` | ✅ |
| 4 | Mensaje de error con `@if` | `nuevo-movimiento.html` | ✅ |
| 5 | Todo con Bootstrap, sin CSS personalizado | `styles.css` | ✅ |

---

## 🚀 Cómo desplegar el proyecto paso a paso (para el profe 👨‍🏫)

### 📋 Requisitos previos

Antes de empezar, asegúrate de tener instalado:

| Herramienta | Versión mínima | Cómo verificar |
|-------------|----------------|----------------|
| **Node.js** | v18 o superior | `node -v` |
| **npm** | v9 o superior | `npm -v` |
| **Angular CLI** | v17 o superior | `ng version` |
| **Git** | cualquiera | `git --version` |

> ⚠️ **Si no tienes Angular CLI**, instálalo con:
> ```bash
> npm install -g @angular/cli
> ```

---

### 🧭 Paso 1: Clonar el repositorio

Abre una terminal (CMD, PowerShell o Git Bash) y ejecuta:

```bash
git clone https://github.com/edergc/BilleteraDigital.git
```

Esto crea una carpeta llamada `BilleteraDigital` en tu directorio actual.

---

### 🧭 Paso 2: Entrar a la carpeta del proyecto

```bash
cd BilleteraDigital
```

---

### 🧭 Paso 3: Instalar las dependencias

```bash
npm install
```

⏳ Esto tarda **1–2 minutos** la primera vez. Descarga todo lo que necesita Angular.

> 💡 **Ojo**: si tienes problemas, revisa que estés conectado a internet.

---

### 🧭 Paso 4: Levantar el servidor de desarrollo

```bash
ng serve -o
```

- `ng serve` → arranca el servidor local.
- `-o` → abre automáticamente el navegador.

Deberías ver algo así en la terminal:

```
Initial chunk files | Names         | Raw size
main.js             | main          | ...
polyfills.js        | polyfills     | ...
styles.css          | styles        | ...

Application bundle generation complete.
➜  Local:   http://localhost:4200/
```

Y el navegador se abrirá solo en **http://localhost:4200/**.

---

### 🧭 Paso 5: ¡Listo para usar! 🎉

Deberías ver:
- Un header negro con el logo UPN y el nombre **UPay**.
- Una card con el saldo inicial **S/ 250.00**.
- Un mensaje *"Aún no hay movimientos registrados."*
- El formulario para registrar tu primer movimiento.

---

## 🧪 Pruebas para verificar que todo funciona

| # | Acción | Resultado esperado |
|---|--------|-------------------|
| 1 | Abrir la app | Saldo `S/ 250.00`, mensaje de "sin movimientos" |
| 2 | Recarga de `100` | Saldo `S/ 350.00`, badge verde, `+ S/ 100.00`, con fecha y hora |
| 3 | Gasto de `45.50` | Saldo `S/ 304.50`, badge rojo, `- S/ 45.50`, con fecha y hora |
| 4 | Gasto de `9999` | Botón bloqueado 🚫 + mensaje rojo de error |
| 5 | Cambiar a Recarga `9999` | Botón se habilita, mensaje desaparece |
| 6 | Ver orden de la lista | El último movimiento aparece arriba ⬆️ |

---

## 🎨 Estilos y apariencia

Todo el diseño se resuelve con **clases de Bootstrap 5**, respetando el mockup de referencia del examen:

- 🔲 **Header del padre**: fondo oscuro (`bg-dark`) con el nombre `BilleteraComponent (padre)`.
- 🔲 **Card del hijo**: borde y cabecera azul (`#0d6efd`) con el nombre `NuevoMovimientoComponent (hijo)`.
- 🟢 **Recargas**: badge y monto en verde (`bg-success` / `text-success`).
- 🔴 **Gastos**: badge y monto en rojo (`bg-danger` / `text-danger`).
- 🟡 **Botón "Agregar movimiento"**: color institucional UPN (`#F5A800`).
- 🖼️ **Logo UPN**: se muestra en el header, cargado desde `public/logo.png`.

> El único ajuste CSS fuera de Bootstrap es el amarillo institucional del botón, declarado en `styles.css`. Todo lo demás viene directamente de clases Bootstrap.

---

## 📄 Licencia

Proyecto académico para el curso **Soluciones Web y Aplicaciones Distribuidas** de la **Universidad Privada del Norte** (UPN).  
Uso exclusivamente educativo. 🎓

---

<div align="center">

**Hecho por el Grupo 9 — UPN 2026 🟡**

</div>