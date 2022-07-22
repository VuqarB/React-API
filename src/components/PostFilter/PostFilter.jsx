import MyInput from "../UI/input/MyInput"
import MySelect from "../UI/select/MySelect"
import React from 'react'

const PostFilter = ({ filter, setFilter }) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={(ev) => setFilter({ ...filter, query: ev.target.value })}
                placeholder='search...'
            />
            <MySelect
                value={filter.sort}
                onChange={(selectedSort) => setFilter({ ...filter, sort: selectedSort })}
                defaultValue='sorting'
                options={[
                    { value: 'title', name: 'by name' },
                    { value: 'body', name: 'by description' }
                ]}
            />
        </div>
    )
}

export default PostFilter