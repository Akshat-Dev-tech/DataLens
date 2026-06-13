import { useEffect, useState } from 'react'
import './App.css'


//Display Posts
const DisplayPosts = ({posts}) =>{
  return (
    <>
    <h4>Here are your posts</h4>
    {
      posts && posts?.length>0 && posts.map((post)=>
          <div className='display-post '>
            <h5>{post.title}</h5>
            <p>{post.body}</p>
          </div>
        )
    }
    </>
  )
}

const FetchPagination=({pagination, totalPosts})=>{
  const totalPages = Math.ceil((totalPosts/pagination))
  const arr = Array(totalPages).fill('')
  console.log('Pagination Details', totalPages, arr)
  return (
    <div className='display-pagination'>
      {
       arr.map((_,page)=>
          <h5 className='page-number'>{page+1}</h5>
      )}
    </div>
  )
}

function App() {
  const [posts , setPosts]= useState([])

  //Fetch Posts
  const getPosts = async() =>{
    const fetchposts = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await fetchposts.json()
    setPosts(data)
    console.log('Posts', data)
  }

  useEffect(()=>{
    getPosts()
  },[])


  return (
    <>
      <h1>Data Lens</h1>
      <DisplayPosts posts={posts}/>
      <FetchPagination pagination={10} totalPosts={posts.length}/>
    </>
  )
}

export default App