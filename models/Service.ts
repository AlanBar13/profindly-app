export interface Timings {
    day: string;
    opening_hour: string;
    opening_minute: string;
    opening_AM_or_PM: string;
    closing_hour: string;
    closing_minute: string;
    closing_AM_or_PM: string;
}

export interface Aviability {
  timezone: string;
  duration: number;
  breakBefore: number;
  breakAfter: number;
  max_appointments: number;
  timings: Timings[];
}

export interface Service {
  _id: string;
  label: string;
  specialist: string;
  thumbnail: string;
  aviability: Aviability;
  price?: number;
  location?: string;
}
