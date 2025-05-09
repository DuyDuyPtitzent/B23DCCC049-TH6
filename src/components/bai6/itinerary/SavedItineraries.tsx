// Import các thư viện React và các thành phần UI cần thiết
import React, { useState, useEffect } from 'react';
import { List, Card, Button, Popconfirm, Empty, Typography, Space, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { formatPrice } from '../../../utils/bai6/helpers';

const { Title, Text } = Typography;

// Định nghĩa kiểu props cho component
interface SavedItineraryProps {
  onLoadItinerary: (itinerary: any) => void; // Hàm callback khi người dùng muốn xem chi tiết lịch trình
}

// Component hiển thị danh sách các lịch trình đã lưu
const SavedItineraries: React.FC<SavedItineraryProps> = ({ onLoadItinerary }) => {
  // State lưu danh sách lịch trình
  const [savedItineraries, setSavedItineraries] = useState<any[]>([]);

  // Khi component được mount, lấy danh sách lịch trình từ localStorage
  useEffect(() => {
    const itineraries = JSON.parse(localStorage.getItem('savedItineraries') || '[]');
    setSavedItineraries(itineraries);
  }, []);

  // Hàm xóa một lịch trình dựa vào id
  const handleDeleteItinerary = (id: string) => {
    const updatedItineraries = savedItineraries.filter(item => item.id !== id); // Xóa lịch trình khỏi danh sách
    setSavedItineraries(updatedItineraries); // Cập nhật lại state
    localStorage.setItem('savedItineraries', JSON.stringify(updatedItineraries)); // Cập nhật localStorage
  };

  // Hàm gọi callback để tải lịch trình được chọn
  const handleLoadItinerary = (itinerary: any) => {
    onLoadItinerary(itinerary);
  };

  return (
    <Card title="Lịch trình đã lưu">
      {/* Nếu có ít nhất một lịch trình được lưu */}
      {savedItineraries.length > 0 ? (
        <List
          itemLayout="vertical"
          dataSource={savedItineraries}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                // Nút xem chi tiết
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={() => handleLoadItinerary(item)}
                >
                  Xem
                </Button>,
                // Nút xóa với Popconfirm để xác nhận
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa lịch trình này?"
                  onConfirm={() => handleDeleteItinerary(item.id)}
                  okText="Có"
                  cancelText="Không"
                >
                  <Button danger icon={<DeleteOutlined />}>Xóa</Button>
                </Popconfirm>
              ]}
            >
              {/* Thông tin cơ bản của lịch trình */}
              <List.Item.Meta
                title={item.name}
                description={
                  <Space direction="vertical">
                    <Text>Ngày: {new Date(item.dateRange[0]).toLocaleDateString('vi-VN')} - {new Date(item.dateRange[1]).toLocaleDateString('vi-VN')}</Text>
                    <Text>Số ngày: {item.days.length}</Text>
                    <Text>Tổng chi phí: {formatPrice(item.totalCost)}</Text>
                    <Text>Ngân sách: {formatPrice(item.budget)}</Text>
                    <Text>Tạo lúc: {new Date(item.createdAt).toLocaleString('vi-VN')}</Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        // Nếu chưa có lịch trình nào, hiển thị Empty
        <Empty description="Chưa có lịch trình nào được lưu" />
      )}
    </Card>
  );
};

export default SavedItineraries;
