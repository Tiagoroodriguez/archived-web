import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  companyInfo: {
    fontSize: 12,
  },
  clientInfo: {
    fontSize: 12,
  },
  invoiceInfo: {
    marginTop: 20,
    fontSize: 12,
  },
  table: {
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 12,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
  },
  tableHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  totalSection: {
    marginTop: 20,
    textAlign: 'right',
  },
});

const Invoice = ({ invoice }) => {
  const calculateSubtotal = (precio, cantidad) => {
    return precio * cantidad;
  };

  const calculateTotal = () => {
    return invoice.productos.reduce((total, producto) => {
      return total + calculateSubtotal(producto.precio, producto.cantidad);
    }, 0);
  };

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <View style={styles.companyInfo}>
              <Text>Archived</Text>
              <Text>25 de mayo 222</Text>
              <Text>3572 - 5485224</Text>
              <Text>contacto@archived.com</Text>
            </View>
            <View style={styles.clientInfo}>
              <Text>Cliente: {invoice.cliente.nombre}</Text>
              <Text>Dirección: {invoice.cliente.direccion}</Text>
              <Text>Teléfono: {invoice.cliente.telefono}</Text>
              <Text>Email: {invoice.cliente.email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.invoiceInfo}>
          <Text>Número de Factura: {invoice.numero}</Text>
          <Text>Fecha: {invoice.fecha}</Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Producto</Text>
            <Text style={styles.tableCell}>Cantidad</Text>
            <Text style={styles.tableCell}>Precio</Text>
            <Text style={styles.tableCell}>Subtotal</Text>
          </View>
          {invoice.productos.map((producto, index) => (
            <View
              key={index}
              style={styles.tableRow}
            >
              <Text style={styles.tableCell}>
                {producto.nombre} - Talle: {producto.talle}
              </Text>
              <Text style={styles.tableCell}>{producto.cantidad}</Text>
              <Text style={styles.tableCell}>{producto.precio}</Text>
              <Text style={styles.tableCell}>
                {calculateSubtotal(producto.precio, producto.cantidad)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalSection}>
          <Text>Total: {calculateTotal()}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
