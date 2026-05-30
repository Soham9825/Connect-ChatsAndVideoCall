import { useEffect, useState } from "react";
import { StreamChat, UserResponse } from "stream-chat";

const useStreamUser = (client: StreamChat | null, userId: string) => {
  const [users, setUsers] = useState<UserResponse[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!client) {
        setLoading(false);
        return;
      }
      try {
        const response = await client.queryUsers(
          { id: { $nin: [userId] }, role: { $nin: ["admin"] } } as any,
          { last_active: -1 },
          { limit: 50 },
        );
        setUsers(response.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId && client) {
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [client, userId]);

  return { users, loading };
};

export default useStreamUser;
