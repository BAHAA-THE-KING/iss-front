// تابع لإنشاء مفتاح جلسة عشوائي
export const generateSessionKey = () => {
  let res = ""; // تعريف متغير لتخزين المفتاح

  // تكرار العملية ثلاث مرات لإنتاج مفتاح طويل
  for (let i = 0; i < 3; i++) {
    // إنشاء سلسلة عشوائية بناءً على رقم عشري عشوائي وتحويله إلى نظام الأساس 36
    // (يتكون من الأرقام 0-9 والحروف a-z)
    res += (Math.random() * 100000).toString(36);
  }

  // تقطيع السلسلة الناتجة إلى أول 24 حرفًا لضمان طول ثابت
  return res.slice(0, 24);
};
