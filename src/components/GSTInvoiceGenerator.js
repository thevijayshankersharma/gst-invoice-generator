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
    sellerState: '',
    buyerName: '',
    buyerGstin: '',
    buyerAddress: '',
    buyerStateCode: '',
    buyerContact: '',
    buyerState: '',
    invoiceNumber: '',
    invoiceDate: '',
    placeOfSupply: '',
    purchaseOrderNumber: '',
    transporterName: '',
    vehicleNumber: '',
    challanNo: '',
    reverseCharges: 'N',
    items: [],
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    jurisdiction: '',
  })

  const [currentItem, setCurrentItem] = useState({
    name: '',
    hsnSac: '',
    quantity: 0,
    unitPrice: 0,
    gstRate: 18,
    unit: '',
    packages: 1,
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
      [name]: name === 'quantity' || name === 'unitPrice' || name === 'packages' ? parseFloat(value) || 0 : value 
    })
  }

  const handleAddItem = () => {
    if (currentItem.name && currentItem.quantity > 0 && currentItem.unitPrice > 0) {
      setInvoiceData(prevData => ({
        ...prevData,
        items: [...prevData.items, currentItem]
      }))
      setCurrentItem({ name: '', hsnSac: '', quantity: 0, unitPrice: 0, gstRate: 18, unit: '', packages: 1 })
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

  const calculateRoundOff = (total) => {
    return Math.round(total) - total
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const totalGST = calculateTotalGST()
    const total = subtotal + totalGST
    const roundOff = calculateRoundOff(total)
    const finalTotal = total + roundOff
    return {
      amount: finalTotal,
      roundOff: roundOff,
      words: numberToWords(Math.round(finalTotal))
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
              <Input id="sellerName" name="sellerName" value={invoiceData.sellerName} onChange={handleInputChange} placeholder="Enter seller's name" />
            </div>
            <div>
              <Label htmlFor="sellerGstin">GSTIN (Seller)</Label>
              <Input id="sellerGstin" name="sellerGstin" value={invoiceData.sellerGstin} onChange={handleInputChange} placeholder="Enter seller's GSTIN" />
            </div>
            <div>
              <Label htmlFor="sellerAddress">Seller Address</Label>
              <Textarea id="sellerAddress" name="sellerAddress" value={invoiceData.sellerAddress} onChange={handleInputChange} placeholder="Enter seller's address" />
            </div>
            <div>
              <Label htmlFor="sellerStateCode">Seller State Code</Label>
              <Input id="sellerStateCode" name="sellerStateCode" value={invoiceData.sellerStateCode} onChange={handleInputChange} placeholder="Enter seller's state code" />
            </div>
            <div>
              <Label htmlFor="sellerContact">Seller Contact Info</Label>
              <Input id="sellerContact" name="sellerContact" value={invoiceData.sellerContact} onChange={handleInputChange} placeholder="Enter seller's contact information" />
            </div>
            <div>
              <Label htmlFor="sellerState">Seller State</Label>
              <Input id="sellerState" name="sellerState" value={invoiceData.sellerState} onChange={handleInputChange} placeholder="Enter seller's state" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-secondary">Buyer Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="buyerName">Buyer Name</Label>
              <Input id="buyerName" name="buyerName" value={invoiceData.buyerName} onChange={handleInputChange} placeholder="Enter buyer's name" />
            </div>
            <div>
              <Label htmlFor="buyerGstin">GSTIN (Buyer)</Label>
              <Input id="buyerGstin" name="buyerGstin" value={invoiceData.buyerGstin} onChange={handleInputChange} placeholder="Enter buyer's GSTIN" />
            </div>
            <div>
              <Label htmlFor="buyerAddress">Buyer Address</Label>
              <Textarea id="buyerAddress" name="buyerAddress" value={invoiceData.buyerAddress} onChange={handleInputChange} placeholder="Enter buyer's address" />
            </div>
            <div>
              <Label htmlFor="buyerStateCode">Buyer State Code</Label>
              <Input id="buyerStateCode" name="buyerStateCode" value={invoiceData.buyerStateCode} onChange={handleInputChange} placeholder="Enter buyer's state code" />
            </div>
            <div>
              <Label htmlFor="buyerContact">Buyer Contact Info</Label>
              <Input id="buyerContact" name="buyerContact" value={invoiceData.buyerContact} onChange={handleInputChange} placeholder="Enter buyer's contact information" />
            </div>
            <div>
              <Label htmlFor="buyerState">Buyer State</Label>
              <Input id="buyerState" name="buyerState" value={invoiceData.buyerState} onChange={handleInputChange} placeholder="Enter buyer's state" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-secondary">Invoice Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input id="invoiceNumber" name="invoiceNumber" value={invoiceData.invoiceNumber} onChange={handleInputChange} placeholder="Enter invoice number" />
          </div>
          <div>
            <Label htmlFor="invoiceDate">Invoice Date</Label>
            <Input id="invoiceDate" name="invoiceDate" type="date" value={invoiceData.invoiceDate} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="placeOfSupply">Place of Supply</Label>
            <Input id="placeOfSupply" name="placeOfSupply" value={invoiceData.placeOfSupply} onChange={handleInputChange} placeholder="Enter place of supply" />
          </div>
          <div>
            <Label htmlFor="purchaseOrderNumber">Purchase Order Number</Label>
            <Input id="purchaseOrderNumber" name="purchaseOrderNumber" value={invoiceData.purchaseOrderNumber} onChange={handleInputChange} placeholder="Enter purchase order number" />
          </div>
          <div>
            <Label htmlFor="transporterName">Transporter Name</Label>
            <Input id="transporterName" name="transporterName" value={invoiceData.transporterName} onChange={handleInputChange} placeholder="Enter transporter name" />
          </div>
          <div>
            <Label htmlFor="vehicleNumber">Vehicle Number</Label>
            <Input id="vehicleNumber" name="vehicleNumber" value={invoiceData.vehicleNumber} onChange={handleInputChange} placeholder="Enter vehicle number" />
          </div>
          <div>
            <Label htmlFor="challanNo">Challan No.</Label>
            <Input id="challanNo" name="challanNo" value={invoiceData.challanNo} onChange={handleInputChange} placeholder="Enter challan number" />
          </div>
          <div>
            <Label htmlFor="reverseCharges">Reverse Charges</Label>
            <Select
              value={invoiceData.reverseCharges}
              onValueChange={(value) => setInvoiceData(prev => ({ ...prev, reverseCharges: value }))}
            >
              <SelectTrigger id="reverseCharges">
                Select reverse charges
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Y">Yes</SelectItem>
                <SelectItem value="N">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="jurisdiction">Jurisdiction</Label>
            <Input id="jurisdiction" name="jurisdiction" value={invoiceData.jurisdiction} onChange={handleInputChange} placeholder="Enter jurisdiction (e.g., Local)" />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-secondary">Product/Service Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-4">
          <div>
            <Label htmlFor="itemName">Item Name</Label>
            <Input id="itemName" name="name" value={currentItem.name} onChange={handleItemChange} placeholder="Enter item name" />
          </div>
          <div>
            <Label htmlFor="itemHsnSac">HSN/SAC Code</Label>
            <Input id="itemHsnSac" name="hsnSac" value={currentItem.hsnSac} onChange={handleItemChange} placeholder="Enter HSN/SAC code" />
          </div>
          <div>
            <Label htmlFor="itemQuantity">Quantity</Label>
            <Input id="itemQuantity" name="quantity" type="number" value={currentItem.quantity} onChange={handleItemChange} placeholder="Enter quantity" />
          </div>
          <div>
            <Label htmlFor="itemUnitPrice">Unit Price</Label>
            <Input id="itemUnitPrice" name="unitPrice" type="number" value={currentItem.unitPrice} onChange={handleItemChange} placeholder="Enter unit price" />
          </div>
          <div>
            <Label htmlFor="itemGstRate">GST Rate</Label>
            <Select 
              value={currentItem.gstRate.toString()} 
              onValueChange={(value) => setCurrentItem(prev => ({ ...prev, gstRate: parseFloat(value) }))}
            >
              <SelectTrigger id="itemGstRate">
                Select GST rate
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0%</SelectItem>
                <SelectItem value="5">5%</SelectItem>
                <SelectItem value="12">12%</SelectItem>
                <SelectItem value="18">18%</SelectItem>
                <SelectItem value="28">28%</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="itemUnit">Unit</Label>
            <Input id="itemUnit" name="unit" value={currentItem.unit} onChange={handleItemChange} placeholder="Enter unit (e.g., KG, PCS)" />
          </div>
          <div>
            <Label htmlFor="itemPackages">No. of Packages</Label>
            <Input id="itemPackages" name="packages" type="number" value={currentItem.packages} onChange={handleItemChange} placeholder="Enter number of packages" />
          </div>
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
                  <th className="p-2 text-left">Unit</th>
                  <th className="p-2 text-left">Packages</th>
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
                    <td className="p-2">{item.unit}</td>
                    <td className="p-2">{item.packages}</td>
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
            <Input id="bankName" name="bankName" value={invoiceData.bankName} onChange={handleInputChange} placeholder="Enter bank name" />
          </div>
          <div>
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input id="accountNumber" name="accountNumber" value={invoiceData.accountNumber} onChange={handleInputChange} placeholder="Enter account number" />
          </div>
          <div>
            <Label htmlFor="ifscCode">IFSC Code</Label>
            <Input id="ifscCode" name="ifscCode" value={invoiceData.ifscCode} onChange={handleInputChange} placeholder="Enter IFSC code" />
          </div>
          <div>
            <Label htmlFor="accountHolderName">Account Holder Name</Label>
            <Input id="accountHolderName" name="accountHolderName" value={invoiceData.accountHolderName} onChange={handleInputChange} placeholder="Enter account holder name" />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-secondary">Invoice Summary</h2>
        <div className="space-y-2">
          <p><strong>Subtotal:</strong> ₹{calculateSubtotal().toFixed(2)}</p>
          <p><strong>GST Amount:</strong> ₹{calculateTotalGST().toFixed(2)}</p>
          <p><strong>Round Off:</strong> ₹{calculateTotal().roundOff.toFixed(2)}</p>
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
            roundOff: calculateTotal().roundOff.toFixed(2),
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

