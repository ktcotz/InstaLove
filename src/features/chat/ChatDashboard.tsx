import { useNavigate, useParams } from "react-router";
import { useGetChat } from "./queries/useGetChat";
import { useEffect } from "react";

export const ChatDashboard = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetChat({ chat_id: Number(id) });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !data) {
      navigate(-1);
    }
  }, [data, isLoading, navigate]);


  return <div className="px-4">CHAT! - {id}</div>;
};
