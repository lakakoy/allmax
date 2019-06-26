import React, { useState } from 'react'
import styled from 'styled-components'

const axios = require('axios')
const jsonpAdapter = require('axios-jsonp')
const url = 'https://api.github.com/search/repositories'

export default function InputForm() {
  const [query, setQuery] = useState('react')
  const [projects, setProjects] = useState([])

  const updateText = e => setQuery(e.target.value)
  const handleClick = async () => {
    try {
      const results = await axios({
        url: `${url}?q=${query}`,
        adapter: jsonpAdapter,
      })

      if (results.data.data.items) {
        setProjects(results.data.data.items)
      }
    } catch (error) {}
  }
  const handleKeyPress = async e => {
    if (e.charCode === 13) {
      await handleClick()
    }
  }

  return (
    <Container>
      <Form>
        <Input
          value={query}
          onChange={updateText}
          placeholder="Search by github project"
          autoFocus
          onKeyPress={handleKeyPress}
        />
        <Button onClick={handleClick}>Search</Button>
      </Form>
      <ProjectsContainer>
        {projects.map(project => {
          return (
            <Project key={project.id}>
              <Name href={project.html_url}>{project.name}</Name>
              <StarsCount>
                Stargazers Count - {project.stargazers_count}
              </StarsCount>
              <WatchersCount>
                Watchers Count - {project.watchers_count}
              </WatchersCount>
            </Project>
          )
        })}
      </ProjectsContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const Form = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.15);
`
const Input = styled.input`
  width: 500px;
  font: inherit;
  font-size: 14px;
  border: none;
  outline: none;
  padding: 15px;
`
const Button = styled.button``

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Project = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
`

const Name = styled.a``
const StarsCount = styled.div``
const WatchersCount = styled.div``
