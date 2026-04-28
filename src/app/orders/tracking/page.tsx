import Link from "next/link";

const TIMELINE = [
  { label: "Đặt hàng thành công", detail: "25/04/2026 10:30", done: true, icon: "fa-check" },
  { label: "Shop đã xác nhận & đóng gói", detail: "BookStation đã nhận và xử lý đơn hàng của bạn", done: true, icon: "fa-check" },
  { label: "Đang trên đường giao hàng", detail: "Shipper đang giao hàng đến địa chỉ của bạn", active: true, icon: "fa-truck" },
  { label: "Giao hàng thành công", detail: "", done: false, icon: "fa-house" },
];

export default function TrackingPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/orders" className="text-secondary hover:text-primary text-sm flex items-center gap-1">
          <i className="fa-solid fa-chevron-left text-xs" /> Quay lại
        </Link>
        <h1 className="font-heading text-2xl text-primary font-bold">Theo Dõi Đơn Hàng</h1>
      </div>

      {/* Order info */}
      <div className="bg-white rounded-2xl border border-accent shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-secondary mb-1">Mã đơn hàng</p>
            <p className="font-bold text-primary text-xl font-mono">#BS240002</p>
          </div>
          <div className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-50 text-blue-600">
            <i className="fa-solid fa-truck mr-1" /> Đang giao
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-secondary mb-1">Người nhận</p>
            <p className="font-semibold text-primary">Nguyễn Văn A</p>
          </div>
          <div>
            <p className="text-secondary mb-1">Số điện thoại</p>
            <p className="font-semibold text-primary">09XX.XXX.XXX</p>
          </div>
          <div className="col-span-2">
            <p className="text-secondary mb-1">Địa chỉ giao hàng</p>
            <p className="font-semibold text-primary">Số 1 Võ Văn Ngân, Phường Linh Chiểu, TP. Thủ Đức, TP. Hồ Chí Minh</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-primary text-lg mb-6">Trạng thái đơn hàng</h2>
        <div className="relative">
          {TIMELINE.map((step, i) => (
            <div key={i} className="flex gap-4 mb-6 last:mb-0">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  step.done ? "bg-primary" : step.active ? "bg-blue-500 animate-pulse" : "bg-gray-200"
                }`}>
                  <i className={`fa-solid ${step.icon} text-sm ${step.done || step.active ? "text-white" : "text-gray-400"}`} />
                </div>
                {i < TIMELINE.length - 1 && (
                  <div className={`w-[2px] flex-1 mt-1 min-h-[32px] ${step.done ? "bg-primary" : "bg-gray-200"}`} />
                )}
              </div>
              <div className="pt-1">
                <p className={`font-semibold ${step.done ? "text-primary" : step.active ? "text-blue-600" : "text-gray-400"}`}>{step.label}</p>
                {step.detail && <p className="text-sm text-secondary mt-0.5">{step.detail}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-primary text-lg mb-4">Sản phẩm đặt mua</h2>
        <div className="flex items-center gap-4">
          <img src="/images/sachAtomicHabits.png" alt="Atomic Habits" className="w-16 h-20 object-cover rounded-lg shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-primary">Atomic Habits</p>
            <p className="text-sm text-secondary">James Clear</p>
            <p className="text-sm text-gray-500 mt-1">x2</p>
          </div>
          <p className="font-bold text-danger">260.000đ</p>
        </div>
        <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between text-sm">
          <span className="font-bold text-primary">Tổng thanh toán:</span>
          <span className="font-bold text-danger text-base">275.000đ</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Link href="/products"
          className="flex-1 border-2 border-primary text-primary font-semibold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
          <i className="fa-solid fa-store text-sm" /> Tiếp tục mua sắm
        </Link>
        <Link href="/orders"
          className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-secondary transition-colors shadow-md flex items-center justify-center gap-2">
          <i className="fa-solid fa-box" /> Tất cả đơn hàng
        </Link>
      </div>
    </main>
  );
}
