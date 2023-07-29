import React from 'react'

const Home = () => {
    const type = localStorage.getItem('TYPE');

  return (
    <div>
        {type === 'admin' ?
            <h4>You are Admin Role</h4>
        :
        <h4>You are Employee Role</h4>
        }

    </div>
  )
}

export default Home
