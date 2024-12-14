export function numberToWords(num) {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  
    if (num === 0) return 'Zero';
  
    function convertLessThanOneThousand(n) {
      if (n >= 100) {
        return ones[Math.floor(n / 100)] + ' Hundred ' + convertLessThanOneThousand(n % 100);
      }
      if (n >= 20) {
        return tens[Math.floor(n / 10)] + ' ' + ones[n % 10];
      }
      if (n >= 10) {
        return teens[n - 10];
      }
      return ones[n];
    }
  
    let result = '';
    if (num >= 10000000) {
      result += convertLessThanOneThousand(Math.floor(num / 10000000)) + ' Crore ';
      num %= 10000000;
    }
    if (num >= 100000) {
      result += convertLessThanOneThousand(Math.floor(num / 100000)) + ' Lakh ';
      num %= 100000;
    }
    if (num >= 1000) {
      result += convertLessThanOneThousand(Math.floor(num / 1000)) + ' Thousand ';
      num %= 1000;
    }
    result += convertLessThanOneThousand(num);
  
    return result.trim() + ' Rupees Only';
  }
  
  