function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = data.type === 'vendor' ? 'Vendors' : 'Visitors';
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Sheet not found: ' + sheetName
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const timestamp = new Date();
    
    let rowData;
    if (data.type === 'vendor') {
      rowData = [
        timestamp,
        data.vendorName || '',
        data.profession || '',
        data.cardId || '',
        data.phoneNumber || '',
        data.visitingHouse || '',
        data.inTime || '',
        data.outTime || ''
      ];
    } else {
      rowData = [
        timestamp,
        data.visitorName || '',
        data.purpose || '',
        data.visitorAddress || '',
        data.phoneNumber || '',
        data.visitingHouse || '',
        data.inTime || '',
        data.outTime || ''
      ];
    }
    
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Entry recorded successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Visitor Register API is running');
}
