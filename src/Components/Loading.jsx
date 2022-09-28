import React from "react"
import Spinner from "react-bootstrap/Spinner"

function Loading(props) {

  const styles = {
    spinner: {
      position: "fixed",
      top: "50%",
      left: "50%"
    }

  }

  const { loading, children} = props

  if (loading) {
    return (<Spinner style={styles.spinner} animation="border" variant="danger" />)
  } else {

    return (
      <>

        {children}

      </>
    )
  }


}
export default Loading

//<Spinner animation={configspinner?.animation="grow"} variant={configspinner?.variant="danger"}/>