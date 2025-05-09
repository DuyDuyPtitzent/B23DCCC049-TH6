// src/services/api.ts
import type { DestinationType, StatisticsData, Itinerary, BudgetItem } from '../../types/bai6/index';

/**
 * Mock destinations data
 */
const mockDestinations: DestinationType[] = [
  {
    id: '1',
    name: 'Bãi biển Mỹ Khê',
    location: 'Đà Nẵng',
    type: 'beach',
    price: 500000,
    rating: 4.5,
    description: 'Một trong những bãi biển đẹp nhất Việt Nam',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '2',
    name: 'Vịnh Hạ Long',
    location: 'Quảng Ninh',
    type: 'beach',
    price: 1200000,
    rating: 5,
    description: 'Di sản thiên nhiên thế giới với hàng nghìn hòn đảo đá vôi',
    imageUrl: 'https://images.unsplash.com/photo-1573551089778-46a7abc39d9f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '3',
    name: 'Phố cổ Hội An',
    location: 'Quảng Nam',
    type: 'cultural',
    price: 300000,
    rating: 4.8,
    description: 'Phố cổ xinh đẹp với đèn lồng và kiến trúc truyền thống',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '4',
    name: 'Đà Lạt',
    location: 'Lâm Đồng',
    type: 'mountain',
    price: 800000,
    rating: 4.7,
    description: 'Thành phố ngàn hoa với khí hậu mát mẻ quanh năm',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '5',
    name: 'Sapa',
    location: 'Lào Cai',
    type: 'mountain',
    price: 950000,
    rating: 4.6,
    description: 'Thị trấn trong mây với ruộng bậc thang tuyệt đẹp',
    imageUrl: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '6',
    name: 'Phú Quốc',
    location: 'Kiên Giang',
    type: 'beach',
    price: 1500000,
    rating: 4.9,
    description: 'Đảo ngọc với bãi biển cát trắng và nước biển trong xanh',
    imageUrl: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '7',
    name: 'Hà Nội',
    location: 'Thủ đô',
    type: 'city',
    price: 600000,
    rating: 4.4,
    description: 'Thủ đô nghìn năm văn hiến với nhiều di tích lịch sử',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '8',
    name: 'TP. Hồ Chí Minh',
    location: 'Miền Nam',
    type: 'city',
    price: 700000,
    rating: 4.3,
    description: 'Thành phố năng động và hiện đại nhất Việt Nam',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '9',
    name: 'Huế',
    location: 'Thừa Thiên Huế',
    type: 'cultural',
    price: 450000,
    rating: 4.5,
    description: 'Cố đô với hệ thống di tích cung đình đặc sắc',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '10',
    name: 'Mộc Châu',
    location: 'Sơn La',
    type: 'countryside',
    price: 550000,
    rating: 4.2,
    description: 'Cao nguyên với đồi chè xanh mát và hoa mận trắng',
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '11',
    name: 'Nha Trang',
    location: 'Khánh Hòa',
    type: 'beach',
    price: 850000,
    rating: 4.4,
    description: 'Thành phố biển nổi tiếng với nhiều khu nghỉ dưỡng cao cấp',
    imageUrl: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '12',
    name: 'Mũi Né',
    location: 'Bình Thuận',
    type: 'beach',
    price: 750000,
    rating: 4.3,
    description: 'Thiên đường của những đồi cát và resort ven biển',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80'
  }
];

/**
 * Mock statistics data
 */
const mockStatistics: StatisticsData = {
  monthlyItineraries: [
    { month: 'T1', count: 45 },
    { month: 'T2', count: 52 },
    { month: 'T3', count: 78 },
    { month: 'T4', count: 90 },
    { month: 'T5', count: 120 },
    { month: 'T6', count: 145 },
    { month: 'T7', count: 180 },
    { month: 'T8', count: 210 },
    { month: 'T9', count: 160 },
    { month: 'T10', count: 130 },
    { month: 'T11', count: 95 },
    { month: 'T12', count: 110 }
  ],
  popularDestinations: [
    { name: 'Đà Nẵng', count: 245 },
    { name: 'Hạ Long', count: 210 },
    { name: 'Phú Quốc', count: 198 },
    { name: 'Đà Lạt', count: 187 },
    { name: 'Nha Trang', count: 165 }
  ]
};

