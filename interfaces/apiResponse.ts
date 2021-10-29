export interface IBBResponse {
  data: {
    url: string;
  };
}

export interface PageResponse {
  name: string;
  slug: string;
  pages: { name: string; slug: string }[];
}
