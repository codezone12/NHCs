import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Share2, Bookmark, MoreHorizontal, Send } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import GoToTop from '../components/GotToTop';

export default function NewsDetailPage() {
  const [commentText, setCommentText] = useState('');
  
  // Sample news article data
  const article = {
    title: "A Historic Gathering Marks the Beginning of an Eritrean Professional Network in Sweden",
    author: "Jane Smith",
    date: "April 25, 2025",
    category: "Technology",
    readTime: "8 min read",
    views: "2.4K",
    image: "/images/bf30b922-36c6-4ba7-b88b-41d7e9009c73.jpg",
    profile: "/images/newImages/images.jpg",
    content: [
      "On the 18th of May, an inspiring and emotionally rich event brought together three generations of Eritrean professionals in Sweden with a shared mission: to initiate and strengthen a sustainable Eritrean professional network and forge meaningful ties with professionals in Eritrea. Held in an atmosphere of unity and reflection, the gathering became more than just a meeting; it was a moment of intergenerational connection, storytelling, and vision casting.",
      "From the outset, attendees experienced a sense of community. The afternoon began with informal mingling at 14:45, followed by a warm welcome from Dr. Metkel at 15:00. His introduction set a tone of collaboration, and the icebreaker session helped bring together participants across generations, disciplines, and backgrounds. In his opening remarks, the Head of Mission, Embassy, Muhammed Ali (Wedi Gemahir) reflected on the significance of building professional unity and networks in the diaspora. A presentation by Eden and Dr. Metkel followed, highlighting the network’s purpose: to serve as a bridge between professionals in Sweden and Eritrea, with a focus on health sector transformation, capacity building, and shared learning. What truly set this gathering apart was the depth of generational exchange. Veteran Eritrean professionals shared vivid memories of their service during Eritrea’s liberation struggle, describing makeshift clinics in Sahel, scarce supplies, and the extraordinary spirit that sustained a people in crisis. These pioneers laid the foundation of a resilient healthcare system with their grit and commitment. For the younger professionals, these stories were not just history; they were living testimonies of courage, sacrifice, and nation-building. Middle-generation professionals offered a view into the post-independence evolution of Eritrea’s health sector, rapid developments in maternal health, child vaccination, and national strategies like the National Health Policy (NHP-2020) and the Health Sector Strategic Development Plan (HSSDP III). Their insights highlighted the progress and persistent challenges still facing the nation. The youngest participants, many of whom are health practitioners and researchers, listened with reverence and responded with excitement. Their contributions centered around digital health solutions, telemedicine, and data-driven health strategies. One participant, Dr. Vivian, remarked on the vast pool of knowledge that exists among doctors in Eritrea; “a treasure we must connect with and learn from.",
      "Among the most inspiring parts of the day was the tribute to Dr. Philip Gottlieb, a lifelong friend of the Eritrean people. A Swedish doctor and humanitarian, Dr. Philip was deeply active in the Eritrean Medical Association and the Eritrean Relief Association during the struggle for independence. He traveled to Sahel to provide critical medical aid under extremely difficult circumstances; an act that continues to symbolize international solidarity and courage. After Eritrea’s independence, Dr. Philip moved to Asmara with his family and remained committed to serving the nation. He was instrumental in establishing the gynecology clinic in Dekemhare, playing a pioneering role in women’s healthcare. His story of dedication moved many to tears and reminded the attendees of the profound impact one individual can have when compassion meets action.",
      "The event concluded with vibrant discussions on future plans. Ideas included launching telemedicine platforms to link specialists in Sweden with patients in Eritrea, organizing medical equipment donations, developing mental health and emergency preparedness programs, and creating sustainable structures to guide the network forward. A follow-up meeting is planned for September, where concrete steps will be taken to establish the platform’s long-term sustainability. This inaugural event was more than just a gathering; it was a movement in the making. It reawakened pride, reconnected generations, and reminded everyone present of the power of collective memory and vision. For those who attended, it was unforgettable. And for those who missed it, this story is a call to join the journey. As one participant, Dr Simon Berhane, put it, “If I hadn’t come, I would have regretted it deeply. But now that I have, I can’t wait for the next one"
    ],
    tags: ["Renewable Energy", "Technology", "Climate", "Innovation"]
  };

  // Sample related news
  const relatedNews = [
    {
      id: 1,
      title: "Global Climate Summit Results in New Emissions Targets",
      image: "/images/newImages/range-buildings-shore-reflecting-lake-clear-blue-sky.jpg",
      date: "April 24, 2025",
      readTime: "6 min read"
    },
    {
      id: 2,
      title: "Electric Vehicle Sales Surpass Traditional Cars For First Time",
      image: "/images/newImages/slider-images-2.jpg",
      date: "April 23, 2025",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "Tech Companies Pledge Carbon Neutrality by 2030",
      image: "/images/newImages/slider-images-3.jpg",
      date: "April 22, 2025",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "New Battery Technology Doubles Electric Vehicle Range",
      image: "/images/newImages/cr_weekly_post04.jpg.png",
      date: "April 21, 2025",
      readTime: "7 min read"
    }
  ];

  // Sample comments
  const comments = [
    {
      id: 1,
      user: "Alex Johnson",
      avatar: "/images/newImages/download (1).jpg",
      date: "2 hours ago",
      content: "This is incredible news! I've been following Dr. Chen's work for years and knew they were onto something big. Can't wait to see this technology implemented widely.",
      likes: 45,
      replies: [
        {
          id: 101,
          user: "Maria Garcia",
          avatar: "/images/newImages/download.jpg",
          date: "1 hour ago",
          content: "I agree! The efficiency improvements are impressive. My concern is how quickly this can be scaled for mass production.",
          likes: 12
        }
      ]
    },
    {
      id: 2,
      user: "Sam Wilson",
      avatar: "/images/newImages/images (1).jpg",
      date: "5 hours ago",
      content: "I'm curious about the longevity of these new panels. The article doesn't mention durability testing or expected lifespan compared to traditional panels.",
      likes: 28,
      replies: []
    },
    {
      id: 3,
      user: "Taylor Kim",
      avatar: "/images/newImages/images.jpg",
      date: "6 hours ago",
      content: "As someone working in the renewable energy sector, this is exactly the kind of innovation we need to see more of. The cost reduction potential alone makes this revolutionary.",
      likes: 56,
      replies: []
    }
  ];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit the comment to a backend
    setCommentText('');
    alert('Comment submitted! (This would be saved in a real application)');
  };

  return (
    <>
    <Header />
    <div className="bg-gray-50 min-h-screen">

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Article */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Article Header */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">{article.category}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500 text-sm">{article.date}</span>
                </div>
                
                <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 overflow-hidden"><img className='w-full h-full' src={article.profile}/></div>
                    <div>
                      <p className="font-medium">{article.author}</p>
                      <p className="text-sm text-gray-500">{article.readTime} • {article.views} views</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <Share2 size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <Bookmark size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Article Image */}
              <div className="w-full h-96 relative">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Article Content */}
              <div className="p-6">
                {article.content.map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                
                {/* Tags */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {/* Article Actions */}
                <div className="mt-8 flex items-center justify-between border-t border-b py-4">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                      <ThumbsUp size={20} />
                      <span>Like</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600">
                      <ThumbsDown size={20} />
                    </button>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                      <Share2 size={20} />
                      <span>Share</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                      <Bookmark size={20} />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Comments Section */}
              <div className="p-6 border-t">
                <h3 className="text-xl font-bold mb-6">Comments ({comments.length})</h3>
                
                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div className="flex-grow">
                      <textarea 
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      ></textarea>
                      <div className="flex justify-end mt-2">
                        <button 
                          type="submit" 
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
                          disabled={!commentText.trim()}
                        >
                          <Send size={16} className="mr-2" />
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                
                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map(comment => (
                    <div key={comment.id} className="mb-6">
                      <div className="flex items-start space-x-3">
                        <img 
                          src={comment.avatar} 
                          alt={comment.user}
                          className="w-10 h-10 rounded-full flex-shrink-0"
                        />
                        <div className="flex-grow">
                          <div className="flex items-center mb-1">
                            <span className="font-medium mr-2">{comment.user}</span>
                            <span className="text-sm text-gray-500">{comment.date}</span>
                          </div>
                          <p className="text-gray-800 mb-2">{comment.content}</p>
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center text-sm text-gray-500 hover:text-blue-600">
                              <ThumbsUp size={16} className="mr-1" />
                              <span>{comment.likes}</span>
                            </button>
                            <button className="flex items-center text-sm text-gray-500">
                              <ThumbsDown size={16} className="mr-1" />
                            </button>
                            <button className="text-sm text-gray-500 hover:text-blue-600">Reply</button>
                          </div>
                          
                          {/* Replies */}
                          {comment.replies.length > 0 && (
                            <div className="mt-4 ml-6 space-y-4">
                              {comment.replies.map(reply => (
                                <div key={reply.id} className="flex items-start space-x-3">
                                  <img 
                                    src={reply.avatar} 
                                    alt={reply.user}
                                    className="w-8 h-8 rounded-full flex-shrink-0"
                                  />
                                  <div>
                                    <div className="flex items-center mb-1">
                                      <span className="font-medium mr-2">{reply.user}</span>
                                      <span className="text-sm text-gray-500">{reply.date}</span>
                                    </div>
                                    <p className="text-gray-800 mb-2">{reply.content}</p>
                                    <div className="flex items-center space-x-4">
                                      <button className="flex items-center text-sm text-gray-500 hover:text-blue-600">
                                        <ThumbsUp size={16} className="mr-1" />
                                        <span>{reply.likes}</span>
                                      </button>
                                      <button className="flex items-center text-sm text-gray-500">
                                        <ThumbsDown size={16} className="mr-1" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar - Related News */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-6">Related News</h3>
              
              <div className="space-y-6">
                {relatedNews.map(news => (
                  <div key={news.id} className="flex items-start space-x-3">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-24 h-16 rounded-md object-cover flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-medium hover:text-blue-600 cursor-pointer">{news.title}</h4>
                      <div className="text-sm text-gray-500 mt-1 flex items-center">
                        <span>{news.date}</span>
                        <span className="mx-1">•</span>
                        <span>{news.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-6">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {["Technology", "Science", "Climate", "Politics", "Health", "Economy", "Sports"].map((tag, index) => (
                    <span key={index} className="bg-gray-100 hover:bg-blue-100 text-gray-800 hover:text-blue-600 px-3 py-1 rounded-full text-sm cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-bold text-lg mb-2">Newsletter</h4>
                <p className="text-sm text-gray-600 mb-4">Stay updated with our latest news and articles</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow rounded-l-lg border border-r-0 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg font-medium">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <GoToTop />
    <Footer />
    </>
  );
}