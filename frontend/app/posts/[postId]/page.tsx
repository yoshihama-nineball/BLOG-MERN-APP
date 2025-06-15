'use client';

import PostDetailPage from '@/components/posts/PostDetail';
import { useParams } from 'next/navigation';

const PostDetail: React.FC = () => {
  const params = useParams();
  const postId = typeof params?.postId === 'string' ? params.postId : '';

  if (!postId) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>投稿IDが見つかりません</h2>
        <p>正しいURLでアクセスしてください。</p>
      </div>
    );
  }

  return <PostDetailPage postId={postId} />;
};

export default PostDetail;