// @flow
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

type Props = {
  areProjectsAvailable: boolean,
  isScrollBottom: boolean,
  isLoaderActive: boolean,
  isFetchEnable: boolean,
  isLastPage: boolean,
  setProjectAvailability: Function,
  setLoaderActivity: Function,
  scrollTouchedBot: Function,
  fetchProjects: Function,
  setQuery: Function,
  query: string,
  page: number,
}

function InputForm(props: Props) {
  const {
    areProjectsAvailable,
    isScrollBottom,
    isLoaderActive,
    isFetchEnable,
    isLastPage,
    setProjectAvailability,
    setLoaderActivity,
    scrollTouchedBot,
    fetchProjects,
    setQuery,
    query,
    page,
  } = props

  const updateText = (e) => {
    setQuery(e.target.value)
    if (!areProjectsAvailable) {
      setProjectAvailability(true)
    }
  }

  useEffect(() => {
    if (isScrollBottom && !isLoaderActive && !isLastPage) {
      setLoaderActivity(true)
    }
    if (isScrollBottom && isFetchEnable) {
      fetchProjects(query, page)
    }
  }, [
    isLastPage,
    setLoaderActivity,
    isLoaderActive,
    isScrollBottom,
    isFetchEnable,
    fetchProjects,
    query,
    page,
  ])

  useEffect(() => {
    const detectScrollAtBottom = () => {
      if (document.documentElement !== null && document.body !== null) {
        const windowHeight = window.innerHeight
          ? window.innerHeight
          : document.documentElement.offsetHeight
        const { body } = document
        const html = document.documentElement
        const docHeight = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight,
        )
        const windowBottom = Math.round(windowHeight + window.pageYOffset)

        const difference = docHeight - windowBottom
        const additional = difference >= 1 && difference <= 2 ? difference : 0

        return windowBottom + additional >= docHeight
      }
      return null
    }

    const handleScroll = () => {
      if (detectScrollAtBottom()) {
        return !isScrollBottom && scrollTouchedBot(true)
      }
      return isScrollBottom && scrollTouchedBot(false)
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

const mapStateToProps = (state) => {
  const {
    isFetchEnable,
    page,
    query,
    isScrollBottom,
    isLoaderActive,
    areProjectsAvailable,
    isLastPage,
  } = state

  return {
    areProjectsAvailable,
    isLoaderActive,
    isScrollBottom,
    isFetchEnable,
    page,
    query,
    isLastPage,
  }
}
const mapDispatchToProps = dispatch => ({
  fetchProjects: (query, page) => dispatch({
    type: 'PROJECTS_FETCH_REQUESTED',
    payload: { query, page },
  }),
  setQuery: (payload) => {
    dispatch({
      type: 'SET_QUERY',
      payload,
    })
  },
  scrollTouchedBot: (payload) => {
    dispatch({
      type: 'SCROLL_TOUCHED_BOT',
      payload,
    })
  },
  setLoaderActivity: (payload) => {
    dispatch({
      type: 'SET_LOADER_ACTIVITY',
      payload,
    })
  },
  setProjectAvailability: (payload) => {
    dispatch({
      type: 'SET_PROJECTS_AVAILABILITY',
      payload,
    })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputForm)