/**
 * Mock itineraries data
 */
const mockItineraries: Itinerary[] = [];

/**
 * Mock budget items
 */
const mockBudgetItems: BudgetItem[] = [
  {
    id: '1',
    name: 'Khách sạn Sài Gòn',
    category: 'accommodation',
    amount: 1200000,
    date: new Date('2025-04-10')
  },
  {
    id: '2',
    name: 'Vé máy bay khứ hồi',
    category: 'transportation',
    amount: 1800000,
    date: new Date('2025-04-05')
  },
  {
    id: '3',
    name: 'Ăn uống ngày 1',
    category: 'food',
    amount: 500000,
    date: new Date('2025-04-11')
  },
  {
    id: '4',
    name: 'Tour thuyền vịnh Hạ Long',
    category: 'activities',
    amount: 700000,
    date: new Date('2025-04-12')
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch all destinations
 */
export const fetchDestinations = async (): Promise<DestinationType[]> => {
  // Simulate API call
  await delay(500);
  return [...mockDestinations];
};

/**
 * Fetch destination by ID
 */
export const fetchDestinationById = async (id: string): Promise<DestinationType | null> => {
  await delay(300);
  const destination = mockDestinations.find(dest => dest.id === id);
  return destination || null;
};

/**
 * Fetch statistics data
 */
export const fetchStatistics = async (): Promise<StatisticsData> => {
  await delay(700);
  return { ...mockStatistics };
};

/**
 * Add new destination
 */
export const addDestination = async (destination: Omit<DestinationType, 'id'>): Promise<DestinationType> => {
  await delay(600);
  const newDestination = {
    ...destination,
    id: Date.now().toString()
  };
  return newDestination;
};

/**
 * Update destination
 */
export const updateDestination = async (destination: DestinationType): Promise<DestinationType> => {
  await delay(500);
  return { ...destination };
};

/**
 * Delete destination
 */
export const deleteDestination = async (id: string): Promise<boolean> => {
  await delay(400);
  return true;
};

/**
 * Fetch budget items
 */
export const fetchBudgetItems = async (): Promise<BudgetItem[]> => {
  await delay(400);
  return [...mockBudgetItems];
};

/**
 * Add budget item
 */
export const addBudgetItem = async (item: Omit<BudgetItem, 'id'>): Promise<BudgetItem> => {
  await delay(300);
  const newItem = {
    ...item,
    id: Date.now().toString()
  };
  return newItem;
};

/**
 * Delete budget item
 */
export const deleteBudgetItem = async (id: string): Promise<boolean> => {
  await delay(300);
  return true;
};

/**
 * Create itinerary
 */
export const createItinerary = async (itinerary: Omit<Itinerary, 'id' | 'createdAt' | 'updatedAt'>): Promise<Itinerary> => {
  await delay(800);
  const now = new Date();
  const newItinerary = {
    ...itinerary,
    id: Date.now().toString(),
    createdAt: now,
    updatedAt: now
  };
  return newItinerary;
};

/**
 * Fetch itineraries
 */
export const fetchItineraries = async (): Promise<Itinerary[]> => {
  await delay(600);
  return [...mockItineraries];
};

/**
 * Search destinations
 */
export const searchDestinations = async (query: string): Promise<DestinationType[]> => {
  await delay(400);
  const lowercaseQuery = query.toLowerCase();
  return mockDestinations.filter(
    dest =>
      dest.name.toLowerCase().includes(lowercaseQuery) ||
      dest.location.toLowerCase().includes(lowercaseQuery) ||
      dest.description.toLowerCase().includes(lowercaseQuery)
  );
};

/**
 * Filter destinations
 */
export const filterDestinations = async (
  types: string[] = [],
  minPrice: number = 0,
  maxPrice: number = Infinity,
  minRating: number = 0
): Promise<DestinationType[]> => {
  await delay(500);

  return mockDestinations.filter(dest => {
    const typeMatch = types.length === 0 || types.includes(dest.type);
    const priceMatch = dest.price >= minPrice && dest.price <= maxPrice;
    const ratingMatch = dest.rating >= minRating;

    return typeMatch && priceMatch && ratingMatch;
  });
};
