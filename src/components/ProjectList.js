import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

function ProjectList(props) {
  const { projects, isFetchEnable, page, message } = props

  return (
    <Container>
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
      <div>Page - {page}</div>
      <div>isFetchEnable - {`${isFetchEnable}`}</div>
      <div>Error messages - {message}</div>
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
  margin-top: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
`
const Name = styled.a``
const StarsCount = styled.div``
const WatchersCount = styled.div``

const mapStateToProps = state => {
  const { isFetchEnable, page, projects, message } = state

  return {
    projects,
    isFetchEnable,
    page,
    message,
  }
}

export default connect(mapStateToProps)(ProjectList)
