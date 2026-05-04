import React, { useState, useEffect }from 'react';

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
    <div className="min-h-screen bg-[#020617] text-slate-100 p-6 flex justify-center items-center font-sans">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-3xl shadow-2xl border border-blue-950/50">
        
        {/* Left Column: Order Summary (Very Dark Blue) */}
        <div className="lg:col-span-5 bg-[#030712] p-10 space-y-8 border-r border-blue-950/50">
          <div>
            {/* The title here uses the light emerald accent */}
            <h2 className="text-3xl font-bold text-emerald-400">Order Summary</h2>
            <p className="text-slate-400 mt-2">Set project rates and review the total cost.</p>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-emerald-300 font-semibold mb-2">Hourly Rate ($)</label>
              <input 
                type="number" 
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Math.max(0, Number(e.target.value)))}
                // Inputs use slightly lighter dark blue with emerald focus ring
                className="w-full bg-[#111827] border border-emerald-900/50 rounded-xl p-4 text-xl font-bold text-white focus:ring-2 ring-emerald-500 outline-none transition-all text-center"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-emerald-300 font-semibold mb-2">Hours Worked</label>
              <input 
                type="number" 
                value={hoursWorked}
                onChange={(e) => setHoursWorked(Math.max(0, Number(e.target.value)))}
                className="w-full bg-[#111827] border border-emerald-900/50 rounded-xl p-4 text-xl font-bold text-white focus:ring-2 ring-emerald-500 outline-none transition-all text-center"
              />
            </div>
          </div>

          <div className="pt-8 border-t border-blue-950 space-y-4">
            <div className="flex justify-between text-slate-400">
              <span className="font-medium">Subtotal</span>
              <span className="text-white">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span className="font-medium">Platform Fee</span>
              <span className="text-white">${platformFee.toLocaleString()}</span>
            </div>
            {/* Total amount is accented in light emerald */}
            <div className="flex justify-between text-2xl font-black text-emerald-400 pt-4 border-t border-blue-950">
              <span>Total Amount</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
{/* Right Column: Checkout Details */}
        <div className="lg:col-span-7 bg-[#111827] p-10">
          <h2 className="text-2xl font-bold mb-8">Payment Details</h2>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Cardholder Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full bg-[#020617] border border-blue-950/50 rounded-xl p-4 outline-none focus:border-emerald-500 transition-colors text-white" 
              />
            </div>
            
            <div>
 <label className="block text-sm font-medium text-slate-400 mb-2">Card Number</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-[#020617] border border-blue-950/50 rounded-xl p-4 outline-none focus:border-emerald-500 transition-colors text-white" 
                />
                <div className="absolute right-4 top-4 text-emerald-500">
                   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Expiry Date</label>
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  className="w-full bg-[#020617] border border-blue-950/50 rounded-xl p-4 outline-none focus:border-emerald-500 transition-colors text-white" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">CVV</label>
                <input 
                  type="password" 
                  placeholder="123" 
                  className="w-full bg-[#020617] border border-blue-950/50 rounded-xl p-4 outline-none focus:border-emerald-500 transition-colors text-white" 
                />
              </div>
            </div>

            <div className="pt-6">
              {/* Button uses the bright emerald color */}
              <button 
                type="button"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-5 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-900/40 uppercase tracking-widest"
              >
                Confirm & Pay ${total.toLocaleString()}
              </button>
            </div>
            
            <p className="text-center text-slate-500 text-xs">
              Secure encrypted payment powered by Jobify Gateway
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;