# Google Apps Script Setup Instructions

To store the booking data in your Google Sheet, follow these steps:

1.  Open your Google Sheet.
2.  Go to **Extensions** > **Apps Script**.
3.  Delete any code in `Code.gs` and paste the following:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Parse the POST data
  var data = JSON.parse(e.postData.contents);
  
  // Add row with timestamp
  sheet.appendRow([
    new Date(),
    data.name,
    data.place,
    data.phone,
    data.phone2, 
    data.address,
    data.post,
    data.pinCode,
    data.copies,
    data.copies * 250, // Total Price
    data.paymentMethod
  ]);
  
  // Return success response with CORS headers
  return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4.  Click **Deploy** > **New deployment**.
5.  Click the **Select type** icon (gear) > **Web app**.
6.  Fill in the details:
    *   **Description**: "Booking API"
    *   **Execute as**: **Me** (your email)
    *   **Who has access**: **Anyone**
7.  Click **Deploy**.
8.  Copy the **Web app URL** (it starts with `https://script.google.com/macros/s/...`).
9.  Update `AlMuneerBookingModal.tsx` or your `.env` file with this URL. I have added a placeholder for now.
