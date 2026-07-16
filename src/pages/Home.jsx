import React from 'react';
import Hero from '../components/Hero';
import PortfolioGrid from '../components/PortfolioGrid';

const Home = () => {
    return (
        <main id="main-content">
            <Hero />
            <PortfolioGrid limit={3} />
        </main>
    );
};

export default Home;
