import { Link } from "react-router-dom";
import { IGig } from "../../types";
import Rating from "../rating";
import Buttons from "./buttons";

type Props = {
  item: IGig;
  expand?: boolean;
};

const Card = ({ item, expand }: Props) => {
  return (
    // الحاوية الأساسية: أضفنا w-full لضمان ملء المساحة المتاحة في شبكة (Grid) متجاوبة
    <div className="group relative bg-[#020617]/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] flex flex-col h-full w-full max-w-[400px] mx-auto sm:max-w-none">
      
      {/* 
          أزرار التحكم:
          أضفنا تعديل لموقع الأزرار لتجنب تغطية محتوى الكارد في الشاشات الصغيرة جداً
      */}
      {expand && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 scale-90 sm:scale-100">
          <Buttons item={item} />
        </div>
      )}

      <Link
        to={`/detail/${item._id}`}
        className="flex flex-col h-full cursor-pointer"
      >
        {/* 
            صورة الغلاف: 
            استخدام aspect-video يضمن نسبة أبعاد ثابتة (16:9) تجعل الكروت متساوية في الارتفاع
        */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={item?.coverImage}
            alt={item?.title}
            // loading="lazy" لتحسين أداء تحميل الصفحة في الموبايل
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* طبقة تدرج لضمان وضوح النص فوق الصورة إذا لزم الأمر */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent opacity-60" />
        </div>

        {/* محتوى الكارد: تقليل الـ padding في الموبايل (p-3) وزيادته في الشاشات الأكبر (sm:p-4) */}
        <div className="p-3 sm:p-4 flex flex-col flex-grow gap-2 sm:gap-3">
          
          {/* معلومات صاحب الإعلان */}
          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              src={item?.user?.photo} 
              className="size-7 sm:size-8 rounded-full ring-2 ring-emerald-500/20 object-cover" 
              alt={item?.user?.username}
            />
            <p className="text-xs sm:text-sm truncate">
              <span className="text-gray-400">by </span>
              <span className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                {item?.user?.username}
              </span>
            </p>
          </div>

          {/* 
              العنوان: 
              - text-sm للموبايل و text-base للشاشات الأكبر.
              - h-[2.5rem] تحديد ارتفاع ثابت يمنع اهتزاز التصميم عند اختلاف طول العناوين.
          */}
          <h3 className="text-white text-sm sm:text-base font-semibold leading-snug line-clamp-2 h-[2.5rem] sm:h-[2.8rem] group-hover:text-emerald-500 transition-colors">
            {item?.title}
          </h3>

          {/* التقييم: صغرنا الحجم قليلاً في الموبايل */}
          <div className="mt-auto">
             <Rating rating={4.5} reviews={"1k+"} designs="text-emerald-500 text-[10px] sm:text-xs font-bold" />
          </div>

          <hr className="border-white/5 my-1" />

          {/* السعر: جعلناه أكثر بروزاً ووضوحاً */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 font-bold">Starting At</span>
            <div className="text-white font-bold flex items-baseline gap-1">
              <span className="text-emerald-500 text-[10px] sm:text-xs">DZ</span>
              <span className="text-lg sm:text-xl font-black">
                {item.package_price.toLocaleString("en")}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;