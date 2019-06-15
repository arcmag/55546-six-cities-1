interface OfferLocation {
  latitude: number,
  longitude: number,
  zoom: number,
}

export enum FavoriteStatus {
  ADD = 1,
  REMOVE = 0,
};

export interface OfferType {
  bedrooms: number,
  city: {
    name: string,
    location: OfferLocation,
  },
  description: string,
  goods: string[],
  host: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string,
  },
  id: number,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: OfferLocation,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
}

export interface UserType {
  avatarUrl: string,
  email: string,
  id: number,
  isPro: boolean,
  name: string,
}

export interface CommentType {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: UserType
}

export interface DataCommentType {
  rating: number,
  comment: string,
}

export interface DataSignIn {
  email: string,
  password: string,
}
