// Import các thư viện và component cần thiết
import React from 'react';
import { Card, Select, Empty, Typography, Space, Tag } from 'antd';
import { CalendarOutlined, DollarOutlined } from '@ant-design/icons';
import { formatPrice } from '../../../utils/bai6/helpers';
import moment from 'moment';

const { Text, Title } = Typography;
const { Option } = Select;

// Định nghĩa kiểu dữ liệu cho một lịch trình đã lưu
interface SavedItinerary {
  id: string;
  name: string;
  dateRange: [string, string]; // Khoảng thời gian từ - đến
  days: {
    date: string;
    destinations: any[]; // Danh sách điểm đến cho mỗi ngày
  }[];
  budget: number;
  totalCost: number;
  createdAt: string;
}

// Props được truyền vào component
interface ItinerarySelectorProps {
  itineraries: SavedItinerary[]; // Danh sách tất cả lịch trình đã lưu
  selectedItinerary: SavedItinerary | null; // Lịch trình đang được chọn
  onSelectItinerary: (itinerary: SavedItinerary) => void; // Hàm callback khi chọn lịch trình
}

// Component dùng để chọn một lịch trình trong danh sách
const ItinerarySelector: React.FC<ItinerarySelectorProps> = ({
  itineraries,
  selectedItinerary,
  onSelectItinerary
}) => {
  
  // Khi người dùng chọn một lịch trình từ dropdown
  const handleChange = (itineraryId: string) => {
    const selected = itineraries.find(item => item.id === itineraryId); // Tìm lịch trình tương ứng
    if (selected) {
      onSelectItinerary(selected); // Gọi callback để cập nhật
    }
  };

  return (
    <Card className="itinerary-selector-card" style={{ marginBottom: 16 }}>
      <Title level={4}>Chọn lịch trình</Title>

      {/* Nếu có ít nhất một lịch trình được lưu */}
      {itineraries.length > 0 ? (
        <div>
          {/* Dropdown danh sách lịch trình */}
          <Select
            style={{ width: '100%' }}
            placeholder="Chọn lịch trình để quản lý ngân sách"
            value={selectedItinerary?.id}
            onChange={handleChange}
            optionLabelProp="label"
          >
            {/* Render từng option của lịch trình */}
            {itineraries.map(itinerary => (
              <Option 
                key={itinerary.id} 
                value={itinerary.id}
                label={itinerary.name}
              >
                <div className="itinerary-option">
                  <div className="itinerary-name">{itinerary.name}</div>
                  <Space>
                    <Tag icon={<CalendarOutlined />} color="blue">
                      {moment(itinerary.dateRange[0]).format('DD/MM/YYYY')} - {moment(itinerary.dateRange[1]).format('DD/MM/YYYY')}
                    </Tag>
                    <Tag icon={<DollarOutlined />} color="green">
                      {formatPrice(itinerary.totalCost)}
                    </Tag>
                  </Space>
                </div>
              </Option>
            ))}
          </Select>
          
          {/* Hiển thị thông tin chi tiết của lịch trình đã chọn */}
          {selectedItinerary && (
            <div className="selected-itinerary-info" style={{ marginTop: 16 }}>
              <Text strong>Lịch trình đã chọn: </Text>
              <Text>{selectedItinerary.name}</Text>
              <br />
              <Text>Ngày: {moment(selectedItinerary.dateRange[0]).format('DD/MM/YYYY')} - {moment(selectedItinerary.dateRange[1]).format('DD/MM/YYYY')}</Text>
              <br />
              <Text>Số ngày: {selectedItinerary.days.length}</Text>
              <br />
              <Text>Tổng chi phí dự kiến: {formatPrice(selectedItinerary.totalCost)}</Text>
            </div>
          )}
        </div>
      ) : (
        // Hiển thị thông báo khi không có lịch trình nào
        <Empty 
          description="Chưa có lịch trình nào được lưu. Vui lòng tạo lịch trình trước khi quản lý ngân sách."
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </Card>
  );
};

export default ItinerarySelector;
