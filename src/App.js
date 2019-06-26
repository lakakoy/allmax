import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

export default function App() {
  return (
    <Container>
      <GlobalStyle />
      Allmax
    </Container>
  )
}

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans');
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Noto Sans', sans-serif;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: center;
`
