import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

function InputForm(props) {
  const {
    setFetchAvailability,
    fetchProjects,
    isFetchEnable,
    setQuery,
    page,
    query,
  } = props

  const updateText = e => setQuery(e.target.value)
  const handleKeyPress = async e => {
    if (e.charCode === 13) {
      fetchProjects(query, page)
    }
  }

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        isFetchEnable
      ) {
        console.log('hello', isFetchEnable)
        setFetchAvailability(false)
        fetchProjects(query, page)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page, isFetchEnable, fetchProjects, query, setFetchAvailability])

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
      </Form>
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

const mapStateToProps = state => {
  const { isFetchEnable, page, query } = state
  return {
    isFetchEnable,
    page,
    query,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchProjects: (query, page) =>
      dispatch({
        type: 'PROJECTS_FETCH_REQUESTED',
        payload: { query, page },
      }),
    setFetchAvailability: payload => {
      dispatch({
        type: 'SET_FETCH_AVAILABILITY',
        payload,
      })
    },
    setQuery: payload => {
      dispatch({
        type: 'SET_QUERY',
        payload,
      })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputForm)
