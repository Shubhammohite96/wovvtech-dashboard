import CryptoJS from "crypto-js";


// Base64 decode the key and IV
const KEY = CryptoJS.enc.Base64.parse("2b7e151628aed2a6abf7158809cf4f3c");
const IV = CryptoJS.enc.Base64.parse("S4duQOLzqeKP3rf8nSb5Ow==");

export let getUsersFileList = async (payload: { pageUrl: string; entityName: string; action: string; event: string; formList: { entityName: string; employeeIds: any; tenantId: string; }[]; }) => {
    const requestOptions = {
        method: "POST",
        body: JSON.stringify(payload),
    };

    return await fetch("https://okenapi.wovvtech.com/ipos/rest/bpm/process?tenantId=_2012119111109", requestOptions).then((response) => response.json())
        .then((result) =>  result)

}



export const decryptData = (encryptedData: string | CryptoJS.lib.CipherParams) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, KEY, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: IV
      });
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      
      return null;
    }
  };


  export function convertToUTC(dateStr: any, timeStr: string) {
    
    // Create a new Date object in IST (Indian Standard Time UTC+5:30)
    let istDate = new Date(`${dateStr}T${timeStr}:00+05:30`);
    

    // Convert to UTC timestamp (milliseconds)
    let utcTimestamp = istDate.getTime();

    // Convert to UTC date-time string
    let utcDate = new Date(utcTimestamp).toISOString(); // Convert to readable UTC format

    
    
    return { utcTimestamp, utcDate };
}


  export const fetchEncryptedFile = async (url: RequestInfo | URL) => {
    return await fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.text();
  })
  .then(data =>  data).catch(error => error);
  };