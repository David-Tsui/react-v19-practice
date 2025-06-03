export interface WeatherData {
  date: string; // 日期
  location: string; // 地點
  temperature: {
    min: number; // 最低溫度
    max: number; // 最高溫度
  };
  weather: string; // 天氣狀況（如：晴、陰、雨等）
  rainProbability: number; // 降雨機率（0-100）
  humidity: number; // 濕度（百分比）
}
