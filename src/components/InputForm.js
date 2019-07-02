import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

function InputForm(props) {
  const {
    fetchProjects,
    isFetchEnable,
    setQuery,
    page,
    query,
    scrollTouchedBot,
    isScrollBottom,
    setLoaderActivity,
    isLoaderActive,
  } = props

  const updateText = e => setQuery(e.target.value)

  useEffect(() => {
    isScrollBottom && !isLoaderActive && setLoaderActivity(true)
    isScrollBottom && isFetchEnable && fetchProjects(query, page)
  }, [
    setLoaderActivity,
    isLoaderActive,
    isScrollBottom,
    isFetchEnable,
    fetchProjects,
    query,
    page,
  ])

  useEffect(() => {
    const handleScroll = () => {
      return window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
        ? scrollTouchedBot(true)
        : isScrollBottom && scrollTouchedBot(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollTouchedBot, isScrollBottom])

  return (
    <Container>
      <Form>
        <Input
          value={query}
          onChange={updateText}
          placeholder="Search by github project"
          autoFocus
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
  const { isFetchEnable, page, query, isScrollBottom, isLoaderActive } = state
  return {
    isLoaderActive,
    isScrollBottom,
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
    setQuery: payload => {
      dispatch({
        type: 'SET_QUERY',
        payload,
      })
    },
    scrollTouchedBot: payload => {
      dispatch({
        type: 'SCROLL_TOUCHED_BOT',
        payload,
      })
    },
    setLoaderActivity: payload => {
      dispatch({
        type: 'SET_LOADER_ACTIVITY',
        payload,
      })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputForm)
