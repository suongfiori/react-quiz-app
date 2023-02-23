import React from 'react'

const ErrorMessage = ({children}) => {
  return (
    <div
        style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            borderRadius: 10,
            color: "#ffffff",
            backgroundColor: "orange",
            textAlign: "center",
            textTransform: "capitalize"
        }}
    >

        {children}
    </div>
  )
}

export default ErrorMessage