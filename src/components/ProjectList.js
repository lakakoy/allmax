// @flow
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

type Props = {
  areProjectsAvailable: boolean,
  isLoaderActive: boolean,
  projects: Array<Object>,
}

function ProjectList(props: Props) {
  const { areProjectsAvailable, isLoaderActive, projects } = props

  return (
    <Container>
      {projects.map(project => (
        <Project key={project.id}>
          <Name href={project.html_url}>{project.name}</Name>
          <StarsCount>{`Stargazers Count - ${project.stargazers_count}`}</StarsCount>
          <WatchersCount>{`Watchers Count - ${project.watchers_count}`}</WatchersCount>
        </Project>
      ))}
      {!areProjectsAvailable && (
        <NoProjects>No projects available. Please try to enter another request.</NoProjects>
      )}
      {isLoaderActive && <Loader>Fetching projects...</Loader>}
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
const Loader = styled.div`
  margin: 15px 0;
`
const NoProjects = styled.div`
  margin-top: 15px;
`

const mapStateToProps = (state) => {
  const { projects, isLoaderActive, areProjectsAvailable } = state

  return {
    projects,
    isLoaderActive,
    areProjectsAvailable,
  }
}

export default connect(mapStateToProps)(ProjectList)
