import React from 'react'

const GeneratedInvoice = ({ data }) => {
  return (
    <div className="w-[21cm] mx-auto bg-white p-4 text-[10px] border border-black">
      {/* Header */}
      <div className="text-center font-bold text-xl border-b border-black pb-2">TAX INVOICE</div>
      
      {/* Company Details */}
      <div className="grid grid-cols-4 border-b border-black">
        <div className="col-span-3 p-2 border-r border-black">
          <div className="text-center font-bold text-lg">{data.sellerName || 'GOKUL POLYMERS'}</div>
          <div className="text-center">
            {data.sellerAddress || 'Gala No.202, 2nd Floor, A-Wing, Komal Industrial Complex,'}
            <br />
            {data.sellerAddress2 || 'Vapi Kachigam Road,Opp. Vidyut Bhavan, Kachigam, Dabhel,Daman'}
            <br />
            {data.sellerContact || 'gokulpolymers89@gmail.com'}
          </div>
        </div>
        <div className="p-2 space-y-1">
          <div><input type="checkbox" /> ORIGINAL FOR RECEIPIENT</div>
          <div><input type="checkbox" /> DUPLICATE FOR TRANSPORTER</div>
          <div><input type="checkbox" /> TRIPLICATE FOR SUPPLIER</div>
          <div><input type="checkbox" /> EXTRA</div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-2 border-b border-black text-xs">
        <div className="border-r border-black">
          <div className="grid grid-cols-2 border-b border-black">
            <div className="p-1 border-r border-black">State Name :</div>
            <div className="p-1">{data.sellerState || 'Dadra and Nagar Haveli and Daman and Diu'}</div>
          </div>
          <div className="grid grid-cols-2 border-b border-black">
            <div className="p-1 border-r border-black">Invoice No. :</div>
            <div className="p-1">{data.invoiceNumber || ''}</div>
          </div>
          <div className="grid grid-cols-2 border-b border-black">
            <div className="p-1 border-r border-black">Date :</div>
            <div className="p-1">{data.invoiceDate || ''}</div>
          </div>
          <div className="grid grid-cols-2 border-b border-black">
            <div className="p-1 border-r border-black">Challan No. :</div>
            <div className="p-1">{data.challanNo || ''}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="p-1 border-r border-black">P.Order No. :</div>
            <div className="p-1">{data.purchaseOrderNumber || ''}</div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 border-b border-black">
            <div className="p-1 border-r border-black">State Code :</div>
            <div className="p-1">{data.sellerStateCode || '26'}</div>
          </div>
          <div className="grid grid-cols-2 border-b border-black">
            <div className="p-1 border-r border-black">GSTIN No. :</div>
            <div className="p-1">{data.sellerGstin || ''}</div>
          </div>
          <div className="grid grid-cols-2 border-b border-black">
            <div className="p-1 border-r border-black">Vehical No. :</div>
            <div className="p-1">{data.vehicleNumber || ''}</div>
          </div>
          <div className="grid grid-cols-2 border-b border-black">
            <div className="p-1 border-r border-black">Place of Supply :</div>
            <div className="p-1">{data.placeOfSupply || ''}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="p-1 border-r border-black">Reverse Charges (YES/NO) :</div>
            <div className="p-1">{data.reverseCharges || 'N'}</div>
          </div>
        </div>
      </div>

      {/* Buyer Details */}
      <div className="border-b border-black">
        <div className="bg-[#B8CCE4] p-1 text-xs font-bold">Details of Receiver (Billed to)</div>
        <div className="grid grid-cols-2 text-xs">
          <div className="border-r border-black p-1">
            <div>Party Name : {data.buyerName || ''}</div>
            <div>Address : {data.buyerAddress || ''}</div>
            <div>{data.buyerAddress2 || ''}</div>
            <div>{data.buyerAddress3 || ''}</div>
            <div>State Name : {data.buyerState || ''}</div>
            <div>GSTIN No. : {data.buyerGstin || ''}</div>
          </div>
          <div className="p-1">
            <div>Party Name : {data.buyerName || ''}</div>
            <div>Address : {data.buyerAddress || ''}</div>
            <div>{data.buyerAddress2 || ''}</div>
            <div>{data.buyerAddress3 || ''}</div>
            <div>State Name : {data.buyerState || ''}</div>
            <div>GSTIN No. : {data.buyerGstin || ''}</div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="border-b border-black">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-black">
              <th className="border-r border-black p-1 w-8">Sr.No.</th>
              <th className="border-r border-black p-1">DESCRIPTION OF GOODS</th>
              <th className="border-r border-black p-1 w-16">HSN/SAC CODE</th>
              <th className="border-r border-black p-1 w-16">No of Pkg.</th>
              <th className="border-r border-black p-1 w-16">UNIT</th>
              <th className="border-r border-black p-1 w-16">Quantity</th>
              <th className="border-r border-black p-1 w-16">RATE</th>
              <th className="border-r border-black p-1 w-16">TAX RATE</th>
              <th className="border-r border-black p-1 w-16">VALUE</th>
              <th className="border-r border-black p-1 w-16">DISC.%</th>
              <th className="p-1 w-20">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {data.items && data.items.map((item, index) => (
              <tr key={index} className="border-b border-black">
                <td className="border-r border-black p-1 text-center">{index + 1}</td>
                <td className="border-r border-black p-1">{item.name}</td>
                <td className="border-r border-black p-1 text-center">{item.hsnSac}</td>
                <td className="border-r border-black p-1 text-center">{item.packages || '1'}</td>
                <td className="border-r border-black p-1 text-center">{item.unit || 'KGS'}</td>
                <td className="border-r border-black p-1 text-right">{item.quantity}</td>
                <td className="border-r border-black p-1 text-right">{item.unitPrice}</td>
                <td className="border-r border-black p-1 text-center">{item.gstRate}%</td>
                <td className="border-r border-black p-1 text-right">{(item.quantity * item.unitPrice).toFixed(2)}</td>
                <td className="border-r border-black p-1 text-center">{item.discount || 0}%</td>
                <td className="p-1 text-right">{(item.quantity * item.unitPrice * (1 + item.gstRate / 100)).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="10" className="border-r border-black p-1 text-right">Total</td>
              <td className="p-1 text-right">{data.totalAmount ? data.totalAmount.toFixed(2) : '0.00'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tax Summary */}
      <div className="border-b border-black">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-black">
              <th className="border-r border-black p-1">Tax Summary</th>
              <th className="border-r border-black p-1 w-16">0</th>
              <th className="border-r border-black p-1 w-16">5%</th>
              <th className="border-r border-black p-1 w-16">12%</th>
              <th className="border-r border-black p-1 w-16">18%</th>
              <th className="border-r border-black p-1 w-16">28%</th>
              <th className="p-1 w-20">Gross Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1">Taxable Value</td>
              <td className="border-r border-black p-1 text-right">{data.taxSummary?.taxable0 || '0.00'}</td>
              <td className="border-r border-black p-1 text-right">{data.taxSummary?.taxable5 || '0.00'}</td>
              <td className="border-r border-black p-1 text-right">{data.taxSummary?.taxable12 || '0.00'}</td>
              <td className="border-r border-black p-1 text-right">{data.taxSummary?.taxable18 || '0.00'}</td>
              <td className="border-r border-black p-1 text-right">{data.taxSummary?.taxable28 || '0.00'}</td>
              <td className="p-1 text-right">{data.subtotal ? data.subtotal.toFixed(2) : '0.00'}</td>
            </tr>
            <tr>
              <td className="border-r border-black p-1">IGST</td>
              <td className="border-r border-black p-1 text-right">0.00</td>
              <td className="border-r border-black p-1 text-right">{data.taxSummary?.igst5 || '0.00'}</td>
              <td className="border-r border-black p-1 text-right">{data.taxSummary?.igst12 || '0.00'}</td>
              <td className="border-r border-black p-1 text-right">{data.taxSummary?.igst18 || '0.00'}</td>
              <td className="border-r border-black p-1 text-right">{data.taxSummary?.igst28 || '0.00'}</td>
              <td className="p-1 text-right">{data.totalGST ? data.totalGST.toFixed(2) : '0.00'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Total and Bank Details */}
      <div className="text-xs">
        <div className="grid grid-cols-2">
          <div className="p-1">
            <div>Total Tax Amount in Words: {data.totalTaxInWords || ''}</div>
            <div>Total Amount in Words: {data.amountInWords || ''}</div>
            <div className="mt-2">
              {data.bankName && `${data.bankName}, `}
              {data.accountNumber && `A/C -${data.accountNumber}, `}
              {data.ifscCode && `IFSC CODE-${data.ifscCode}`}
            </div>
          </div>
          <div className="p-1 space-y-1">
            <div className="flex justify-between">
              <span>Add CGST</span>
              <span>{(data.totalGST / 2).toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between">
              <span>Add SGST/UTGST</span>
              <span>{(data.totalGST / 2).toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between">
              <span>Add IGST</span>
              <span>0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Round Off</span>
              <span>{data.roundOff || '0.00'}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total Amount</span>
              <span>{data.totalAmount ? data.totalAmount.toFixed(2) : '0.00'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Declaration */}
      <div className="mt-4 text-[8px]">
        <strong>Declaration:</strong>
        <p>
          I/We hereby certify that my/our Registration certificate under the GST Act 2017 is in force
          on the date on which the sale of the goods specified in this bill / cash
          Memorandum is made by me/us and that the transaction of sale covered by this
bill /cash Memorandum has been effected by me/us in the regular course of
my/our business
        </p>
      </div>

      {/* Signature */}
      <div className="mt-8 text-right text-xs">
        <p>For {data.sellerName || 'Company Name'}</p>
        <div className="mt-16">Authorised Signatory</div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-[8px]">
        ***Subject to {data.jurisdiction || 'Local'} Jurisdiction***
      </div>
    </div>
  )
}

export default GeneratedInvoice

