"use client";

import { useState } from "react";
import Link from "next/link";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setIsTracking(true);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl md:text-4xl text-primary font-bold mb-4">Theo dõi đơn hàng</h1>
        <p className="text-secondary text-sm md:text-base">Nhập mã đơn hàng của bạn để kiểm tra tình trạng giao hàng mới nhất.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 max-w-2xl mx-auto">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <i className="fa-solid fa-box text-gray-400" />
            </div>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Nhập mã đơn hàng (VD: BS-123456)"
              className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 text-sm"
              required
            />
          </div>
          <button type="submit" className="bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-secondary transition-colors whitespace-nowrap">
            Tra cứu
          </button>
        </form>

        {/* Kết quả Tra cứu (Mock) */}
        {isTracking && (
          <div className="mt-10 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-primary text-lg">Đơn hàng: <span className="text-accent">{orderId.toUpperCase()}</span></h3>
                <p className="text-sm text-secondary">Dự kiến giao: 22/04/2026</p>
              </div>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Đang giao</span>
            </div>

            {/* Timeline */}
            <div className="relative pl-6 space-y-8 before:absolute before:inset-y-2 before:left-2.5 before:w-0.5 before:bg-gray-100">
              <div className="relative">
                <div className="absolute -left-[33px] w-5 h-5 bg-accent rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <p className="font-bold text-primary text-sm">Đơn hàng đang được giao đến bạn</p>
                <p className="text-xs text-secondary mt-1">Hôm nay 08:30 - Shipper Nguyễn Văn A (0901234567)</p>
              </div>
              
              <div className="relative opacity-60">
                <div className="absolute -left-[33px] w-5 h-5 bg-gray-300 rounded-full border-4 border-white shadow-sm"></div>
                <p className="font-bold text-primary text-sm">Đã rời kho phân phối trung tâm</p>
                <p className="text-xs text-secondary mt-1">Hôm qua 18:45 - Kho TP.HCM</p>
              </div>

              <div className="relative opacity-60">
                <div className="absolute -left-[33px] w-5 h-5 bg-gray-300 rounded-full border-4 border-white shadow-sm"></div>
                <p className="font-bold text-primary text-sm">Đã đóng gói xong</p>
                <p className="text-xs text-secondary mt-1">Hôm qua 14:20 - Trạm đóng gói BookStation</p>
              </div>

              <div className="relative opacity-60">
                <div className="absolute -left-[33px] w-5 h-5 bg-gray-300 rounded-full border-4 border-white shadow-sm"></div>
                <p className="font-bold text-primary text-sm">Xác nhận đơn hàng thành công</p>
                <p className="text-xs text-secondary mt-1">Hôm qua 10:15 - Hệ thống tự động</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-center mt-8">
        <Link href="/products" className="text-sm font-semibold text-secondary hover:text-primary transition-colors inline-flex items-center gap-2">
          <i className="fa-solid fa-arrow-left" /> Trở về cửa hàng
        </Link>
      </div>
    </main>
  );
}