"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"
const myProfile = () => {
  const { data : session} = useSession()
  const [posts, setAllPosts] = useState([])
  const router = useRouter()

  const handleEdit = (post) => {
     router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete =  async (post) => {
     const hasConfirmed = confirm("Are you sure want delete this prompt?")

     if(hasConfirmed) {
      try{

       await fetch(`/api/prompt/${post._id.toString()}` , {
        method: "DELETE",

       });

       const filteredPosts = posts.filter((p) => p._id !== post._id)
       setAllPosts(filteredPosts)
      }catch(err){

      }
     }
  }

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
   if(session?.user.id) fetchPosts();
  }, []);

  return (

    <Profile
      name="My"
      desc="Welcome to your personalised profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />

  )
}

export default myProfile