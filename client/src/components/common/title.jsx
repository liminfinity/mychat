import React from 'react'

export default function Title({level, children}) {
    let component;
    switch (level) {
        case 1: {
            component = <h1>{children}</h1>
            break;
        }
        case 2: {
            component = <h2>{children}</h2>
            break;
        }
        case 3: {
            component = <h3>{children}</h3>
            break;
        }
        case 4: {
            component = <h4>{children}</h4>
            break;
        }
        case 5: {
            component = <h5>{children}</h5>
            break;
        }
        case 6: {
            component = <h6>{children}</h6>
            break;
        }
        default: {
            component = <h2>{children}</h2>
            break;
        }
    }
  return component
}
