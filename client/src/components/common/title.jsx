import React from 'react'

export default function Title({children, level}) {
/*     let component;
    switch (level) {
        case 1: {
            component = <h1>{children}</h1>
        }
        case 2: {
            component = <h2>{children}</h2>
        }
        case 3: {
            component = <h3>{children}</h3>
        }
        case 4: {
            component = <h4>{children}</h4>
        }
        case 5: {
            component = <h5>{children}</h5>
        }
        case 6: {
            component = <h6>{children}</h6>
        }
        default: {
            component = <h2>{children}</h2>
        }
    } */
  return (
    <h2>{children}</h2>
  )
}
