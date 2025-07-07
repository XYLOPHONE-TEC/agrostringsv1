// LiveEmbed.jsx
import { useEffect, useState } from 'react';
import { TikTokEmbed, YouTubeEmbed } from 'react-social-media-embed';

export default function LiveEmbed({ youtubeVideoId, youtubeDomain, tiktokUrl }) {
  const [chatBlocked, setChatBlocked] = useState(false);

  // Test if YouTube live chat iframe is allowed
  useEffect(() => {
    const testFrame = document.createElement('iframe');
    testFrame.src = `https://www.youtube.com/live_chat?v=${youtubeVideoId}&embed_domain=${youtubeDomain}`;
    testFrame.style.display = 'none';
    testFrame.onload = () => {
      document.body.removeChild(testFrame);
    };
    testFrame.onerror = () => {
      setChatBlocked(true);
      document.body.removeChild(testFrame);
    };
    document.body.appendChild(testFrame);
  }, [youtubeVideoId, youtubeDomain]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {/* YouTube live video */}
        <YouTubeEmbed
          url={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
          width="70%"
          youTubeProps={{ playerVars: { autoplay: 1 } }}
          style={{ flex: '1 1 60%' }}
        />

        {/* YouTube live chat */}
        {!chatBlocked ? (
          <iframe
            title="YouTube Live Chat"
            src={`https://www.youtube.com/live_chat?v=${youtubeVideoId}&embed_domain=${youtubeDomain}`}
            style={{ flex: '1 1 35%', height: '500px', border: 0 }}
          />
        ) : (
          <div style={{ flex: '1 1 35%', padding: '1rem', maxHeight: '500px', overflowY: 'auto', background: '#f9f9f9' }}>
            <p><strong>Chat unavailable.</strong> To access live chat, either enable same‑domain embedding or implement the YouTube Data API for chat messages.</p>
          </div>
        )}
      </div>

      {/* TikTok video embed */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <TikTokEmbed url={tiktokUrl} width={400} />
      </div>
    </div>
  );
}
