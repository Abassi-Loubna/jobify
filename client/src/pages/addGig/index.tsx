import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";
import CustomInput from "../../components/input";
import Select from "../../components/input/select";
import Loader from "../../components/loader";
import { categories, inputs } from "../../utils/consttants";
import { IoCloseCircle } from "react-icons/io5"; // تأكد من تثبيت react-icons

const AddGig = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // توليد روابط المعاينة وتنظيفها
  useEffect(() => {
    if (selectedFiles.length === 0) {
      setPreviews([]);
      return;
    }

    const objectUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);

    // تنظيف الروابط من الذاكرة عند تغيير الصور أو إغلاق الصفحة
    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [selectedFiles]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    
    // لإتاحة اختيار نفس الملف مرة أخرى إذا حذفه المستخدم
    e.target.value = ""; 
  };

  const removeImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const { isPending, mutate } = useMutation({
    mutationFn: (data: FormData) =>
      api.post("/gigs", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    onSuccess: (res) => {
      toast.success("Gig created 🚀");
      navigate(`/detail/${res.data.gig._id}`);
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Something went wrong ❌";
      toast.error(msg);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // إضافة الصور للـ FormData
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    mutate(formData);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6 pt-24">
      <div className="absolute w-[500px] h-[500px] bg-brand/10 blur-[120px] rounded-full top-10 left-10 pointer-events-none" />

      <div className="relative w-full max-w-5xl backdrop-blur-xl bg-bg-card border border-border-color rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-text-primary mb-8">Create Your Gig ✨</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {inputs.map((props, key) => (
              <CustomInput
                key={key}
                {...props}
                // إذا كان الحقل من نوع ملف، نمرر المعالج الخاص بنا
                onChange={props.type === "file" ? handleImageChange : undefined}
                multiple={props.type === "file"}
              />
            ))}

            <Select label="Category" options={categories} name="category" />
          </div>

          {/* قسم معاينة الصور المطور */}
          {previews.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-text-secondary">Images Preview ({selectedFiles.length})</p>
              <div className="flex gap-4 flex-wrap p-4 bg-black/10 rounded-xl border border-dashed border-border-color">
                {previews.map((url, i) => (
                  <div key={url} className="relative group w-24 h-24">
                    <img
                      src={url}
                      alt="preview"
                      className="w-full h-full object-cover rounded-lg border border-border-color shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 text-red-500 bg-white rounded-full hover:scale-110 transition-transform shadow-md"
                    >
                      <IoCloseCircle size={24} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            disabled={isPending}
            className="w-full py-4 rounded-xl font-bold text-white bg-brand hover:bg-brand-hover transition-all duration-300 flex justify-center items-center shadow-lg disabled:opacity-50"
          >
            {isPending ? <Loader /> : "Publish Gig"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGig;