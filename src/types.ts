export interface WeatherResponse {
  temperature?: number;
  [key: string]: any;
}

export interface NewsItem {
  id?: number | string;
  title: string;
  body?: string;
  [key: string]: any;
}
