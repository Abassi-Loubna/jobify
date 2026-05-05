import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IGig } from "../../types";
import api from "../../api";

type Props = {
  item: IGig;
};

const Buttons = ({ item }: Props) => {
  const client = useQueryClient();

  // إعداد عملية الحذف باستخدام React Query
  const { mutate, isPending } = useMutation({
    mutationFn: () => api.delete(`/gigs/${item._id}`),
    onSuccess: () => {
      // تحديث البيانات تلقائياً بعد الحذف لكي يختفي العنصر من القائمة
      client.invalidateQueries({ queryKey: ["my-gigs"] });
    },
  });

  return (
    /* 
       الحاوية (Container):
       - flex: تفعيل نظام المرونة.
       - justify-center: توسيط الزر في الموبايل.
       - sm:justify-end: نقل الزر لليمين في الشاشات الأكبر (Tablets/Laptops).
       - my-4: إضافة مسافة عمودية (Margin Top & Bottom).
    */
    <div className="flex justify-center sm:justify-end mx-2 sm:mx-5 my-4">
      <button
        onClick={() => {
          if (confirm("هل أنت متأكد من حذف هذا العرض؟")) mutate();
        }}
        disabled={isPending}
        /* 
           تنسيقات الزر (Tailwind Classes):
           - w-full: الزر يأخذ كامل العرض في الموبايل لسهولة النقر.
           - sm:w-auto: الزر يعود لحجمه الطبيعي بناءً على النص في الشاشات الكبيرة.
           - bg-red-500: لون الخلفية الأحمر.
           - px-6 py-3: حشوة (Padding) كبيرة للموبايل لتسهيل اللمس.
           - sm:px-4 sm:py-2: حشوة أصغر للشاشات الكبيرة.
           - text-sm sm:text-base: حجم الخط يتغير حسب حجم الشاشة.
           - transition-all: لتكون الحركات (Hover/Active) ناعمة.
           - active:scale-95: تأثير "الضغط" عند النقر بالإصبع.
           - disabled:opacity-50: بهتان اللون عند التحميل لمنع التكرار.
        */
        className={`
          w-full sm:w-auto
          flex justify-center items-center
          bg-red-500 hover:bg-red-600
          text-white font-bold rounded-lg
          px-6 py-3 sm:px-4 sm:py-2
          text-sm sm:text-base
          transition-all duration-200
          active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed
          shadow-md hover:shadow-lg
        `}
      >
        {isPending ? (
          // نص يظهر فقط أثناء عملية الحذف
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
               {/* أيقونة تحميل بسيطة (Spinner) */}
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            جاري الحذف...
          </span>
        ) : (
          "حذف العرض"
        )}
      </button>
    </div>
  );
};

export default Buttons;