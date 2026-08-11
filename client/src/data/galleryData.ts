export type GalleryLocale = "ar" | "en";

export const galleryData: Record<GalleryLocale, Array<{ image: string; title: string; description: string; tag: string }>> = {
  ar: [
    { image: "/manus-storage/raad-gallery-manuscript_27b27071.jpg", title: "المخطوط بوصفه بداية السؤال", description: "أجواء بصرية مستلهمة من قراءة المخطوطات العربية وتحقيقها.", tag: "مخطوطات" },
    { image: "/manus-storage/raad-gallery-research-desk_426f7bc8.jpg", title: "مكتب الباحث", description: "تفاصيل يومية من القراءة والمقارنة والتحرير العلمي.", tag: "بحث" },
    { image: "/manus-storage/raad-gallery-lecture-hall_5cc40f25.jpg", title: "المعرفة في قاعة الدرس", description: "فضاء هادئ يربط التدريس الجامعي بالنقاش الأكاديمي.", tag: "تدريس" },
    { image: "/manus-storage/raad-gallery-library_10b1173b.jpg", title: "رفوف الذاكرة العلمية", description: "صورة أرشيفية مفاهيمية عن تراكم الكتب والسنوات والقراءات.", tag: "أرشيف" },
  ],
  en: [
    { image: "/manus-storage/raad-gallery-manuscript_27b27071.jpg", title: "The manuscript as a question", description: "A visual atmosphere inspired by reading and editing Arabic manuscripts.", tag: "Manuscripts" },
    { image: "/manus-storage/raad-gallery-research-desk_426f7bc8.jpg", title: "The research desk", description: "A quiet study of reading, comparison, and scholarly editing.", tag: "Research" },
    { image: "/manus-storage/raad-gallery-lecture-hall_5cc40f25.jpg", title: "Knowledge in the lecture hall", description: "A calm space connecting university teaching with academic dialogue.", tag: "Teaching" },
    { image: "/manus-storage/raad-gallery-library_10b1173b.jpg", title: "Shelves of academic memory", description: "A conceptual archival image about books, years, and accumulated reading.", tag: "Archive" },
  ],
};
