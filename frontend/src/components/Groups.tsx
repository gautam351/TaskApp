import React from 'react'
import Header from './Header'
import GroupList from './GroupList'
import "./../css/GroupList.css"
const Groups = () => {
  return (
      <>
          {/* header section */}
          <Header />

          <div className="groups">
               {/* side list  section */}
          <div className="grpList">
          <GroupList />
          </div>

          {/* opened group window */}
          <div className="grpwindow">
              
          </div>
         </div>
          
      
      </>
  )
}

export default Groups