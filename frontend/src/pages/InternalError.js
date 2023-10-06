import React from 'react'
import ErrorTemplate from './ErrorTemplate'
import { ReactComponent as Illustration } from '../assets/images/500.svg'
function InternalError() {
  return (
    <ErrorTemplate
      errCode={500}
      content="Something went wrong! Feel free to contact us if you feel this is a mistake"
      image={<Illustration style={{maxWidth: "100%"}} />}
      attribution={<a href={"https://www.streamlinehq.com"}>Free Fatal Error 4 PNG illustration by Streamline</a>}
    /> 
  )
}

export default InternalError