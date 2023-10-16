import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

//          component: 레이아웃 컴포넌트          //
export default function Container() {


  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
