# GST Invoice Generator

A simple React application to generate GST-compliant invoices. This application allows users to input seller and buyer details, along with item information, to generate professional-looking invoices that include tax summaries, itemized lists, and total calculations. The generated invoice is styled in a printable format.

## Features

- Generate GST-compliant invoices
- Display seller and buyer details
- Table for item details with HSN/SAC codes, quantity, rate, and tax rates
- Tax summary with breakdown for various GST rates (0%, 5%, 12%, 18%, 28%)
- Display total amount in words
- Option for additional information like challan number, purchase order number, etc.
- Footer with declaration and signature section

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/gst-invoice-generator.git
   cd gst-invoice-generator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The application will run on `http://localhost:3000`.

## Usage

1. Fill in the seller and buyer details such as name, address, GSTIN, state, and other necessary information.
2. Add items with descriptions, HSN/SAC codes, quantities, and unit prices.
3. Review the tax summary and total amount.
4. Generate the invoice by viewing the formatted output in the invoice preview area.
5. Print or export the invoice as needed.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **JavaScript (ES6)**: For logic and interactivity.

## License

This project is open-source and available under the [MIT License](LICENSE).
