import React from 'react'
import Header from '../Component/Public/Common/Header'
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Public/Common/Footer';
export default function PublicLayout() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}
