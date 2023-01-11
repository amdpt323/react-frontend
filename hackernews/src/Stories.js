import React from 'react'
import { useGlobalContext } from './context'

const Stories = () => {
  const {isLoading,hits,removeStory} = useGlobalContext()
  if(isLoading){
    return <div>Loading</div>
  }
  return (
    <div>
      {hits.map((data)=>{
        console.log(data)
        const { objectID, title, num_comments, url, points, author } = data
        return (
          <article key={objectID}>
            <p>{title}</p>
            {url != null ? (
              <div>
                <a href={url} target='_blank' rel='noreferrer'>
                  link
                </a>
                <div onClick={() => removeStory(objectID)}>remove story</div>
              </div>
            ) : null}
            
          </article>
        )
      })}
    </div>
  )
}

export default Stories