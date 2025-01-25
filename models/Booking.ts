export interface Booking {
  _id: string;
  bookDate: string;
  client_id: string;
  endTime: string;
  service_id: string;
  startTime: string;
  status: string;
}

export interface CreateBooking extends Omit<Booking, "_id"> {}

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
