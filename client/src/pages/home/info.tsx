import { BsFillPatchCheckFill } from "react-icons/bs";
import { items } from "../../utils/consttants";

const Info = () => {
  return (
    <section className="my-10 bg-brand/10 border border-brand/20 rounded-2xl p-4 sm:p-6">
      <h1 className="text-3xl">
        <span className="font-extrabold text-text-primary">JOB</span>
        <span className="text-brand font-extrabold">IFY</span>
        <span className="text-text-secondary font-normal">.pro</span>
      </h1>

      <p className="text-4xl font-normal my-6 sm:my-8 text-text-primary">
        The <span className="text-brand">premium</span> freelance solution for
        businesses
      </p>

      <div className="grid lg:grid-cols-2 gap-5">
        {items.map((item) => (
          <div key={item.title}>
            <h5 className="font-semibold text-xl flex items-center gap-3 text-text-primary">
              <BsFillPatchCheckFill className="text-brand shrink-0" />
              {item.title}
            </h5>
            <p className="text-lg text-text-secondary">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center my-6 sm:my-8">
        <button className="bg-text-primary text-bg-primary px-6 py-2.5 rounded-md font-bold hover:bg-brand hover:text-bg-primary transition-all duration-300 hover:rounded-full active:scale-95">
          Try Now
        </button>
      </div>
    </section>
  );
};

export default Info;