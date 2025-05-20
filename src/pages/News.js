import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainNewsSection from '../components/news-components/main-news';
import TrendingNewsSection from '../components/news-components/trending-news';
import LatestInsightsUpdatesSection from '../components/news-components/latest-insights';
import TopWeekly from '../components/news-components/top-weekly';
import ShareNewsSection from '../components/news-components/share-news';
import NewsGrid from '../components/news-components/news-grid';
import GoToTop from '../components/GotToTop';

const NewsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      {/* <MainNewsSection />
      <TrendingNewsSection />
      <LatestInsightsUpdatesSection /> */}
      <NewsGrid />
      <TopWeekly />
      <ShareNewsSection />
      <GoToTop />
      <Footer />
    </div>
  );
};

export default NewsPage;