const app = new Vue({
  el: "#app",
  data: {
    nuevoNombre: "",
    nuevoPrecio: null,
    cantidad: 0,
    estado: true,
    disabledCantidad: false,
    disabledConfirmar: true,
    disabledReset: true,
    disabledMenos: true,
    disabledAgregar: false,
    productos: [],
    items: [],
    contador: 1,
    pintar: false,
  },
  methods: {
    agregarProducto() {
      this.productos.push({
        nombre: this.nuevoNombre,
        precio: Number.parseInt(this.nuevoPrecio),
      });
      evaluarCantidad(this);
      this.nuevoNombre = "";
      this.nuevoPrecio = null;
      this.disabledMenos = false;
    },
    confirmar() {
      this.estado = false;
      this.disabledCantidad = true;
      this.disabledReset = false;
    },
    cantidadCambio() {
      this.disabledConfirmar = false;
    },
    reset() {
      this.cantidad = 0;
      this.disabledReset = true;
      this.disabledCantidad = false;
      this.disabledConfirmar = true;
      this.disabledMenos = true;
      this.disabledAgregar = false;
      this.productos = [];
      this.estado = true;
      console.log(this.items);
    },
    eliminar() {
      this.productos.pop();
      this.disabledAgregar = false;
      evaluarCantidad(this);
    },
    agregarItem() {
      this.disabledAgregar = true;
      this.items.push({
        item: this.contador++,
        productos:
          this.contador % 2 == 0
            ? sortMayor(this.productos)
            : sortMenor(this.productos),
        cantidad: this.productos.length + 1,
        cant: this.cantidad,
      });
    },
    seleccionar() {
      this.pintar = !this.pintar;
    },
  },
});

const sortMenor = (productos) => {
  let temp;
  for (let i = 0; i < productos.length - 1; i++) {
    for (let j = i + 1; j < productos.length; j++) {
      if (productos[i].precio > productos[j].precio) {
        console.log(productos[i].precio);
        console.log(productos[j].precio);
        temp = productos[i];
        productos[i] = productos[j];
        productos[j] = temp;
      }
    }
  }
  return productos;
};

const sortMayor = (productos) => {
  let temp;
  for (let i = 0; i < productos.length - 1; i++) {
    for (let j = i + 1; j < productos.length; j++) {
      if (productos[i].precio < productos[j].precio) {
        console.log(productos[i].precio);
        console.log(productos[j].precio);
        temp = productos[i];
        productos[i] = productos[j];
        productos[j] = temp;
      }
    }
  }
  return productos;
};

const evaluarCantidad = (app) => {
  if (app.cantidad == app.productos.length) {
    app.estado = true;
  } else {
    app.estado = false;
  }
};
