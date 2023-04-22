async function readTag() {
    if ("NDEFReader" in window) {
      const ndef = new NDEFReader();
      try {
        await ndef.scan();
        ndef.onreading = event => {
          console.assert(record.recordType === "mime");
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            consoleLog("Record type:  " + record.recordType);
            consoleLog("MIME type:    " + record.mediaType);
            console.log(`JSON: ${JSON.parse(decoder.decode(record.data))}`);
            consoleLog("Serial:    " + record.serialNumber);
          }
        }
      } catch(error) {
        consoleLog(error);
      }
    } else {
      consoleLog("Web NFC is not supported.");
    }
  }
  
async function writeTag() {
if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    try {
    await ndef.write("What Web Can Do Today");
    consoleLog("NDEF message written!");
    } catch(error) {
    consoleLog(error);
    }
} else {
    consoleLog("Web NFC is not supported.");
}
}

function consoleLog(data) {
var logElement = document.getElementById('log');
logElement.innerHTML += data + '\n';
}
