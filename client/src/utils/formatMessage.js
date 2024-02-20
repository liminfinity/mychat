export function getDate(timestamp) {
    const now = new Date();
    let timeMessage = '';
    if (timestamp.toLocaleDateString() === now.toLocaleDateString()) {
      const time = timestamp.toLocaleTimeString()
      timeMessage += time.slice(0, time.lastIndexOf(':'));
    } else {
      timeMessage += timestamp.toLocaleDateString();
    }
    return timeMessage
}

export function getUsername(fName, lName) {
  return `${lName} ${fName}`
}
export function sliceLongMessage(message) {
  let spaceIndex = 0;
  let formatMessage = '';
  while(true) {
    if (27 + spaceIndex === 32) {
      formatMessage = `${message.slice(0, 28 + spaceIndex)}...`
      break;
    }
    if (message[27 + spaceIndex] != ' ') {
      formatMessage = `${message.slice(0, 28 + spaceIndex)}...`
      break;
    }
    else {
      spaceIndex++
    }
  }
  return formatMessage;
}