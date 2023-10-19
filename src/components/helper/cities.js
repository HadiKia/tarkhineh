const provinces = [
  {
    id: 1,
    name: "آذربایجان شرقی",
    unavailable: false,
    counties: [
      { id: 1, name: "تبریز", unavailable: false },
      { id: 2, name: "مراغه", unavailable: false },
      { id: 3, name: "مرند", unavailable: false },
      { id: 4, name: "میانه", unavailable: false },
      { id: 5, name: "اسکو", unavailable: false },
      { id: 6, name: "اهر", unavailable: false },
      { id: 7, name: "شبستر", unavailable: false },
      { id: 8, name: "بناب", unavailable: false },
      { id: 9, name: "سراب", unavailable: false },
      { id: 10, name: "مکان", unavailable: false },
      { id: 11, name: "آذرشهر", unavailable: false },
      { id: 12, name: "بستان‌آباد", unavailable: false },
      { id: 13, name: "عجب‌شیر", unavailable: false },
      { id: 14, name: "هریس", unavailable: false },
      { id: 15, name: "جلفا", unavailable: false },
      { id: 16, name: "هشترود", unavailable: false },
      { id: 17, name: "ورزقان", unavailable: false },
      { id: 18, name: "کلیبر", unavailable: false },
      { id: 19, name: "خداآفرین", unavailable: false },
      { id: 20, name: "چارویماق", unavailable: false },
    ],
  },
  {
    id: 2,
    name: "آذربایجان غربی",
    unavailable: false,
    counties: [
      { id: 1, name: "ارومیه", unavailable: false },
      { id: 2, name: "خوي", unavailable: false },
      { id: 3, name: "بوكان", unavailable: false },
      { id: 4, name: "مهاباد", unavailable: false },
      { id: 5, name: "مياندوآب", unavailable: false },
      { id: 6, name: "سلماس", unavailable: false },
      { id: 7, name: "پيرانشهر", unavailable: false },
      { id: 8, name: "نقده", unavailable: false },
      { id: 9, name: "سردشت", unavailable: false },
      { id: 10, name: "ماكو", unavailable: false },
      { id: 11, name: "شاهين‌دژ", unavailable: false },
      { id: 12, name: "تكاب", unavailable: false },
      { id: 13, name: "اشنويه", unavailable: false },
      { id: 14, name: "شوط", unavailable: false },
      { id: 15, name: "چایپاره", unavailable: false },
      { id: 16, name: "چالدران", unavailable: false },
      { id: 17, name: "پلدشت", unavailable: false },
    ],
  },
  {
    id: 3,
    name: "اردبیل",
    unavailable: false,
    counties: [
      { id: 1, name: "اردبیل", unavailable: false },
      { id: 2, name: "پارس آباد", unavailable: false },
      { id: 3, name: "مشگين شهر", unavailable: false },
      { id: 4, name: "خلخال", unavailable: false },
      { id: 5, name: "گرمي", unavailable: false },
      { id: 6, name: "نمين", unavailable: false },
      { id: 7, name: "بیله‌سوار", unavailable: false },
      { id: 8, name: "اصلاندوز", unavailable: false },
      { id: 9, name: "کوثر", unavailable: false },
      { id: 10, name: "نير", unavailable: false },
      { id: 11, name: "سرعین", unavailable: false },
    ],
  },
  {
    id: 4,
    name: "اصفهان",
    unavailable: false,
    counties: [
      { id: 1, name: "اصفهان", unavailable: false },
      { id: 2, name: "كاشان", unavailable: false },
      { id: 3, name: "خميني شهر", unavailable: false },
      { id: 4, name: "نجف آباد", unavailable: false },
      { id: 5, name: "لنجان", unavailable: false },
      { id: 6, name: "فلاورجان", unavailable: false },
      { id: 7, name: "شاهین‌شهر و میمه", unavailable: false },
      { id: 8, name: "شهرضا", unavailable: false },
      { id: 9, name: "مباركه", unavailable: false },
      { id: 10, name: "برخوار", unavailable: false },
      { id: 11, name: "آران و بيدگل", unavailable: false },
      { id: 12, name: "گلپايگان", unavailable: false },
      { id: 13, name: "سميرم", unavailable: false },
      { id: 14, name: "تیران و کرون", unavailable: false },
      { id: 15, name: "فریدن", unavailable: false },
      { id: 16, name: "نطنز", unavailable: false },
      { id: 17, name: "اردستان", unavailable: false },
      { id: 18, name: "نائین", unavailable: false },
      { id: 19, name: "فریدون‌شهر", unavailable: false },
      { id: 20, name: "دهاقان", unavailable: false },
      { id: 21, name: "خوانسار", unavailable: false },
      { id: 22, name: "چادگان", unavailable: false },
      { id: 23, name: "بوئین و میاندشت", unavailable: false },
      { id: 24, name: "خور و بیابانک", unavailable: false },
    ],
  },
  {
    id: 5,
    name: "ايلام",
    unavailable: false,
    counties: [
      { id: 1, name: "ايلام", unavailable: false },
      { id: 2, name: "دهلران", unavailable: false },
      { id: 3, name: "چرداول", unavailable: false },
      { id: 4, name: "ايوان", unavailable: false },
      { id: 5, name: "آبدانان", unavailable: false },
      { id: 6, name: "دره شهر", unavailable: false },
      { id: 7, name: "مهران", unavailable: false },
      { id: 8, name: "ملکشاهی", unavailable: false },
      { id: 9, name: "بدره", unavailable: false },
      { id: 10, name: "سیروان", unavailable: false },
    ],
  },
  {
    id: 6,
    name: "بوشهر",
    unavailable: false,
    counties: [
      { id: 1, name: "بوشهر", unavailable: false },
      { id: 2, name: "دشتستان", unavailable: false },
      { id: 3, name: "كنگان", unavailable: false },
      { id: 4, name: "گناوه", unavailable: false },
      { id: 5, name: "دشتی", unavailable: false },
      { id: 6, name: "تنگستان", unavailable: false },
      { id: 7, name: "عسلویه", unavailable: false },
      { id: 8, name: "جم", unavailable: false },
      { id: 9, name: "دیر", unavailable: false },
      { id: 10, name: "دیلم", unavailable: false },
    ],
  },
  {
    id: 7,
    name: "تهران",
    unavailable: false,
    counties: [
      { id: 1, name: "تهران", unavailable: false },
      { id: 2, name: "شهريار", unavailable: false },
      { id: 3, name: "اسلامشهر", unavailable: false },
      { id: 4, name: "بهارستان", unavailable: false },
      { id: 5, name: "ملارد", unavailable: false },
      { id: 6, name: "پاكدشت", unavailable: false },
      { id: 7, name: "ري", unavailable: false },
      { id: 8, name: "قدس", unavailable: false },
      { id: 9, name: "رباط كريم", unavailable: false },
      { id: 10, name: "ورامين", unavailable: false },
      { id: 11, name: "قرچك", unavailable: false },
      { id: 12, name: "پردیس", unavailable: false },
      { id: 13, name: "دماوند", unavailable: false },
      { id: 14, name: "پیشوا", unavailable: false },
      { id: 15, name: "شمیرانات", unavailable: false },
      { id: 16, name: "فيروزكوه", unavailable: false },
    ],
  },
  {
    id: 8,
    name: "چهارمحال بختیاری",
    unavailable: false,
    counties: [
      { id: 1, name: "شهركرد", unavailable: false },
      { id: 2, name: "لردگان", unavailable: false },
      { id: 3, name: "بروجن", unavailable: false },
      { id: 4, name: "فارسان", unavailable: false },
      { id: 5, name: "کیار", unavailable: false },
      { id: 6, name: "اردل", unavailable: false },
      { id: 7, name: "کوهرنگ", unavailable: false },
      { id: 8, name: "سامان", unavailable: false },
      { id: 9, name: "بن", unavailable: false },
    ],
  },
  {
    id: 9,
    name: "خراسان جنوبی",
    unavailable: false,
    counties: [
      { id: 1, name: "بيرجند", unavailable: false },
      { id: 2, name: "قائنات", unavailable: false },
      { id: 3, name: "طبس", unavailable: false },
      { id: 4, name: "درمیان", unavailable: false },
      { id: 5, name: "نهبندان", unavailable: false },
      { id: 6, name: "فردوس", unavailable: false },
      { id: 7, name: "سربيشه", unavailable: false },
      { id: 8, name: "زیرکوه", unavailable: false },
      { id: 9, name: "سرایان", unavailable: false },
      { id: 10, name: "خوسف", unavailable: false },
      { id: 11, name: "بشرویه", unavailable: false },
    ],
  },
  {
    id: 10,
    name: "خراسان رضوی",
    unavailable: false,
    counties: [
      { id: 1, name: "مشهد", unavailable: false },
      { id: 2, name: "نيشابور", unavailable: false },
      { id: 3, name: "سبزوار", unavailable: false },
      { id: 4, name: "تربت جام", unavailable: false },
      { id: 5, name: "تربت حيدريه", unavailable: false },
      { id: 6, name: "قوچان", unavailable: false },
      { id: 7, name: "كاشمر", unavailable: false },
      { id: 8, name: "چناران", unavailable: false },
      { id: 9, name: "خواف", unavailable: false },
      { id: 10, name: "تايباد", unavailable: false },
      { id: 11, name: "فريمان", unavailable: false },
      { id: 12, name: "سرخس", unavailable: false },
      { id: 13, name: "گناباد", unavailable: false },
      { id: 14, name: "بردسکن", unavailable: false },
      { id: 15, name: "درگز", unavailable: false },
      { id: 16, name: "بینالود", unavailable: false },
      { id: 17, name: "زاوه", unavailable: false },
      { id: 18, name: "رشتخوار", unavailable: false },
      { id: 19, name: "باخرز", unavailable: false },
      { id: 20, name: "جوین", unavailable: false },
      { id: 21, name: "درگز", unavailable: false },
      { id: 22, name: "خلیل‌آباد", unavailable: false },
      { id: 23, name: "مه‌ولات", unavailable: false },
      { id: 24, name: "جغتای", unavailable: false },
      { id: 25, name: "صالح‌آباد", unavailable: false },
      { id: 26, name: "فیروزه", unavailable: false },
      { id: 27, name: "خوشاب", unavailable: false },
      { id: 28, name: "کلات", unavailable: false },
      { id: 29, name: "بجستان", unavailable: false },
      { id: 30, name: "داورزن", unavailable: false },
    ],
  },
  {
    id: 11,
    name: "خراسان شمالی",
    unavailable: false,
    counties: [
      { id: 1, name: "بجنورد", unavailable: false },
      { id: 2, name: "شيروان", unavailable: false },
      { id: 3, name: "اسفراين", unavailable: false },
      { id: 4, name: "مانه و سملقان", unavailable: false },
      { id: 5, name: "فاروج", unavailable: false },
      { id: 6, name: "راز و جرگلان", unavailable: false },
      { id: 7, name: "جاجرم", unavailable: false },
      { id: 8, name: "گرمه", unavailable: false },
    ],
  },
  {
    id: 12,
    name: "خوزستان",
    unavailable: false,
    counties: [
      { id: 1, name: "اهواز", unavailable: false },
      { id: 2, name: "دزفول", unavailable: false },
      { id: 3, name: "آبادان", unavailable: false },
      { id: 4, name: "بندر ماهشهر", unavailable: false },
      { id: 5, name: "شوش", unavailable: false },
      { id: 6, name: "ايذه", unavailable: false },
      { id: 7, name: "شوشتر", unavailable: false },
      { id: 8, name: "بهبهان", unavailable: false },
      { id: 9, name: "انديمشك", unavailable: false },
      { id: 10, name: "خرمشهر", unavailable: false },
      { id: 11, name: "شادگان", unavailable: false },
      { id: 12, name: "رامهرمز", unavailable: false },
      { id: 13, name: "مسجد سليمان", unavailable: false },
      { id: 14, name: "دشت آزادگان", unavailable: false },
      { id: 15, name: "کارون", unavailable: false },
      { id: 16, name: "باغ ملک", unavailable: false },
      { id: 17, name: "باوی", unavailable: false },
      { id: 18, name: "امیدیه", unavailable: false },
      { id: 19, name: "گتوند", unavailable: false },
      { id: 20, name: "رامشیر", unavailable: false },
      { id: 21, name: "حمیدیه", unavailable: false },
      { id: 22, name: "اندیکا", unavailable: false },
      { id: 23, name: "هويزه", unavailable: false },
      { id: 24, name: "هنديجان", unavailable: false },
      { id: 25, name: "لالي", unavailable: false },
      { id: 26, name: "هفتکل", unavailable: false },
      { id: 27, name: "آغاجاری", unavailable: false },
    ],
  },
  {
    id: 13,
    name: "زنجان",
    unavailable: false,
    counties: [
      { id: 1, name: "زنجان", unavailable: false },
      { id: 2, name: "خدابنده", unavailable: false },
      { id: 3, name: "ابهر", unavailable: false },
      { id: 4, name: "خرمدره", unavailable: false },
      { id: 5, name: "طارم", unavailable: false },
      { id: 6, name: "ماهنشان", unavailable: false },
      { id: 7, name: "ایجرود", unavailable: false },
      { id: 8, name: "سلطانیه", unavailable: false },
    ],
  },
  {
    id: 14,
    name: "سمنان",
    unavailable: false,
    counties: [
      { id: 1, name: "شاهرود", unavailable: false },
      { id: 2, name: "سمنان", unavailable: false },
      { id: 3, name: "دامغان", unavailable: false },
      { id: 4, name: "گرمسار", unavailable: false },
      { id: 5, name: "مهدی‌شهر", unavailable: false },
      { id: 6, name: "میامی", unavailable: false },
      { id: 7, name: "سرخه", unavailable: false },
      { id: 8, name: "آرادان", unavailable: false },
    ],
  },
  {
    id: 15,
    name: "سيستان و بلوچستان",
    unavailable: false,
    counties: [
      { id: 1, name: "زاهدان", unavailable: false },
      { id: 2, name: "چابهار", unavailable: false },
      { id: 3, name: "ايرانشهر", unavailable: false },
      { id: 4, name: "سراوان", unavailable: false },
      { id: 5, name: "خاش", unavailable: false },
      { id: 6, name: "زابل", unavailable: false },
      { id: 7, name: "نیک شهر", unavailable: false },
      { id: 8, name: "کنارک", unavailable: false },
      { id: 9, name: "سیب و سوران", unavailable: false },
      { id: 10, name: "زهک", unavailable: false },
      { id: 11, name: "مهرستان", unavailable: false },
      { id: 12, name: "دلگان", unavailable: false },
      { id: 13, name: "هیرمند", unavailable: false },
      { id: 14, name: "قصرقند", unavailable: false },
      { id: 15, name: "فنوج", unavailable: false },
      { id: 16, name: "نیمروز", unavailable: false },
      { id: 17, name: "ميرجاوه", unavailable: false },
      { id: 18, name: "هامون", unavailable: false },
    ],
  },
  {
    id: 16,
    name: "فارس",
    unavailable: false,
    counties: [
      { id: 1, name: "شيراز", unavailable: false },
      { id: 2, name: "مرودشت", unavailable: false },
      { id: 3, name: "کازرون", unavailable: false },
      { id: 4, name: "جهرم", unavailable: false },
      { id: 5, name: "لارستان", unavailable: false },
      { id: 6, name: "فسا", unavailable: false },
      { id: 7, name: "داراب", unavailable: false },
      { id: 8, name: "فیروزآباد", unavailable: false },
      { id: 9, name: "ممسنی", unavailable: false },
      { id: 10, name: "نی ریز", unavailable: false },
      { id: 11, name: "آباده", unavailable: false },
      { id: 12, name: "اقلید", unavailable: false },
      { id: 13, name: "لامرد", unavailable: false },
      { id: 14, name: "سپیدان", unavailable: false },
      { id: 15, name: "کوار", unavailable: false },
      { id: 16, name: "زرین دشت", unavailable: false },
      { id: 17, name: "قیر و کارزین", unavailable: false },
      { id: 18, name: "استهبان", unavailable: false },
      { id: 19, name: "مهر", unavailable: false },
      { id: 20, name: "خرامه", unavailable: false },
      { id: 21, name: "گراش", unavailable: false },
      { id: 22, name: "خرم‌بید", unavailable: false },
      { id: 23, name: "بوانات", unavailable: false },
      { id: 24, name: "فراشبند", unavailable: false },
      { id: 25, name: "رستم", unavailable: false },
      { id: 26, name: "ارسنجان", unavailable: false },
      { id: 27, name: "خنج", unavailable: false },
      { id: 28, name: "سروستان", unavailable: false },
      { id: 29, name: "پاسارگاد", unavailable: false },
    ],
  },
  {
    id: 17,
    name: "قزوين",
    unavailable: false,
    counties: [
      { id: 1, name: "قزوين", unavailable: false },
      { id: 2, name: "البرز", unavailable: false },
      { id: 3, name: "تاكستان", unavailable: false },
      { id: 4, name: "بوئين زهرا", unavailable: false },
      { id: 5, name: "آبيك", unavailable: false },
      { id: 6, name: "آوج", unavailable: false },
    ],
  },
  {
    id: 18,
    name: "قم",
    unavailable: false,
    counties: [
      { id: 1, name: "قم", unavailable: false },
      { id: 2, name: "جعفرآباد", unavailable: false },
      { id: 3, name: "کهک", unavailable: false },
    ],
  },
  {
    id: 19,
    name: "البرز",
    unavailable: false,
    counties: [
      { id: 1, name: "کرج", unavailable: false },
      { id: 2, name: "فردیس", unavailable: false },
      { id: 3, name: "ساوجیلاغ", unavailable: false },
      { id: 4, name: "نظرآباد", unavailable: false },
      { id: 5, name: "اشتهارد", unavailable: false },
      { id: 6, name: "طالقان", unavailable: false },
    ],
  },
  {
    id: 20,
    name: "كردستان",
    unavailable: false,
    counties: [
      { id: 1, name: "سنندج", unavailable: false },
      { id: 2, name: "سقز", unavailable: false },
      { id: 3, name: "مريوان", unavailable: false },
      { id: 4, name: "بانه", unavailable: false },
      { id: 5, name: "قروه", unavailable: false },
      { id: 6, name: "کامیاران", unavailable: false },
      { id: 7, name: "بيجار", unavailable: false },
      { id: 8, name: "دیواندره", unavailable: false },
      { id: 9, name: "دهگلان", unavailable: false },
      { id: 10, name: "سروآباد", unavailable: false },
    ],
  },
  {
    id: 21,
    name: "کرمان",
    unavailable: false,
    counties: [
      { id: 1, name: "کرمان", unavailable: false },
      { id: 2, name: "سيرجان", unavailable: false },
      { id: 3, name: "رفسنجان", unavailable: false },
      { id: 4, name: "جيرفت", unavailable: false },
      { id: 5, name: "بم", unavailable: false },
      { id: 6, name: "زرند", unavailable: false },
      { id: 7, name: "رودبار جنوب", unavailable: false },
      { id: 8, name: "شهربابک", unavailable: false },
      { id: 9, name: "كهنوج", unavailable: false },
      { id: 10, name: "ریگان", unavailable: false },
      { id: 11, name: "بافت", unavailable: false },
      { id: 12, name: "عنبرآباد", unavailable: false },
      { id: 13, name: "بردسير", unavailable: false },
      { id: 14, name: "سنقر", unavailable: false },
      { id: 15, name: "قلعه گنج", unavailable: false },
      { id: 16, name: "فهرج", unavailable: false },
      { id: 17, name: "منوجان", unavailable: false },
      { id: 18, name: "نرماشیر", unavailable: false },
      { id: 19, name: "راور", unavailable: false },
      { id: 20, name: "ارزوئیه", unavailable: false },
      { id: 21, name: "انار", unavailable: false },
      { id: 22, name: "رابر", unavailable: false },
      { id: 23, name: "فاریاب", unavailable: false },
      { id: 24, name: "کوهبنان", unavailable: false },
    ],
  },
  {
    id: 22,
    name: "كرمانشاه",
    unavailable: false,
    counties: [
      { id: 1, name: "کرمانشاه", unavailable: false },
      { id: 2, name: "اسلام آباد غرب", unavailable: false },
      { id: 3, name: "سرپل ذهاب", unavailable: false },
      { id: 4, name: "سنقر", unavailable: false },
      { id: 5, name: "هرسين", unavailable: false },
      { id: 6, name: "كنگاور", unavailable: false },
      { id: 7, name: "جوانرود", unavailable: false },
      { id: 8, name: "صحنه", unavailable: false },
      { id: 9, name: "پاوه", unavailable: false },
      { id: 10, name: "گیلانغرب", unavailable: false },
      { id: 11, name: "روانسر", unavailable: false },
      { id: 12, name: "دالاهو", unavailable: false },
      { id: 13, name: "ثلاث باباجانی", unavailable: false },
      { id: 14, name: "قصر شيرين", unavailable: false },
    ],
  },
  {
    id: 23,
    name: "كهكيلويه و بويراحمد",
    unavailable: false,
    counties: [
      { id: 1, name: "ياسوج", unavailable: false },
      { id: 2, name: "دوگنبدان", unavailable: false },
      { id: 3, name: "سي سخت", unavailable: false },
      { id: 4, name: "دهدشت", unavailable: false },
      { id: 5, name: "بهمنی", unavailable: false },
      { id: 6, name: "چرام", unavailable: false },
      { id: 7, name: "لنده", unavailable: false },
      { id: 8, name: "باشت", unavailable: false },
    ],
  },
  {
    id: 24,
    name: "گلستان",
    unavailable: false,
    counties: [
      { id: 1, name: "گرگان", unavailable: false },
      { id: 2, name: "گنبد كاووس", unavailable: false },
      { id: 3, name: "علي آباد", unavailable: false },
      { id: 4, name: "آق قلا", unavailable: false },
      { id: 6, name: "كلاله", unavailable: false },
      { id: 7, name: "آزاد شهر", unavailable: false },
      { id: 8, name: "راميان", unavailable: false },
      { id: 9, name: "ترکمن", unavailable: false },
      { id: 10, name: "مینودشت", unavailable: false },
      { id: 11, name: "کردکوی", unavailable: false },
      { id: 12, name: "گمیشان", unavailable: false },
      { id: 13, name: "گالیکش", unavailable: false },
      { id: 14, name: "مراوه‌تپه", unavailable: false },
      { id: 15, name: "بندر گز", unavailable: false },
    ],
  },
  {
    id: 25,
    name: "گيلان",
    unavailable: false,
    counties: [
      { id: 1, name: "رشت", unavailable: false },
      { id: 2, name: "تالش", unavailable: false },
      { id: 3, name: "لاهیجان", unavailable: false },
      { id: 4, name: "رودسر", unavailable: false },
      { id: 5, name: "لنگرود", unavailable: false },
      { id: 6, name: "بندر انزلی", unavailable: false },
      { id: 7, name: "صومعه سرا", unavailable: false },
      { id: 8, name: "آستانه اشرفیه", unavailable: false },
      { id: 9, name: "رودبار", unavailable: false },
      { id: 10, name: "فومن", unavailable: false },
      { id: 11, name: "آستارا", unavailable: false },
      { id: 12, name: "رضوانشهر", unavailable: false },
      { id: 13, name: "شفت", unavailable: false },
      { id: 14, name: "ماسال", unavailable: false },
      { id: 15, name: "سیاهکل", unavailable: false },
      { id: 16, name: "املش", unavailable: false },
    ],
  },
  {
    id: 26,
    name: "لرستان",
    unavailable: false,
    counties: [
      { id: 1, name: "خرم آباد", unavailable: false },
      { id: 2, name: "بروجرد", unavailable: false },
      { id: 3, name: "دوره", unavailable: false },
      { id: 4, name: "کوهدشت", unavailable: false },
      { id: 5, name: "دلفان", unavailable: false },
      { id: 6, name: "الیگودرز", unavailable: false },
      { id: 7, name: "سلسله", unavailable: false },
      { id: 8, name: "ازنا", unavailable: false },
      { id: 9, name: "پلدختر", unavailable: false },
      { id: 10, name: "رومشکان", unavailable: false },
    ],
  },
  {
    id: 27,
    name: "مازندران",
    unavailable: false,
    counties: [
      { id: 1, name: "بابل", unavailable: false },
      { id: 2, name: "ساری", unavailable: false },
      { id: 3, name: "آمل", unavailable: false },
      { id: 4, name: "قائم شهر", unavailable: false },
      { id: 5, name: "بهشهر", unavailable: false },
      { id: 6, name: "تنکابن", unavailable: false },
      { id: 7, name: "نوشهر", unavailable: false },
      { id: 8, name: "بابلسر", unavailable: false },
      { id: 9, name: "نور", unavailable: false },
      { id: 10, name: "نکا", unavailable: false },
      { id: 11, name: "چالوس", unavailable: false },
      { id: 12, name: "محمود آباد", unavailable: false },
      { id: 13, name: "جویبار", unavailable: false },
      { id: 14, name: "رامسر", unavailable: false },
      { id: 15, name: "فریدونکنار", unavailable: false },
      { id: 16, name: "میانرود", unavailable: false },
      { id: 17, name: "عباس آباد", unavailable: false },
      { id: 18, name: "سواد کوه", unavailable: false },
      { id: 19, name: "گلوگاه", unavailable: false },
      { id: 20, name: "سوادکوه شمالی", unavailable: false },
      { id: 21, name: "کلاردشت", unavailable: false },
      { id: 22, name: "سیمرغ", unavailable: false },
    ],
  },
  {
    id: 28,
    name: "مرکزی",
    unavailable: false,
    counties: [
      { id: 1, name: "اراک", unavailable: false },
      { id: 2, name: "ساوه", unavailable: false },
      { id: 3, name: "شازند", unavailable: false },
      { id: 4, name: "خمین", unavailable: false },
      { id: 5, name: "زرندیه", unavailable: false },
      { id: 6, name: "محلات", unavailable: false },
      { id: 7, name: "خنداب", unavailable: false },
      { id: 8, name: "دلیجان", unavailable: false },
      { id: 9, name: "کمیجان", unavailable: false },
      { id: 10, name: "فراهان", unavailable: false },
      { id: 11, name: "تفرش", unavailable: false },
      { id: 12, name: "آشتیان", unavailable: false },
    ],
  },
  {
    id: 29,
    name: "هرمزگان",
    unavailable: false,
    counties: [
      { id: 1, name: "بندرعباس", unavailable: false },
      { id: 2, name: "میناب", unavailable: false },
      { id: 3, name: "بندر لنگه", unavailable: false },
      { id: 4, name: "قشم", unavailable: false },
      { id: 5, name: "رودان", unavailable: false },
      { id: 6, name: "بستک", unavailable: false },
      { id: 7, name: "حاجی آباد", unavailable: false },
      { id: 8, name: "جاسک", unavailable: false },
      { id: 9, name: "خمیر", unavailable: false },
      { id: 10, name: "پارسیان", unavailable: false },
      { id: 11, name: "سیریک", unavailable: false },
      { id: 12, name: "بشاگرد", unavailable: false },
      { id: 13, name: "ابوموسی", unavailable: false },
    ],
  },
  {
    id: 30,
    name: "همدان",
    unavailable: false,
    counties: [
      { id: 1, name: "همدان", unavailable: false },
      { id: 2, name: "ملایر", unavailable: false },
      { id: 3, name: "نهاوند", unavailable: false },
      { id: 4, name: "کبودر آهنگ", unavailable: false },
      { id: 5, name: "بهار", unavailable: false },
      { id: 6, name: "رزن", unavailable: false },
      { id: 7, name: "تویسرکان", unavailable: false },
      { id: 8, name: "اسدآباد", unavailable: false },
      { id: 9, name: "فامنین", unavailable: false },
    ],
  },
  {
    id: 31,
    name: "يزد",
    unavailable: false,
    counties: [
      { id: 1, name: "یزد", unavailable: false },
      { id: 2, name: "میبد", unavailable: false },
      { id: 3, name: "اردکان", unavailable: false },
      { id: 4, name: "مهریز", unavailable: false },
      { id: 5, name: "ابرکوه", unavailable: false },
      { id: 6, name: "بافق", unavailable: false },
      { id: 7, name: "تفت", unavailable: false },
      { id: 8, name: "خاتم", unavailable: false },
      { id: 9, name: "اشکذر", unavailable: false },
      { id: 10, name: "بهاباد", unavailable: false },
    ],
  },
];

export default provinces;
