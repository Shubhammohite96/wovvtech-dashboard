// @ts-ignore
export const groupDataByHourlySlots = (data) => {
    const groupedData = {};
  // @ts-ignore
    data.forEach((entry) => {
      const { timestamp, key } = entry;
  
      // Replace commas and ensure valid date parsing
      const validTimestamp = timestamp.replace(",", "."); // Replace ',' with '.' for milliseconds
      const date = new Date(validTimestamp);
  
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", timestamp);
        return; // Skip invalid dates
      }
  
      const hour = date.getHours();
      const nextHour = hour + 1;
      const slot = `${hour}-${nextHour}`;
  // @ts-ignore
      if (!groupedData[slot]) {
        // @ts-ignore
        groupedData[slot] = [];
      }
  // @ts-ignore
      groupedData[slot].push({ timestamp, key });
    });
  
    return groupedData;
  };


// @ts-ignore
  export const groupDataBySlots = (data) => {
    // @ts-ignore
    const groupedData = [];
    data.forEach((entry) => {
      const { timestamp, key } = entry;
      const validTimestamp = timestamp.replace(",", "."); // Replace ',' with '.' for milliseconds
      groupedData.push({ timestamp, key });
    });
  
    return groupedData;
  }



  export const parseLogFile = (rawText) => {
    const lines = rawText.split("\n"); // Split by new lines
    return lines
      .map((line) => {
        // Match the timestamp and action using a regex
        const match = line.match(/^\["(.+?)", "(.+?)"\]/);
        if (match) {
          const [_, timestamp, action] = match;
          return [timestamp, action];
        }
        return null; // Skip lines that don't match the format
      })
      .filter(Boolean); // Remove null entries
  };



  export const analyzeKeylogData = (data) => {
    const invisibleKeysSet = new Set([
      "left-cmd", "right-cmd", "left-ctrl", "right-ctrl", "right-shift", "shift", "esc", "up", "down", "left", "right",
      "caps", "fn", "del", "fwddel", "home", "end", "pgup", "pgdown", "volup", "voldown", "mute",
      "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "f13", "f14", "f15",
      "f16", "f17", "f18", "f19", "f20", "clear", "equals", "hyphen", "plus"
    ]);
  
    const whitespaceKeysSet = new Set(["spacebar", "tab", "return"]);
  
    let totalKeys = 0;
    let whitespaceKeys = 0;
    let invisibleKeys = 0;
    let visibleKeys = 0;
  
    data.forEach(({ key }) => {
      totalKeys++;
      const cleanKey = key.replace(/"/g, ""); // Remove quotes
      if (whitespaceKeysSet.has(cleanKey)) {
        whitespaceKeys++;
      } else if (invisibleKeysSet.has(cleanKey)) {
        invisibleKeys++;
      } else {
        visibleKeys++;
      }
    });
  
    // Calculate percentages
    const whitespacePercentage = ((whitespaceKeys / totalKeys) * 100).toFixed(1);
    const visiblePercentage = ((visibleKeys / totalKeys) * 100).toFixed(1);
  
    // Generate the result object
    return {
      totalKeys,
      whitespaceKeys,
      visibleKeys,
      invisibleKeys,
      totalKeysBelow10k: totalKeys < 10000,
      whitespaceExceeds75: whitespacePercentage > 75,
      visibleExceeds85: visiblePercentage > 85,
      visibleBelow3: visiblePercentage < 3,
      whitespacePercentage,
      visiblePercentage,
    };
  };



  const RESTRICTIONS = {
    minUsage: {
      vscode: 1200, // 20 minutes minimum usage required
      postman: 600, // 10 minutes minimum usage required
    },
    maxUsage: {
      youtube: 1200, // 20 minutes max usage allowed
      netflix: 1800, // 30 minutes max usage allowed
    }
  };
  
  export const categorizeUsage = (data, type) => {
    let categories = {
      development: { total: 0, details: [] },
      socialMedia: { total: 0, details: [] },
      entertainment: { total: 0, details: [] },
      other: { total: 0, details: [] },
      flagged: [],
    };
  
    data.forEach((item) => {
      const { appId, websiteId, seconds } = item;
      const name = type === "app" ? appId : websiteId;
      const timeUsed = seconds;
  
      if (["Visual Studio Code", "GitHub", "FileZilla", "Postman"].includes(name)) {
        categories.development.total += timeUsed;
        categories.development.details.push({ name, timeUsed });
        if (RESTRICTIONS.minUsage[name.toLowerCase()] && timeUsed < RESTRICTIONS.minUsage[name.toLowerCase()]) {
          categories.flagged.push({ name, timeUsed, reason: "Less than required usage" });
        }
      } else if (["Facebook", "Instagram", "Twitter"].includes(name)) {
        categories.socialMedia.total += timeUsed;
        categories.socialMedia.details.push({ name, timeUsed });
      } else if (["YouTube", "Netflix"].includes(name)) {
        categories.entertainment.total += timeUsed;
        categories.entertainment.details.push({ name, timeUsed });
        if (RESTRICTIONS.maxUsage[name.toLowerCase()] && timeUsed > RESTRICTIONS.maxUsage[name.toLowerCase()]) {
          categories.flagged.push({ name, timeUsed, reason: "Exceeds allowed limit" });
        }
      } else {
        categories.other.total += timeUsed;
        categories.other.details.push({ name, timeUsed });
      }
    });
  
    return categories;
  };