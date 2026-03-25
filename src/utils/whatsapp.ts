import { CLINIC_WHATSAPP, GOOGLE_REVIEW_URL } from '../config';

function cleanPhone(phone: string): string {
    // يزيل المسافات والرموز ويضيف رمز الدولة إذا ناقص
    let cleaned = phone.replace(/[\s\-().+]/g, '');
    if (cleaned.startsWith('0')) cleaned = '966' + cleaned.slice(1);
    if (!cleaned.startsWith('9')) cleaned = CLINIC_WHATSAPP; // fallback
    return cleaned;
}

function open(phone: string, text: string): void {
    const url = `https://wa.me/${cleanPhone(phone)}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

/**
 * ✅ رسالة تأكيد الموعد
 */
export function sendConfirmation(phone: string, name: string, service: string, date: string): void {
    const text =
        `مرحباً ${name}! 😊🦷\n\n` +
        `✅ تم تأكيد موعدك في عيادة *BrightSmile*\n\n` +
        `📅 التاريخ: ${date}\n` +
        `🦷 الخدمة: ${service}\n\n` +
        `نتطلع لرؤيتك! لأي استفسار لا تتردد في التواصل معنا. 😊`;
    open(phone, text);
}

/**
 * ⏰ رسالة تذكير بالموعد
 */
export function sendReminder(phone: string, name: string, service: string, date: string): void {
    const text =
        `مرحباً ${name}! ⏰\n\n` +
        `نذكّرك بموعدك القادم في عيادة *BrightSmile*:\n\n` +
        `📅 ${date}\n` +
        `🦷 ${service}\n\n` +
        `نرجو الحضور قبل الموعد بـ 10 دقائق. نراك قريباً! 😊`;
    open(phone, text);
}

/**
 * ⭐ طلب تقييم بعد الزيارة
 */
export function sendReviewRequest(phone: string, name: string): void {
    const text =
        `مرحباً ${name}! 🌟\n\n` +
        `نتمنى أن تكون زيارتك لعيادة *BrightSmile* كانت مميزة! 🦷✨\n\n` +
        `يسعدنا جداً لو شاركتنا تقييمك عبر الرابط التالي:\n` +
        `${GOOGLE_REVIEW_URL}\n\n` +
        `رأيك يساعدنا على التحسين المستمر ويساعد مرضى آخرين في اختيار الرعاية الصحية المناسبة 🙏`;
    open(phone, text);
}
