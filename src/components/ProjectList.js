import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

function ProjectList(props) {
  const { projects, isLoaderActive } = props

  return (
    <Container>
      {projects.map(project => {
        return (
          <Project key={`${project.full_name}-${project.id}`}>
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
      {isLoaderActive && <Loader>Fetching more projects...</Loader>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Project = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
  padding: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
`
const Name = styled.a``
const StarsCount = styled.div``
const WatchersCount = styled.div``
const Loader = styled.div``

const mapStateToProps = state => {
  const { projects, isLoaderActive } = state

  return {
    projects,
    isLoaderActive,
  }
}

export default connect(mapStateToProps)(ProjectList)
