import { useEffect, useState } from 'react'
import './App.css'


//Display Posts
const DisplayPosts = ({posts , currentPage}) =>{
  //filter posts based on page
  const start = currentPage*10
  const end =  (currentPage*10)+10
  const filterPosts = posts.slice(start,end)

  return (
    <>
    <h4>Here are your posts</h4>
    {
      filterPosts && filterPosts?.length>0 && filterPosts.map((post)=>
          <div className='display-post '>
            <h5>{post.id}{". "}{post.title}</h5>
            <p>{post.body}</p>
          </div>
        )
    }
    </>
  )
}

//Display and calculate total no of pages
const FetchPagination=({pagination, totalPosts,setPage})=>{
  const totalPages = Math.ceil((totalPosts/pagination))
  const arr = Array(totalPages).fill('')
  console.log('Pagination Details', totalPages, arr)
  return (
    <div className='display-pagination'>
      {
       arr.map((_,page)=>
          <h5 className='page-number' onClick={()=>{setPage(page)}}>{page+1}</h5>
      )}
    </div>
  )
}

function App() {
  const [posts , setPosts]= useState([])
  const [currentpage , setPage]= useState(0)


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
      <DisplayPosts posts={posts} currentPage={currentpage}/>
      <FetchPagination pagination={10} totalPosts={posts.length} setPage={setPage}/>
    </>
  )
}

export default App