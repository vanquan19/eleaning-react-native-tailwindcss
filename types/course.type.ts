export type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  ownerEmail: string;
  ownerName?: string;
  ownerAvatar?: string;
  duration: number;
  category: string;
};
