import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/layout/AdminLayout';
import InfiniteScrollPosts from '@/components/common/InfiniteScrollPosts';
import { PostDetail } from '@/utils/types';
import { filterPosts } from '@/utils/helper';

interface IProps {}

const Search: NextPage<IProps> = () => {
  const { query } = useRouter();
  const title = query.title as string;
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [results, setResults] = useState<PostDetail[]>([]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const { data } = await axios(`/api/posts/search?title=${title}`);
      setLoading(false);

      if (!data?.results?.length) {
        setNotFound(true);
        setResults([]);
      } else {
        setNotFound(false);
        setResults(data.results);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;
    handleSearch();
  }, [title]);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-3">
        {notFound ? (
          <h1 className="text-center text-3xl font-semibold opacity-40 text-secondary-dark">
            Not Found!!!
          </h1>
        ) : null}
        {loading ? (
          <h1 className="text-center text-3xl font-semibold opacity-40 text-secondary-dark">
            Searching...
          </h1>
        ) : null}
        <InfiniteScrollPosts
          hasMore={false}
          next={() => {}}
          dataLength={results.length}
          posts={results}
          showControls
          onPostRemoved={(post) => setResults(filterPosts(results, post))}
        />
      </div>
    </AdminLayout>
  );
};

export default Search;
