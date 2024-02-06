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
        title: '#151450',
        text_color_main: '#9ea1b7',
        sendMessage: '#4694f9',
        sendMessageHover: '#428ae8',
        mainColor: '#FFF',
        secondColor: '#f5f6fa',
        onlineStatus: '#48d984',
        offlineStatus: '#ebeced',
        text_color_myName: '#79b0fa',
        error: '#ea5656'
      },
      transitionDuration: {
        DEFAULT: '.5s'
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out'
      },
      boxShadow: {
        activeFriend: 'inset 0px 2px 25px 5px rgba(158, 161, 183, 0.15)'
      },
      keyframes: {
        error: {
          "0%": {
            transform: "translate(-100%)"
          },
          "50%": {
            transform: "translate(20%)"
          },
          "100%": {
            transform: "translate(-120%)"
          }
        }
      },
      animation: {
        openError: "error 10s ease-out forwards"
      }

    },
  },
  plugins: [],
}
