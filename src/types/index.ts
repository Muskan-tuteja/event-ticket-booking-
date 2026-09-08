export interface Event {
  id: number;
  title: string;
  image: string;
  category: string;
  location: string;
  date: string;
  time: string;
  price: number;
  description: string;
}

export interface Ticket {
  id: string;
  eventId: number;
  eventName: string;
  type: string;
  price: number;
  status: "Confirmed" | "Used" | "Cancelled";
  date: string;
}