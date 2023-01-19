import React, { useState, useEffect, useContext } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext()

const GithubContextProvider = ({ children }) => {
  const [user, setUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  const [loading, setIsLoading] = useState(false)
  const [requests, setRequests] = useState(0)
  const [error, setError] = useState({ show: false, msg: '' })

  const chechRequest = async () => {
    await axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data
        setRequests(remaining)
        if (remaining === 0) {
          toggleError(true, 'Sorry , You have Exeeded your hourly rate limit')
        }
      })
      .catch((err) => console.log(err))
  }

  const searchUser = async (user) => {
    toggleError()
    setIsLoading(true)
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    )
    if (response) {
      setUser(response.data)
      const { login, followers_url } = response.data
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ]).then((results) => {
        console.log(results)
        const [repos,followers] = results
        const status = 'fulfilled'
        if(repos.status===status){
          setRepos(repos.value.data);
        }
        if(followers.status===status){
          setFollowers(followers.value.data)
        }
      })
    } else {
      toggleError(true, 'there is no user with that username')
    }
    chechRequest()
    setIsLoading(false)
  }

  const toggleError = (show = false, message = '') => {
    setError({ show, msg: message })
  }

  useEffect(() => {
    chechRequest()
  }, [])

  return (
    <GithubContext.Provider
      value={{
        user,
        repos,
        followers,
        setUser,
        requests,
        error,
        searchUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GithubContext)
}

export { GithubContext, GithubContextProvider }
