import React, { useState } from 'react';
import { Card, Typography, Statistic, Row, Col, Divider, Collapse, Badge, Tag, Space, Empty } from 'antd';
import { CarOutlined, DollarOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import type { ItineraryDay } from '../../../types/bai6/index';
import { formatPrice, calculateDistance, calculateTravelTime } from '../../../utils/bai6/helpers';

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface ItineraryOverviewProps {
  itinerary: ItineraryDay[]; // Mảng các ngày trong lịch trình, mỗi ngày gồm nhiều điểm đến
  totalCost: number;         // Tổng chi phí cho toàn bộ lịch trình
  currentDay?: number;       // Ngày hiện tại (tuỳ chọn), mặc định là 1 nếu không truyền
}

const ItineraryOverview: React.FC<ItineraryOverviewProps> = ({
  itinerary,
  totalCost,
  currentDay = 1
}) => {
  // Tính tổng số điểm đến trong toàn bộ lịch trình
  const totalDestinations = itinerary.reduce((acc, day) => acc + day.destinations.length, 0);

  // State để theo dõi panel nào đang mở trong Collapse
  const [activeKey, setActiveKey] = useState<string | string[]>([`${currentDay - 1}`]);

  // Hàm tính chi phí cho một ngày cụ thể
  const calculateDayCost = (day: ItineraryDay) => {
    return day.destinations.reduce((sum, dest) => sum + dest.price, 0);
  };

  // Hàm tính tổng thời gian di chuyển trong một ngày
  const calculateDayTravelTime = (day: ItineraryDay) => {
    let totalMinutes = 0;
    for (let i = 1; i < day.destinations.length; i++) {
      const from = day.destinations[i - 1];
      const to = day.destinations[i];
      const distance = calculateDistance(from, to);
      totalMinutes += distance * 2; // Giả sử 1 km = 2 phút di chuyển
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <Card className="overview-card">
      {/* Hiển thị thống kê tổng quát */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Statistic
            title="Tổng chi phí"
            value={totalCost}
            formatter={value => formatPrice(Number(value))}
            prefix={<DollarOutlined />}
          />
        </Col>
        <Col xs={24} md={8}>
          <Statistic title="Tổng số ngày" value={itinerary.length} suffix="ngày" />
        </Col>
        <Col xs={24} md={8}>
          <Statistic title="Tổng số điểm đến" value={totalDestinations} suffix="địa điểm" />
        </Col>
      </Row>

      <Divider />

      {/* Nếu có điểm đến thì render chi tiết từng ngày, ngược lại hiển thị Empty */}
      {totalDestinations > 0 ? (
        <Collapse
          activeKey={activeKey}
          onChange={setActiveKey}
          className="itinerary-collapse"
        >
          {itinerary.map((day, index) => {
            const dayCost = calculateDayCost(day); // Tổng chi phí ngày
            const travelTime = day.destinations.length > 1
              ? calculateDayTravelTime(day)
              : "0m"; // Tổng thời gian di chuyển ngày
            const isCurrentDay = index === currentDay - 1;

            return (
              <Panel
                key={index.toString()}
                header={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Badge
                      count={index + 1}
                      style={{
                        backgroundColor: isCurrentDay ? '#1890ff' : '#999',
                        marginRight: 8
                      }}
                    />
                    <span>Ngày {index + 1} - {day.date.format('DD/MM/YYYY')}</span>
                    {isCurrentDay && <Tag color="blue" style={{ marginLeft: 8 }}>Hiện tại</Tag>}
                  </div>
                }
                extra={
                  <Space>
                    <Text type="secondary">{day.destinations.length} điểm đến</Text>
                    <Text type="secondary">{formatPrice(dayCost)}</Text>
                  </Space>
                }
              >
                {/* Nếu có điểm đến thì hiển thị từng điểm, nếu không hiển thị Empty */}
                {day.destinations.length > 0 ? (
                  <div className="day-destinations">
                    {day.destinations.map((dest, i) => (
                      <Card
                        key={i}
                        size="small"
                        style={{ marginBottom: 8 }}
                        className="destination-overview-card"
                      >
                        <Row gutter={[8, 8]} align="middle">
                          <Col xs={24} sm={6}>
                            {/* Hình ảnh địa điểm */}
                            <img
                              src={dest.imageUrl}
                              alt={dest.name}
                              style={{
                                width: '100%',
                                height: 80,
                                objectFit: 'cover',
                                borderRadius: 4
                              }}
                            />
                          </Col>
                          <Col xs={24} sm={18}>
                            <Title level={5} style={{ margin: 0 }}>{dest.name}</Title>
                            <Space direction="vertical" size={2} style={{ width: '100%' }}>
                              <Text><EnvironmentOutlined /> {dest.location}</Text>
                              <Text><DollarOutlined /> {formatPrice(dest.price)}</Text>
                              {i > 0 && (
                                <Space>
                                  <Text>
                                    <CarOutlined /> {calculateDistance(day.destinations[i - 1], dest)} km
                                  </Text>
                                  <Text>
                                    <ClockCircleOutlined /> {calculateTravelTime(day.destinations[i - 1], dest)}
                                  </Text>
                                </Space>
                              )}
                            </Space>
                          </Col>
                        </Row>
                      </Card>
                    ))}

                    {/* Tóm tắt ngày nếu có nhiều hơn 1 điểm */}
                    {day.destinations.length > 1 && (
                      <Card size="small" className="day-summary-card">
                        <Row gutter={16}>
                          <Col span={8}>
                            <Statistic
                              title="Tổng chi phí ngày"
                              value={dayCost}
                              formatter={value => formatPrice(Number(value))}
                              size="small"
                            />
                          </Col>
                          <Col span={8}>
                            <Statistic
                              title="Thời gian di chuyển"
                              value={travelTime}
                              size="small"
                            />
                          </Col>
                          <Col span={8}>
                            <Statistic
                              title="Số điểm đến"
                              value={day.destinations.length}
                              size="small"
                            />
                          </Col>
                        </Row>
                      </Card>
                    )}
                  </div>
                ) : (
                  <Empty description="Chưa có điểm đến nào cho ngày này" />
                )}
              </Panel>
            );
          })}
        </Collapse>
      ) : (
        <Empty description="Chưa có điểm đến nào trong lịch trình" />
      )}
    </Card>
  );
};

export default ItineraryOverview;
