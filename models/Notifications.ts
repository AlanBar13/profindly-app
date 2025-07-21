import { Booking } from "./Booking";
import { MinimalUser } from "./User";

export interface Notification {
  id: number;
  from: MinimalUser;
  to: MinimalUser;
  title: string;
  message: string;
  type: "message" | "info" | "alert" | "action";
  read: boolean;
  booking?: Booking;
  createdAt: string;
}
