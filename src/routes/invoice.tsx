import { useParams } from 'react-router-dom';
import { invoices } from 'mock/invoices';
import React from 'react';

const Invoice: React.FC = () => {
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
export default Invoice
