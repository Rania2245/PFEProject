import React, { useState, useEffect } from "react";
import { Button, Table, Typography } from "antd";
import { HistoryOutlined, ReloadOutlined } from "@ant-design/icons";

import LogoutButton from "./NavBar";
import { fetchLogs } from "../services/historyService";

const { Title } = Typography;

interface Log {
  id: number;
  user_id: number;
  action: string;
  request_id: number | null;
  created_at: string;
  updated_at: string;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<Log[]>([]);

  const columns = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
  ];

  const fetchHistory = async () => {
    try {
      const logs = await fetchLogs();
      //@ts-expect-error
      const formattedLogs = logs.map((log) => ({
        ...log,
        data: JSON.stringify(log),
        timestamp: log.created_at,
        user: log.user_id,
      }));
      setHistory(formattedLogs);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>
      <LogoutButton />
      <Title level={2} style={{ color: "#1890ff" }}>
        <HistoryOutlined /> History
      </Title>
      <Button
        onClick={fetchHistory}
        icon={<ReloadOutlined />}
        style={{ marginBottom: "1rem" }}
      >
        Refresh History
      </Button>
      <Table columns={columns} dataSource={history} />
    </div>
  );
};

export default History;
