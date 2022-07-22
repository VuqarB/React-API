import React, { useRef } from 'react'
import PostList from '../components/PostList/PostList';
import { useEffect, useState } from "react"
import './../styles/App.css'
import PostForm from '../components/PostForm/PostForm';
import PostFilter from '../components/PostFilter/PostFilter';
import MyModal from '../components/UI/modal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import { useFetching } from '../hooks/useFetching';
import axios from 'axios';
import Loader from '../components/UI/loader/Loader';
import { getPageCount } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';
import PostSerive from './../API/PostService'

function Posts() {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const lastElement = useRef()


  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostSerive.getAll(limit, page)
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <MyButton onClick={fetchPosts}>Get Posts</MyButton>
      <MyButton style={{ marginTop: '30px', marginLeft: '10px' }} onClick={() => setModal(true)}>
        Create Item
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue='number of elements'
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: -1, name: 'show all'},
        ]}
      />
      {postError &&
        <h1 style={{ textAlign: 'center' }}>Error occurs ${postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'list of JS'} />
      <div ref={lastElement} style={{ height: 20, background: 'transparent' }} />
      {isPostLoading &&
        <Loader />
      }
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Posts;
