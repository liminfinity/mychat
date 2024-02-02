/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{jsx, tsx, js, ts}"
  ],
  theme: {
    extend: {
      colors: {
        friendMessage: '#ebf3fe',
        myMessage: '#f7f7f9',
        text_color_main: '#9ea1b7',
        sendMessage: '#4694f9',
        mainColor: '#79b0fa',
        secondColor: '#f5f6fa',
        onlineStatus: '#48d984',
        offlineStatus: '#ebeced',
        text_color_myName: '#79b0fa',
        
      }
    },
  },
  plugins: [],
}

