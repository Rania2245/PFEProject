import React, { useState, useEffect } from "react";
import { Button, Spin, Table, Typography } from "antd";
import { HistoryOutlined, ReloadOutlined } from "@ant-design/icons";

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
  const [pagination, setPagination] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Requeest Id",
      dataIndex: "Requeest Id",
      key: "data",
      render: (text: string, record: Log) => (
        <div>
          <div>{record.request_id}</div>
        </div>
      ),
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

  const fetchHistory = async (page: number = 1) => {
    try {
      setLoading(true);
      const logs = await fetchLogs(page);
      const formattedLogs = logs.data.map((log: Log) => ({
        ...log,
        RequeestId: "",
        timestamp: log.created_at,
        user: log.user_id,
      }));
      setHistory(formattedLogs);
      setPagination({
        current: logs.current_page,
        pageSize: logs.per_page,
        total: logs.total,
      });
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleTableChange = (pagination: any) => {
    fetchHistory(pagination.current);
  };

  return (
    <div style={{ height: "calc(100vh - 200px)", overflow: "auto" }}>
      <Title level={2} style={{ color: "#1890ff" }}>
        <HistoryOutlined /> History
      </Title>
      <Button
        onClick={() => fetchHistory()}
        icon={<ReloadOutlined />}
        style={{ marginBottom: "1rem" }}
      >
        Refresh History
      </Button>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={history}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </Spin>
    </div>
  );
};

export default History;
