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
    // الحاوية الأساسية: استخدام bg-bg-card و border-border-color للتكيف مع الوضعين
    <div className="group relative bg-bg-card/50 backdrop-blur-sm border border-border-color rounded-2xl overflow-hidden hover:border-brand/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--brand-rgb),0.1)] flex flex-col h-full w-full max-w-[400px] mx-auto sm:max-w-none">
      
      {/* أزرار التحكم */}
      {expand && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 scale-90 sm:scale-100">
          <Buttons item={item} />
        </div>
      )}

      <Link
        to={`/detail/${item._id}`}
        className="flex flex-col h-full cursor-pointer"
      >
        {/* صورة الغلاف مع طبقة تدرج ديناميكية */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={item?.coverImage}
            alt={item?.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* التدرج يستخدم شفافية من لون الخلفية الأساسي ليناسب الوضع المختار */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent opacity-60" />
        </div>

        {/* محتوى الكارد */}
        <div className="p-3 sm:p-4 flex flex-col flex-grow gap-2 sm:gap-3">
          
          {/* معلومات صاحب الإعلان */}
          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              src={item?.user?.photo} 
              className="size-7 sm:size-8 rounded-full ring-2 ring-brand/20 object-cover" 
              alt={item?.user?.username}
            />
            <p className="text-xs sm:text-sm truncate">
              <span className="text-text-muted">by </span>
              <span className="font-medium text-text-primary group-hover:text-brand transition-colors">
                {item?.user?.username}
              </span>
            </p>
          </div>

          {/* العنوان */}
          <h3 className="text-text-primary text-sm sm:text-base font-semibold leading-snug line-clamp-2 h-[2.5rem] sm:h-[2.8rem] group-hover:text-brand transition-colors">
            {item?.title}
          </h3>

          {/* التقييم */}
          <div className="mt-auto">
             <Rating rating={4.5} reviews={"1k+"} designs="text-brand text-[10px] sm:text-xs font-bold" />
          </div>

          <hr className="border-border-color my-1" />

          {/* السعر */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-text-muted font-bold">Starting At</span>
            <div className="text-text-primary font-bold flex items-baseline gap-1">
              <span className="text-brand text-[10px] sm:text-xs font-black">DZ</span>
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