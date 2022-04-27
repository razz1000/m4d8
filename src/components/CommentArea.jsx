import { useState, useEffect } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea = (props) => {

    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)


    let fetchFunction = async () => {
        console.log ( "working on CommentArea")
        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' + props.asin, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU2YmNiZmE5MDIzOTAwMTVkOTY1YzYiLCJpYXQiOjE2NDk4NTE1ODMsImV4cCI6MTY1MTA2MTE4M30.1jc7LN9eMX4yZ7HWl4wazVJ2SyiKUzAHtFm0IglDnhY'
                }
            })
            console.log(response)
            if (response.ok) {
                let comments = await response.json()
                setComments(() => ({
                    comments,
                  }));
                  setIsLoading(() => ({
                    isLoading: false,
                  }));
                  setIsError(() => ({
                    isError: false,
                  }));
            } else {
                console.log('error')

                setIsLoading(() => ({
                    isLoading: false,
                }));                 
                setIsError(() => ({
                    isError: true,
                }));                 
            }
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
      if(comments !== [])  
        { 
        setIsLoading(true) 
        
         fetchFunction()}
    }, [comments])



    
        return (
            <div>
                {isLoading && <Loading />}
                {isError && <Error />}
                <AddComment asin={props.asin} />
                <CommentList commentsToShow={comments} />
            </div>
        )
    
}

export default CommentArea