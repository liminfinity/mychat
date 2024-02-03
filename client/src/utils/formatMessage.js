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