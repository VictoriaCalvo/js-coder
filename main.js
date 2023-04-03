let carrito = []

const iniciarCompra = (productos) => {
    const listaProducto = productos.map(producto => { return producto.nombre + ' $' + producto.precio })

    let productoNombre = ''
    let productoTalles = ''
    let productoCantidad = 0
    let seguirComprando

    do {
        productoNombre = prompt('¿Qué producto estás buscando?' + '\n\n' + listaProducto.join('\n'))
        productoTalles = prompt('¿En qué talle?' + '\n\n' + 'Talles: S, M, L, XL')
        productoCantidad = parseInt(prompt('¿Qué cantidad?'))

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())

        if (productoTalles != 's' && productoTalles != 'm' && productoTalles != 'l' && productoTalles != 'xl' && productoTalles != 'S' && productoTalles != 'M' && productoTalles != 'L' && productoTalles != 'XL') {
            alert('No se encuentra el talle.')
        }

        if (producto) {
            agregarCarrito(producto, producto.id, productoCantidad)
        } else {
            alert('El producto no coincide con la lista.')
        }


        seguirComprando = confirm('¿Querés seguir eligiendo?')
    } while (seguirComprando)

    confirmarCompra()
}

const agregarCarrito = (producto, productoId, productoCantidad) => {
    const repetido = carrito.find(producto => producto.id === productoId)
    if (!repetido) {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    } else {
        repetido.cantidad += productoCantidad;
    }
    console.log(carrito)
}

const eliminarProducto = (productoNombre) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toLowerCase() === productoNombre.toLowerCase()) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1)
            }
        }
    })

    console.table(carrito)
    confirmarCompra()
}

const confirmarCompra = () => {
    const productosElegidos = carrito.map(producto => {
        return '- ' + producto.nombre + ': ' + producto.cantidad
    })


    const confirmar = confirm('Estos son tus productos seleccionados:'
        + '\n\n' + productosElegidos.join('\n')
        + '\n\nSi deseas continuar con la compra presiona "Aceptar".\n\nSi deseas eliminar un producto presiona "Cancelar".'
    )

    if (confirmar) {
        finalizarCompra(productosElegidos)
    } else {
        const productoAEliminar = prompt('Ingrese el nombre del producto a eliminar:')
        eliminarProducto(productoAEliminar)
    }

}

const finalizarCompra = (productosElegidos) => {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

    alert('Detalle de tu compra:'
        + '\n\n' + productosElegidos.join('\n')
        + '\n\nTotal de productos: ' + cantidadTotal
        + '\n\nEl total de su compra es: ' + subtotal)

    calcularEnvio(subtotal)
}

const calcularEnvio = (subtotal) => {
    const conSinEnvio = confirm('¿Querés envío a domicilio?')

    if (conSinEnvio && subtotal >= 20000) {
        alert('¡Tu compra tiene el envio gratis! El total es $ ' + subtotal)
    } else if (conSinEnvio && subtotal < 20000) {
        subtotal += 1000
        alert('El envío cuesta $1000. El total con envío es: $' + subtotal)
    } else {
        alert('El total de tu compra es $ ' + subtotal)
    }

    alert('Muchas gracias por tu compra.')
};





iniciarCompra(productos)






