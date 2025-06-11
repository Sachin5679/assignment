'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect,useState } from 'react'

export default function DashboardPage() {
  const { data: session, status } = useSession()

  const [articles, setArticles]=useState<any[]>([]);
  const [loadingNews,setLoadingNews]=useState(true);
  const [error,setError]=useState<string|null>(null);

  useEffect(()=>{
    const loadNews=async()=>{
        try{
            const res = await fetch('/api/news');
            const data = await res.json();
            console.log(data);
            setArticles(data.articles || []);
        }catch(err:any){
            setError('Failed to fetch news');
            console.error(err);
        }finally{
            setLoadingNews(false);
        }
    }

    if (status==='authenticated'){
        loadNews();
    }

    

  },[status]);

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>You are not signed in</div>
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Latest News</h2>

        {loadingNews ? (
          <p>Loading news...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="space-y-4">
            {articles.map((article, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded shadow">
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-600">By {article.author || 'Unknown'} on {new Date(article.publishedAt).toLocaleDateString()}</p>
                <p className="mt-2">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mt-2 block">
                  Read more
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
