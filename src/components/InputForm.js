import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

function InputForm(props) {
  const { fetchProject } = props

  const [isScrollAvailable, setScrollAvailability] = useState(true)
  const [query, setQuery] = useState('react')
  const [page, setPage] = useState(1)

  const updateText = e => setQuery(e.target.value)
  const handleKeyPress = async e => {
    if (e.charCode === 13) {
      fetchProject(query, page)
    }
  }

  // Infinite Scroll Pagination
  useEffect(() => {
    const scrollHandler = () => {
      const windowBottom =
        'innerHeight' in window
          ? window.innerHeight + window.pageYOffset
          : document.documentElement.offsetHeight + window.pageYOffset

      if (windowBottom >= document.body.scrollHeight && isScrollAvailable) {
        setScrollAvailability(!isScrollAvailable)
        setPage(page + 1)
        fetchProject(query, page)
      }
    }

    window.addEventListener('scroll', () => scrollHandler())
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [
    page,
    query,
    isScrollAvailable,
    setScrollAvailability,
    setPage,
    fetchProject,
  ])
  //

  return (
    <Container>
      <div onClick={() => setPage(page + 1)}>{page}</div>
      <Form>
        <Input
          value={query}
          onChange={updateText}
          placeholder="Search by github project"
          autoFocus
          onKeyPress={handleKeyPress}
        />
        <Button onClick={() => fetchProject(query, page)}>Search</Button>
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
const Button = styled.button``

const mapDispatchToProps = dispatch => {
  return {
    fetchProject: (query, page) =>
      dispatch({
        type: 'PROJECTS_FETCH_REQUESTED',
        payload: { query, page },
      }),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(InputForm)
