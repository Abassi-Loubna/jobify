import { FormEvent } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = (e.currentTarget[0] as HTMLInputElement).value;
    navigate(`/search?query=${text}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-1 items-center bg-white rounded-lg border overflow-hidden w-full sm:max-w-[500px] focus-within:ring-2 focus-within:ring-emerald-500"
    >
      <input
        type="text"
        className="flex-1 w-full px-4 py-2 text-sm sm:text-base outline-none text-black"
        placeholder="Search..."
        defaultValue={params.get("query") || ""}
      />
      <button className="bg-emerald-500 px-4 py-2 text-white text-xl active:scale-95 transition-transform">
        <IoSearch />
      </button>
    </form>
  );
};

export default Form;