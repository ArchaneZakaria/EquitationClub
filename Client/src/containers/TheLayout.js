import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import {Redirect} from 'react-router-dom'
const TheLayout = (props) => {
  if(!props.authorized){
    return <Redirect to='/login'></Redirect>
  }else{
    return (
      <div className="c-app c-default-layout">
        <TheSidebar/>
        <div className="c-wrapper">
          <TheHeader/>
          <div className="c-body">
            <TheContent/>
          </div>
          <TheFooter/>
        </div>
      </div>
    )
  }
  
}

export default TheLayout
