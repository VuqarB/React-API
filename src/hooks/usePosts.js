import { useMemo } from "react"

export const useSortedPosts = (posts, sort) => {
    const sortedPost = useMemo(() => {
        return sort
            ? [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
            : posts
    }, [sort, posts])

    return sortedPost
} 

export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort)
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter((post) => post.title.toLowerCase().includes(query))
      }, [query, sortedPosts])
    
    return sortedAndSearchedPosts
}