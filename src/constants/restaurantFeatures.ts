import { Diagram, HomeWifi, MenuBoard, User } from "iconsax-reactjs";
import type { ComponentType, SVGProps } from "react";

export type RestaurantFeature = {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const RESTAURANT_FEATURES: RestaurantFeature[] = [
  { label: "پرسنلی مجرب و حرفه‌ای", Icon: User },
  { label: "کیفیت بالای غذاها", Icon: Diagram },
  { label: "محیطی دلنشین و آرام", Icon: HomeWifi },
  { label: "منوی متنوع", Icon: MenuBoard },
];
