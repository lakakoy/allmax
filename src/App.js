import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import InputForm from './components/InputForm'

export default function App() {
  return (
    <Container>
      <GlobalStyle />
      Allmax
      <InputForm />
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
  flex-direction: column;
  align-items: center;
`
