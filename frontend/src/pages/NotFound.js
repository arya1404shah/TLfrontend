import React from 'react'
import ErrorTemplate from './ErrorTemplate'
import { ReactComponent as Illustration } from '../assets/images/404.svg'

function NotFound() {
  return (
    <ErrorTemplate
      errCode={404}
      content="Looks like the page you're looking for does not exist!"
      image = {<Illustration style={{maxWidth: "100%"}} />}
      attribution={<a href={"https://www.streamlinehq.com"}>Free Page Not Found 5 PNG illustration by Streamline</a>}
    /> 
  )
}

export default NotFound