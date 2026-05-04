import { useContext } from "react";
import AuthContext from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Card from "../../components/card";
import { IGig } from "../../types";

// تعريف واجهة البيانات القادمة من السيرفر
interface ApiResponse {
  data: {
    gigs: IGig[];
  };
}

const Mygigs = () => {
  const { user } = useContext(AuthContext);

  // استخدام React Query لجلب البيانات
  const { isLoading, error, refetch, data } = useQuery<ApiResponse>({
    // نستخدم ID المستخدم في المفتاح لضمان تحديث البيانات عند تغيير المستخدم
    queryKey: ["my-gigs", user?._id],
    
    // جلب البيانات من السيرفر باستخدام axios (api)
    queryFn: () => api.get("gigs", { params: { userID: user?._id } }),
    
    // أهم خطوة: لا يتم إرسال الطلب إلا إذا كان الـ ID موجوداً فعلياً
    enabled: !!user?._id,
    
    // اختياري: لإعادة المحاولة في حال فشل الطلب (مثلاً 3 مرات)
    retry: 1,
  });

  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl text-gray-500 font-bold mb-5 px-4 md:px-12">
        My Gigs
      </h1>

      <div className="px-4 md:px-12">
        {/* حالة التحميل */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        )}

        {/* حالة الخطأ */}
        {error && (
          <div className="my-10">
            <Error error={error} refetch={refetch} />
          </div>
        )}

        {/* عرض البيانات عند نجاح الطلب */}
        {!isLoading && !error && (
          <>
            {data?.data?.gigs && data.data.gigs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 my-5">
                {data.data.gigs.map((gig: IGig) => (
                  <Card key={gig._id} item={gig} expand />
                ))}
              </div>
            ) : (
              // في حال لم يكن لدى المستخدم أي Gigs
              <div className="text-center py-20 text-gray-400">
                <p className="text-xl">You haven't created any gigs yet.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Mygigs;