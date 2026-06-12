import React from "react";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import {
  Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  StreamTheme,
  CallControls,
  SpeakerLayout,
  CallingState,
} from "@stream-io/video-react-sdk";
import { useCurrentUser } from "../hooks/CurrentUser";
import { getStreamToken } from "../services/authApi";
import { Loader } from "../ui";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

function CallPage() {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { data: authUser } = useCurrentUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  console.log("CallPage render - callId:", tokenData);
  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.data?.token || !authUser || !callId) return;

      try {
        console.log("Initializing Stream video client...");

        const user = {
          id: authUser?.data?._id,
          name: authUser?.data?.fullName,
          image: authUser?.data?.profilePic,
        };
        console.log("User info for Stream:", user);
        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData?.data?.token,
        });
        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });
        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, authUser, callId]);

  if (isConnecting)   return (
        <div className="w-full h-[93vh] flex flex-col items-center justify-center">
          <Loader />
          <span>
            Connecting to video call... If this takes too long, please refresh.
          </span>
        </div>
      );

   

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;
