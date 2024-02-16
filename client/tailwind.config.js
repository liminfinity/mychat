/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
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
        sendMessageDisabled: '#428ae886',
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
        activeFriend: 'inset 0px 2px 25px 5px rgba(158, 161, 183, 0.15)',
        activeUser: 'inset 0px 2px 25px 5px rgba(158, 161, 183, 0.3)'
      },
      height: {
        "71": '17rem' 
      },
      keyframes: {
        error: {
          "0%": {
            transform: "translateY(-125%)",
            opacity: 0
          },
          "50%": {
            transform: "translateY(0)",
            opacity: 1
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 0
          }
        },
        open: {
          "0%": {
            opacity: 0
          },
          "100%": {
            opacity: 1
          }
        },
        recording: {
          "0%": {
            transform: "scale(1)"
          },
          "100%": {
            transform:"scale(1.3)",
          }
        }
      },
      animation: {
        openError: "error 6s cubic-bezier(.07,.14,.14,.99) forwards",
        openModal: 'open .5s cubic-bezier(.07,.14,.14,.99) forwards',
        recordingSpeech: 'recording 1.5s infinite cubic-bezier(.44,.12,.34,1.02) alternate'
      }

    },
    screens: {
      ...defaultTheme.screens,
      '550': '550px',
      '910': '910px',
      '970': '970px',
      '870': '870px',
      '800': '800px',
      '1100': '1100px',
    },
  },
  plugins: [],
}

