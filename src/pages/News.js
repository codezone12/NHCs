import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainNewsSection from '../components/news-components/main-news';
import TrendingNewsSection from '../components/news-components/trending-news';
import LatestInsightsUpdatesSection from '../components/news-components/latest-insights';
import TopWeekly from '../components/news-components/top-weekly';
import ShareNewsSection from '../components/news-components/share-news';

const NewsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MainNewsSection />
      <TrendingNewsSection />
      <LatestInsightsUpdatesSection />
      <TopWeekly />
      <ShareNewsSection />
      <Footer />
    </div>
  );
};

export default NewsPage;