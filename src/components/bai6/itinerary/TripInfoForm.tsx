// Import các thư viện cần thiết từ React và Ant Design
import React from 'react';
import { Card, Space, Alert, DatePicker, InputNumber, Steps, Badge, Row, Col, Statistic } from 'antd';
import { CalendarOutlined, DollarOutlined } from '@ant-design/icons';
import { formatPrice } from '../../../utils/bai6/helpers';
import moment from 'moment';

// Lấy component RangePicker và Step từ thư viện
const { RangePicker } = DatePicker;
const { Step } = Steps;

// Định nghĩa kiểu dữ liệu cho props của component
interface TripInfoFormProps {
  onDateRangeChange: (dates: any) => void; // Callback khi thay đổi ngày đi và về
  onBudgetChange: (value: number) => void; // Callback khi thay đổi ngân sách
  onCurrentDayChange: (day: number) => void; // Callback khi thay đổi ngày hiện tại
  budget: number;          // Ngân sách hiện tại
  totalCost: number;       // Tổng chi phí hiện tại
  dateRange: [moment.Moment, moment.Moment] | null; // Khoảng ngày đi - ngày về
  currentDay: number;      // Ngày hiện tại đang được chọn
}

// Component hiển thị form nhập thông tin chuyến đi
const TripInfoForm: React.FC<TripInfoFormProps> = ({
  onDateRangeChange,
  onBudgetChange,
  onCurrentDayChange,
  budget,
  totalCost,
  dateRange,
  currentDay
}) => {
  // Tính tổng số ngày từ khoảng ngày
  const totalDays = dateRange ? dateRange[1].diff(dateRange[0], 'days') + 1 : 0;

  // Tạo danh sách các ngày để hiển thị trong Steps
  const daysArray = [];
  if (dateRange) {
    for (let i = 0; i < totalDays; i++) {
      daysArray.push({
        day: i + 1,
        date: dateRange[0].clone().add(i, 'days').format('DD/MM/YYYY') // format ngày
      });
    }
  }

  return (
    <Card title="Thông tin chuyến đi" className="trip-info-card">
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {/* Dòng chọn ngày đi và ngân sách */}
        <Row gutter={[16, 16]}>
          {/* Chọn ngày đi và về */}
          <Col xs={24} md={12}>
            <div>
              <label>Chọn ngày đi và về: </label>
              <RangePicker
                onChange={onDateRangeChange}
                value={dateRange}
                style={{ marginLeft: 8 }}
              />
            </div>
          </Col>

          {/* Nhập ngân sách */}
          <Col xs={24} md={12}>
            <div>
              <label>Ngân sách dự kiến: </label>
              <InputNumber
                min={0}
                step={1000000}
                formatter={value => `${value}đ`} // Hiển thị đơn vị "đ"
                parser={(value: string | undefined) => {
                  if (!value) return 0;
                  return Number(value.replace('đ', '')); // Loại bỏ "đ" để lấy số
                }}
                onChange={value => onBudgetChange(Number(value))}
                value={budget}
                style={{ width: 200, marginLeft: 8 }}
              />
            </div>
          </Col>
        </Row>

        {/* Nếu đã chọn ngày, hiển thị thống kê và lựa chọn ngày */}
        {dateRange && (
          <>
            <Row gutter={[16, 16]}>
              {/* Tổng số ngày */}
              <Col xs={24} md={8}>
                <Statistic
                  title="Tổng số ngày"
                  value={totalDays}
                  prefix={<CalendarOutlined />}
                  suffix="ngày"
                />
              </Col>

              {/* Ngày hiện tại đang được chọn */}
              <Col xs={24} md={8}>
                <Statistic
                  title="Ngày hiện tại"
                  value={currentDay}
                  prefix={<Badge count={currentDay} style={{ backgroundColor: '#1890ff' }} />}
                  suffix={`/${totalDays}`}
                />
              </Col>

              {/* Chi phí hiện tại */}
              <Col xs={24} md={8}>
                <Statistic
                  title="Chi phí hiện tại"
                  value={totalCost}
                  formatter={value => formatPrice(Number(value))} // Format tiền
                  prefix={<DollarOutlined />}
                  valueStyle={{ color: totalCost > budget ? '#cf1322' : '#3f8600' }} // Đổi màu nếu vượt ngân sách
                />
              </Col>
            </Row>

            {/* Hiển thị bước theo từng ngày của chuyến đi */}
            <div className="day-selector">
              <h4>Chọn ngày để xem và thêm điểm đến:</h4>
              <Steps
                current={currentDay - 1} // Bắt đầu từ 0
                onChange={onCurrentDayChange}
                type="navigation"
                size="small"
                responsive
                className="day-steps"
              >
                {daysArray.map(item => (
                  <Step
                    key={item.day}
                    title={`Ngày ${item.day}`}
                    description={item.date}
                  />
                ))}
              </Steps>
            </div>
          </>
        )}

        {/* Cảnh báo nếu chi phí vượt ngân sách */}
        {budget > 0 && totalCost > budget && (
          <Alert
            message="Cảnh báo vượt ngân sách"
            description={`Chi phí hiện tại (${formatPrice(totalCost)}) vượt quá ngân sách dự kiến (${formatPrice(budget)})`}
            type="warning"
            showIcon
          />
        )}
      </Space>
    </Card>
  );
};

export default TripInfoForm;
