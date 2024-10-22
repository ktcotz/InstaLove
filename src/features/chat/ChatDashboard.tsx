import { useNavigate, useParams } from "react-router";
import { useGetChat } from "./queries/useGetChat";
import { useEffect } from "react";
import { Users } from "./dashboard/Users";

export const ChatDashboard = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetChat({ chat_id: Number(id) });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data?.data.length === 0) {
      navigate(-1);
    }
  }, [data, isLoading, navigate]);

  return <div>{data?.users && <Users users={data.users} />}</div>;
};
