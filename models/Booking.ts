import { Specialist } from "./Specialist";
import { MinimalUser } from "./User";

export interface Booking {
  id: number;
  bookDate: string;
  client: string;
  specialist: string;
  endTime: string;
  service: string;
  startTime: string;
  status: "booked" | "pending" | "cancelled" | "completed"
}

export interface CreateBooking extends Omit<Booking, "id" | "client" | "status"> {}


export interface BookingSlot {
  start: string;
  end: string;
}

export interface Slot {
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  slots: BookingSlot[];
}

export interface ServiceSpecialist {
  id: number;
  label: string;
  specialist: Specialist;
  price?: number;
  location?: string;
}

export interface BookingsResponse {
  id: number;
  bookDate: string;
  client: MinimalUser;
  endTime: string;
  service: ServiceSpecialist | null;
  startTime: string;
  status: string;
}
