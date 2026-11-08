import React from 'react'
import '../styles/Home.css'
import HeroSection from '../components/HeroSection';
import CategoryBanner from '../components/CategoryBanner';
import CategoryList from '../components/CategoryList';
import Chatbot from '../components/Chatbot';
import AllProducts from './AllProducts';

const Home = () => {
  return (
    <div className='home '>
    
    <main className='container home-main'>
    <HeroSection />
    <CategoryBanner />
    <CategoryList />
    <Chatbot />
    <AllProducts />
   

    </main>
    </div>
  )
}

export default Home