import classes from './MyModal.module.css'
import React from 'react'

const MyModal = ({ children, visible, setVisible }) => {

    const rootClasses = [classes.myModal]

    if (visible) {
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.myModalContent} onClick={(ev) => ev.stopPropagation()}>
                <h3 style={{ textAlign: 'center', margin: '20px 0' }}>Create new item</h3>
                {children}
            </div>
        </div>
    )
}

export default MyModal