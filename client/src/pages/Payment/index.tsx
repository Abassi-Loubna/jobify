import React, { useState, useEffect } from 'react';

const PaymentPage = () => {
  // Settings (in USD now)
  const [hourlyRate, setHourlyRate] = useState(50);
  const [hoursWorked, setHoursWorked] = useState(1);

  // Logic constants
  const platformFee = 10;
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  // Auto-calculate total
  useEffect(() => {
    const sub = hourlyRate * hoursWorked;
    setSubtotal(sub);
    setTotal(sub + platformFee);
  }, [hourlyRate, hoursWorked]);

  return (
    // استخدام bg-primary للتحكم في خلفية الصفحة كاملة
    <div className="min-h-screen bg-bg-primary text-text-primary p-6 flex justify-center items-center font-sans transition-colors duration-300">
      
      {/* الحاوية الرئيسية: استخدام bg-card و border-color */}
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-3xl shadow-2xl border border-border-color">
        
        {/* العمود الأيسر: ملخص الطلب - استخدام bg-secondary */}
        <div className="lg:col-span-5 bg-bg-secondary p-10 space-y-8 border-r border-border-color">
          <div>
            {/* استخدام اللون البراند (العلامة التجارية) */}
            <h2 className="text-3xl font-bold text-brand">Order Summary</h2>
            <p className="text-text-muted mt-2">Set project rates and review the total cost.</p>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-brand font-semibold mb-2">Hourly Rate ($)</label>
              <input 
                type="number" 
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Math.max(0, Number(e.target.value)))}
                // استخدام bg-primary داخل المدخلات لتباينها مع bg-secondary
                className="w-full bg-bg-primary border border-border-color rounded-xl p-4 text-xl font-bold text-text-primary focus:ring-2 ring-brand outline-none transition-all text-center"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-brand font-semibold mb-2">Hours Worked</label>
              <input 
                type="number" 
                value={hoursWorked}
                onChange={(e) => setHoursWorked(Math.max(0, Number(e.target.value)))}
                className="w-full bg-bg-primary border border-border-color rounded-xl p-4 text-xl font-bold text-text-primary focus:ring-2 ring-brand outline-none transition-all text-center"
              />
            </div>
          </div>

          <div className="pt-8 border-t border-border-color space-y-4">
            <div className="flex justify-between text-text-secondary">
              <span className="font-medium">Subtotal</span>
              <span className="text-text-primary">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span className="font-medium">Platform Fee</span>
              <span className="text-text-primary">${platformFee.toLocaleString()}</span>
            </div>
            {/* المجموع النهائي بلون البراند */}
            <div className="flex justify-between text-2xl font-black text-brand pt-4 border-t border-border-color">
              <span>Total Amount</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* العمود الأيمن: تفاصيل الدفع - استخدام bg-card */}
        <div className="lg:col-span-7 bg-bg-card p-10">
          <h2 className="text-2xl font-bold mb-8 text-text-primary">Payment Details</h2>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Cardholder Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full bg-bg-primary border border-border-color rounded-xl p-4 outline-none focus:border-brand transition-colors text-text-primary placeholder:text-text-muted" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Card Number</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-bg-primary border border-border-color rounded-xl p-4 outline-none focus:border-brand transition-colors text-text-primary placeholder:text-text-muted" 
                />
                <div className="absolute right-4 top-4 text-brand">
                   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Expiry Date</label>
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  className="w-full bg-bg-primary border border-border-color rounded-xl p-4 outline-none focus:border-brand transition-colors text-text-primary placeholder:text-text-muted" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">CVV</label>
                <input 
                  type="password" 
                  placeholder="123" 
                  className="w-full bg-bg-primary border border-border-color rounded-xl p-4 outline-none focus:border-brand transition-colors text-text-primary placeholder:text-text-muted" 
                />
              </div>
            </div>

            <div className="pt-6">
              {/* زر التأكيد باستخدام ألوان الـ brand و brand-hover */}
              <button 
                type="button"
                className="w-full bg-brand hover:bg-brand-hover text-white font-black py-5 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-xl uppercase tracking-widest"
              >
                Confirm & Pay ${total.toLocaleString()}
              </button>
            </div>
            
            <p className="text-center text-text-muted text-xs">
              Secure encrypted payment powered by Jobify Gateway
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;