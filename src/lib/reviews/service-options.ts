import { services } from "../../data/services";

export const reviewServiceOptions = services.map((service) => ({
  id: service.id,
  title: service.title,
}));

export function getReviewServiceOption(serviceId: string) {
  return reviewServiceOptions.find((service) => service.id === serviceId);
}

