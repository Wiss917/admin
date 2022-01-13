import { useParams } from 'react-router-dom';
import { invoices } from 'mock/invoices';
import { log } from 'console';

export default function Invoice() {
  let { invoiceId } = useParams();
  let invoice = invoices.find(
    ({ number }) => number === parseInt(invoiceId || '0')
  );

  console.log(invoice);
  
  return invoice ? (
    <main style={{ padding: '1rem' }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
    </main>
  ) : (
    <div>404!</div>
  );
}
