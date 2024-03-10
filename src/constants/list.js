import {
  homeIcon,
  menuBoardIcon,
  hashtagIcon,
  profile2userIcon,
  callingIcon,
} from "../icons/mobileMenuIcons";

const categories = [
  { id: 1, type: "همه" },
  { id: 2, type: "غذاهای ایرانی" },
  { id: 3, type: "غذاهای غیر ایرانی" },
  { id: 4, type: "پیتزاها" },
  { id: 5, type: "ساندویچ‌ها" },
];

const pages = [
  { id: 1, type: "صفحه اصلی", url: "home", icon: homeIcon },
  { id: 2, type: "منو", url: "menu", icon: menuBoardIcon },
  { id: 3, type: "اعطای نمایندگی", url: "franchise", icon: hashtagIcon },
  { id: 4, type: "درباره ما", url: "about-us", icon: profile2userIcon },
  { id: 5, type: "تماس با ما", url: "contact-us", icon: callingIcon },
];

export { categories, pages };
