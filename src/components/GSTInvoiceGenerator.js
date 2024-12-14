import React, { useState, useRef } from 'react'
import Button from './Button'
import Input from './Input'
import Label from './Label'
import { Select, SelectContent, SelectItem, SelectTrigger } from './Select'
import Textarea from './Textarea'
import { numberToWords } from '../utils/numberToWords'
import GeneratedInvoice from './GeneratedInvoice'

const GSTInvoiceGenerator = () => {
  const [invoiceData, setInvoiceData] = useState({
    sellerName: '',
    sellerGstin: '',
    sellerAddress: '',
    sellerStateCode: '',
    sellerContact: '',
    buyerName: '',
    buyerGstin: '',
    buyerAddress: '',
    buyerStateCode: '',
    buyerContact: '',
    invoiceNumber: '',
    invoiceDate: '',
    placeOfSupply: '',
    purchaseOrderNumber: '',
    transporterName: '',
    vehicleNumber: '',
    items: [],
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
  })

  const [currentItem, setCurrentItem] = useState({
    name: '',
    hsnSac: '',
    quantity: 0,
    unitPrice: 0,
    gstRate: 18,
  })

  const invoiceRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInvoiceData({ ...invoiceData, [name]: value })
  }

  const handleItemChange = (e) => {
    const { name, value } = e.target
    setCurrentItem({ 
      ...currentItem, 
      [name]: name === 'quantity' || name === 'unitPrice' ? parseFloat(value) || 0 : value 
    })
  }

  const handleAddItem = () => {
    if (currentItem.name && currentItem.quantity > 0 && currentItem.unitPrice > 0) {
      setInvoiceData(prevData => ({
        ...prevData,
        items: [...prevData.items, currentItem]
      }))
      setCurrentItem({ name: '', hsnSac: '', quantity: 0, unitPrice: 0, gstRate: 18 })
    } else {
      alert('Please fill in all item details before adding.')
    }
  }

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  }

  const calculateTotalGST = () => {
    return invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice * item.gstRate) / 100, 0)
  }

  const calculateTotal = () => {
    const total = calculateSubtotal() + calculateTotalGST()
    return {
      amount: total,
      words: numberToWords(Math.round(total))
    }
  }

  const generateInvoice = () => {
    console.log('Generating invoice:', invoiceData)
  }

  const printInvoice = () => {
    const printContents = invoiceRef.current?.innerHTML
    const originalContents = document.body.innerHTML

    document.body.innerHTML = printContents || ''
    window.print()
    document.body.innerHTML = originalContents
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl bg-background rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary border-b pb-4">GST Tax Invoice Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-secondary">Seller Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="sellerName">Seller Name</Label>
              <Input id="sellerName" name="sellerName" value={invoiceData.sellerName} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="sellerGstin">GSTIN (Seller)</Label>
              <Input id="sellerGstin" name="sellerGstin" value={invoiceData.sellerGstin} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="sellerAddress">Seller Address</Label>
              <Textarea id="sellerAddress" name="sellerAddress" value={invoiceData.sellerAddress} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="sellerStateCode">Seller State Code</Label>
              <Input id="sellerStateCode" name="sellerStateCode" value={invoiceData.sellerStateCode} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="sellerContact">Seller Contact Info</Label>
              <Input id="sellerContact" name="sellerContact" value={invoiceData.sellerContact} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-secondary">Buyer Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="buyerName">Buyer Name</Label>
              <Input id="buyerName" name="buyerName" value={invoiceData.buyerName} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="buyerGstin">GSTIN (Buyer)</Label>
              <Input id="buyerGstin" name="buyerGstin" value={invoiceData.buyerGstin} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="buyerAddress">Buyer Address</Label>
              <Textarea id="buyerAddress" name="buyerAddress" value={invoiceData.buyerAddress} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="buyerStateCode">Buyer State Code</Label>
              <Input id="buyerStateCode" name="buyerStateCode" value={invoiceData.buyerStateCode} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="buyerContact">Buyer Contact Info</Label>
              <Input id="buyerContact" name="buyerContact" value={invoiceData.buyerContact} onChange={handleInputChange} />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-secondary">Invoice Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input id="invoiceNumber" name="invoiceNumber" value={invoiceData.invoiceNumber} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="invoiceDate">Invoice Date</Label>
            <Input id="invoiceDate" name="invoiceDate" type="date" value={invoiceData.invoiceDate} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="placeOfSupply">Place of Supply</Label>
            <Input id="placeOfSupply" name="placeOfSupply" value={invoiceData.placeOfSupply} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="purchaseOrderNumber">Purchase Order Number</Label>
            <Input id="purchaseOrderNumber" name="purchaseOrderNumber" value={invoiceData.purchaseOrderNumber} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="transporterName">Transporter Name</Label>
            <Input id="transporterName" name="transporterName" value={invoiceData.transporterName} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="vehicleNumber">Vehicle Number</Label>
            <Input id="vehicleNumber" name="vehicleNumber" value={invoiceData.vehicleNumber} onChange={handleInputChange} />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-secondary">Product/Service Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <Input placeholder="Item Name" name="name" value={currentItem.name} onChange={handleItemChange} />
          <Input placeholder="HSN/SAC Code" name="hsnSac" value={currentItem.hsnSac} onChange={handleItemChange} />
          <Input placeholder="Quantity" type="number" name="quantity" value={currentItem.quantity} onChange={handleItemChange} />
          <Input placeholder="Unit Price" type="number" name="unitPrice" value={currentItem.unitPrice} onChange={handleItemChange} />
          <Select 
            value={currentItem.gstRate.toString()} 
            onValueChange={(value) => setCurrentItem(prev => ({ ...prev, gstRate: parseFloat(value) }))}
          >
            <SelectTrigger>
              <span>{currentItem.gstRate}%</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5%</SelectItem>
              <SelectItem value="12">12%</SelectItem>
              <SelectItem value="18">18%</SelectItem>
              <SelectItem value="28">28%</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAddItem} className="w-full">Add Item</Button>

        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Added Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">HSN/SAC</th>
                  <th className="p-2 text-left">Quantity</th>
                  <th className="p-2 text-left">Unit Price</th>
                  <th className="p-2 text-left">GST Rate</th>
                  <th className="p-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.hsnSac}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">₹{item.unitPrice.toFixed(2)}</td>
                    <td className="p-2">{item.gstRate}%</td>
                    <td className="p-2">₹{(item.quantity * item.unitPrice * (1 + item.gstRate / 100)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-secondary">Payment Instructions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bankName">Bank Name</Label>
            <Input id="bankName" name="bankName" value={invoiceData.bankName} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input id="accountNumber" name="accountNumber" value={invoiceData.accountNumber} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="ifscCode">IFSC Code</Label>
            <Input id="ifscCode" name="ifscCode" value={invoiceData.ifscCode} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="accountHolderName">Account Holder Name</Label>
            <Input id="accountHolderName" name="accountHolderName" value={invoiceData.accountHolderName} onChange={handleInputChange} />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-secondary">Invoice Summary</h2>
        <div className="space-y-2">
          <p><strong>Subtotal:</strong> ₹{calculateSubtotal().toFixed(2)}</p>
          <p><strong>GST Amount:</strong> ₹{calculateTotalGST().toFixed(2)}</p>
          <p><strong>Total Invoice Amount:</strong> ₹{calculateTotal().amount.toFixed(2)}</p>
          <p><strong>Amount in Words:</strong> {calculateTotal().words}</p>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button onClick={generateInvoice} variant="outline">Generate Invoice</Button>
        <Button onClick={printInvoice}>Print Invoice</Button>
      </div>

      <div ref={invoiceRef}>
        <GeneratedInvoice 
          data={{
            ...invoiceData,
            subtotal: calculateSubtotal(),
            totalGST: calculateTotalGST(),
            totalAmount: calculateTotal().amount,
            amountInWords: calculateTotal().words,
            totalTaxInWords: numberToWords(Math.round(calculateTotalGST())),
            roundOff: (Math.round(calculateTotal().amount) - calculateTotal().amount).toFixed(2),
            taxSummary: {
              taxable0: invoiceData.items.filter(item => item.gstRate === 0).reduce((sum, item) => sum + item.quantity * item.unitPrice, 0).toFixed(2),
              taxable5: invoiceData.items.filter(item => item.gstRate === 5).reduce((sum, item) => sum + item.quantity * item.unitPrice, 0).toFixed(2),
              taxable12: invoiceData.items.filter(item => item.gstRate === 12).reduce((sum, item) => sum + item.quantity * item.unitPrice, 0).toFixed(2),
              taxable18: invoiceData.items.filter(item => item.gstRate === 18).reduce((sum, item) => sum + item.quantity * item.unitPrice, 0).toFixed(2),
              taxable28: invoiceData.items.filter(item => item.gstRate === 28).reduce((sum, item) => sum + item.quantity * item.unitPrice, 0).toFixed(2),
              igst5: invoiceData.items.filter(item => item.gstRate === 5).reduce((sum, item) => sum + item.quantity * item.unitPrice * 0.05, 0).toFixed(2),
              igst12: invoiceData.items.filter(item => item.gstRate === 12).reduce((sum, item) => sum + item.quantity * item.unitPrice * 0.12, 0).toFixed(2),
              igst18: invoiceData.items.filter(item => item.gstRate === 18).reduce((sum, item) => sum + item.quantity * item.unitPrice * 0.18, 0).toFixed(2),
              igst28: invoiceData.items.filter(item => item.gstRate === 28).reduce((sum, item) => sum + item.quantity * item.unitPrice * 0.28, 0).toFixed(2),
            }
          }} 
        />
      </div>
    </div>
  )
}

export default GSTInvoiceGenerator

