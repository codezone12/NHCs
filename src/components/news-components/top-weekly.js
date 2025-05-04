import { useState } from 'react';
import ImagePreview from '../image-preview';

const TopWeekly = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      category: "TECH",
      image: "/images/cr_mining_post01.jpg.png",
      title: "How To Protect Your App With A Model Based On JSONP",
      author: "Branded builder and human-super computer symbiosis product of chocolate x Ray factory",
      date: "27 August, 2024",
      readTime: "10 Min Read"
    },
    {
      id: 2,
      category: "FINANCE",
      image: "/images/cr_mining_post02.jpg.png",
      title: "Beyond Algorithms: Skills Of Designers That AI Can't Duplicate",
      author: "Branded builder and human-super computer symbiosis product of chocolate x Ray factory",
      date: "27 August, 2024",
      readTime: "10 Min Read"
    },
    {
      id: 3,
      category: "DESIGN",
      image: "/images/cr_mining_post05.jpg.png",
      title: "A Comprehensive Checklist For Design Workshops",
      author: "Branded builder and human-super computer symbiosis product of chocolate x Ray factory",
      date: "27 August, 2024",
      readTime: "10 Min Read"
    },
    {
      id: 4,
      category: "DESIGN",
      image: "/images/cr_trending_post05.jpg.png",
      title: "Overcoming The Challenges Of Creation For International Websites",
      author: "Branded builder and human-super computer symbiosis product of chocolate x Ray factory",
      date: "27 August, 2024",
      readTime: "10 Min Read"
    }
  ]);

  const [popularArticles, setPopularArticles] = useState([
    {
      id: 5,
      category: "DESIGN",
      image: "/images/cr_weekly_post04.jpg.png",
      title: "Simplifying Web Design And UX Prototyping",
      date: "27 August, 2024",
      readTime: "10 Min Read"
    },
    {
      id: 6,
      category: "TECH",
      image: "/images/bitcoin-image.png",
      title: "Getting Internationalization (i18n) Right With Demo API",
      date: "27 August, 2024",
      readTime: "10 Min Read"
    },
    {
      id: 7,
      category: "DESIGN",
      image: "/images/cr_mining_post01.jpg.png",
      title: "A Step-By-Step Guide To Building Accessible Carousels",
      date: "27 August, 2024",
      readTime: "10 Min Read"
    }
  ]);

  const ArticleCard = ({ article, isLarge }) => (
    <div className={`mb-6 ${isLarge ? 'md:col-span-1' : ''}`}>
      <div className="relative overflow-hidden rounded-lg">
        <ImagePreview 
          src={article.image} 
          alt={article.title} 
          className="w-full h-48 object-cover" 
        />
        <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
          {article.category}
        </span>
      </div>
      <h3 className="font-bold text-lg mt-3 leading-tight">
        {article.title}
      </h3>
      {isLarge && (
        <p className="text-gray-600 text-sm mt-2">
          {article.author}
        </p>
      )}
      <div className="flex items-center text-xs text-gray-500 mt-2">
        <span>{article.date}</span>
        <span className="mx-2">•</span>
        <span>{article.readTime}</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-1">Top Weekly Trending Topics</h1>
        <p className="text-gray-600">Stay informed with our top weekly news articles.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="w-full text-lg font-bold mb-6 pb-2 inline-block relative">
            Weekly Best News
            <div className="absolute flex justify-start w-full h-[4px] bg-gray-200 overflow-hidden border-[0px] border-x-0 border-gray-500 top-full">
              <div className='w-[100px] h-[100px] -translate-x-[50%] -translate-y-[60%] bg-yellow-400 transform rotate-45'></div>
              <div className='w-[10px] h-[100px] -translate-x-[400%] -translate-y-[50%] bg-blue-500 transform rotate-45'></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.slice(0, 2).map(article => (
              <ArticleCard key={article.id} article={article} isLarge={true} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {articles.slice(2, 4).map(article => (
              <ArticleCard key={article.id} article={article} isLarge={true} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="w-full text-lg font-bold mb-6 pb-2 inline-block relative">
            Popular News
            <div className="absolute flex justify-start w-full h-[4px] bg-gray-200 overflow-hidden border-[0px] border-x-0 border-gray-500 top-full">
              <div className='w-[100px] h-[100px] -translate-x-[50%] -translate-y-[60%] bg-yellow-400 transform rotate-45'></div>
              <div className='w-[10px] h-[100px] -translate-x-[400%] -translate-y-[50%] bg-blue-500 transform rotate-45'></div>
            </div>
          </h2>
          
          <div className="space-y-6">
            {popularArticles.map(article => (
              <div key={article.id} className="flex flex-col mb-6">
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <ImagePreview 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-36 object-cover" 
                  />
                  <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {article.category}
                  </span>
                </div>
                <h3 className="font-bold text-base leading-tight">
                  {article.title}
                </h3>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopWeekly;