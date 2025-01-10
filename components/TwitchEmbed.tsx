import { useEffect } from "react";

interface TwitchEmbedProps {
  width?: number;
  height?: string;
  channel?: string;
  video?: string;
  collection?: string;
  parent?: string[];
}

const TwitchEmbed: React.FC<TwitchEmbedProps> = ({
  width = "[100vw]",
  height = "[30vh]",
  channel,
  video,
  collection,
  parent = ["embed.example.com", "othersite.example.com"],
}) => {
  useEffect(() => {
    const existingScript = document.getElementById("twitch-embed-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://player.twitch.tv/js/embed/v1.js";
      script.async = true;
      script.id = "twitch-embed-script";


      script.onload = () => {
        if (typeof (window as any).Twitch !== "undefined" && (window as any).Twitch.Player) {
          const options = {
            width,
            height,
            channel,
            video,
            collection,
            parent,
            autoplay: true,
            muted: true,
            controls: false,
          };
          const player = new (window as any).Twitch.Player("twitch-embed", options);
          player.setVolume(0.5);
        }
      };

      document.body.appendChild(script);
      const style = document.createElement("style");
      style.innerHTML = `
        #twitch-embed .twitch-player-overlay .twitch-player-title,
        #twitch-embed .twitch-player-overlay .twitch-player-channel .stream-info-card {
          display: none !important;
        }
        iframe {
          width: 80vw;
          height: 21vh;
          border-radius: 10px;
        }
      `;
      document.head.appendChild(style);
      
    }

    return () => {
      const playerDiv = document.getElementById("twitch-embed");
      if (playerDiv) {
        playerDiv.innerHTML = ""; // Clear existing embed
      }
    };
  }, [width, height, channel, video, collection, parent]);

  return <div id="twitch-embed"></div>;
};

export default TwitchEmbed;
