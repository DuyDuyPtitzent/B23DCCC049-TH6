import React from 'react';
import { Card, Button, Avatar, Space, Timeline, Badge, Tooltip } from 'antd';
import { DeleteOutlined, CarOutlined, DollarOutlined, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import type { DestinationType } from '../../../types/bai6/index';
import { formatPrice, calculateDistance, calculateTravelTime } from '../../../utils/bai6/helpers';

interface DestinationItemProps {
  destination: DestinationType;             // Thông tin điểm đến hiện tại
  destIndex: number;                        // Vị trí của điểm đến trong danh sách
  dayIndex: number;                         // Ngày mà điểm đến thuộc về
  dayDestinations: DestinationType[];       // Danh sách điểm đến trong cùng ngày
  onRemove: (dayIndex: number, destIndex: number) => void; // Hàm xóa điểm đến
  totalDays: number;                        // Tổng số ngày trong lịch trình
  currentDay: number;                       // Ngày hiện tại
}

const DestinationItem: React.FC<DestinationItemProps> = ({
  destination,
  destIndex,
  dayIndex,
  dayDestinations,
  onRemove,
  totalDays,
  currentDay
}) => {
  // Chỉ hiển thị màu đặc biệt nếu là ngày hiện tại
  const showBadge = dayIndex === currentDay - 1;

  return (
    <Timeline.Item>
      <Card
        size="small"
        className="destination-card"
        // Gắn badge hiển thị số thứ tự ngày
        extra={
          <Tooltip title={`Ngày ${dayIndex + 1}/${totalDays}`}>
            <Badge
              count={dayIndex + 1}
              style={{
                backgroundColor: showBadge ? '#1890ff' : '#999',
                marginRight: 8
              }}
            />
          </Tooltip>
        }
      >
        <Space align="start">
          {/* Ảnh điểm đến */}
          <Avatar src={destination.imageUrl} size={64} shape="square" />
          <div>
            <h4>{destination.name}</h4>
            <p>{destination.location}</p>
            <Space>
              {/* Giá vé */}
              <span><DollarOutlined /> {formatPrice(destination.price)}</span>

              {/* Tính khoảng cách và thời gian di chuyển nếu không phải điểm đầu tiên */}
              {destIndex > 0 && (
                <>
                  <span>
                    <CarOutlined /> {calculateDistance(dayDestinations[destIndex - 1], destination)} km
                  </span>
                  <span>
                    <ClockCircleOutlined /> {calculateTravelTime(dayDestinations[destIndex - 1], destination)}
                  </span>
                </>
              )}

              {/* Hiển thị ngày */}
              <span><CalendarOutlined /> Ngày {dayIndex + 1}</span>
            </Space>
          </div>

          {/* Nút xóa điểm đến */}
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onRemove(dayIndex, destIndex)}
          />
        </Space>
      </Card>
    </Timeline.Item>
  );
};

export default DestinationItem;
