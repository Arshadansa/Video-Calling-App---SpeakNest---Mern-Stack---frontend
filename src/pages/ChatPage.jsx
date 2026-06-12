import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StreamChat } from "stream-chat";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  Chat,
  Channel,
  ChannelHeader,
  MessageComposer,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import { useCurrentUser } from "../hooks/CurrentUser";
import { getStreamToken } from "../services/authApi";
import { Loader, CallButton } from "../ui";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

function ChatPage() {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: authUser } = useCurrentUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    let client;

    const initChat = async () => {
      if (
        !STREAM_API_KEY ||
        !authUser?.data?._id ||
        !tokenData?.data?.token ||
        !targetUserId
      ) {
        return;
      }

      try {
        setLoading(true);

        client = StreamChat.getInstance(STREAM_API_KEY);

        if (!client.userID) {
          await client.connectUser(
            {
              id: authUser.data._id,
              name: authUser.data.fullName,
              image: authUser.data.profilePic,
            },
            tokenData.data.token,
          );
        }

        const channelId = [authUser.data._id, targetUserId].sort().join("-");

        const currentChannel = client.channel("messaging", channelId, {
          members: [authUser.data._id, targetUserId],
        });

        await currentChannel.watch();
        setChatClient(client);
        setChannel(currentChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat.");
      } finally {
        setLoading(false);
      }
    };

    initChat();

    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [authUser, tokenData, targetUserId]);

  if (loading || !chatClient || !channel) {
    return (
      <div className="w-full h-[93vh] flex flex-col items-center justify-center">
        <Loader />
        <span>
          Connecting to chat... If this takes too long, please refresh.
        </span>
      </div>
    );
  }


     const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };
 
  return (
    <>
      <div className="h-[93vh] ">
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <Window>
              <CallButton handleVideoCall={handleVideoCall} />
              <ChannelHeader />
              <MessageList />
              <MessageComposer />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </div>
    </>
  );
}

export default ChatPage;
