import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { HiChevronRight } from "react-icons/hi2";

type Props = {
  category: string;
};

const BreadCrumb: React.FC<Props> = ({ category }) => {
  return (
    <div className="my-4 sm:my-6 px-2 sm:px-0">
      <nav className="flex items-center flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm font-medium">
        <Link
          to="/"
          className="p-1.5 rounded-md text-gray-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200"
          aria-label="Home"
        >
          <AiOutlineHome size={16} />
        </Link>

        <HiChevronRight
          className="text-gray-400 dark:text-zinc-600"
          size={12}
        />

        <Link
          to={`/search?category=${category}`}
          className="px-2 py-1 rounded-md text-gray-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all duration-200 capitalize break-words"
        >
          {category}
        </Link>
      </nav>
    </div>
  );
};

export default BreadCrumb;