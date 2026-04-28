"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

const COMBO_BOOKS = [
  { title: 'Atomic Habits', author: 'James Clear', price: 174000, gradient: 'from-[#FDF5E6] to-[#D3A376]', bookBg: 'bg-primary' },
  { title: 'Deep Work', author: 'Cal Newport', price: 119000, gradient: 'from-[#e8f4fd] to-[#8C6E63]', bookBg: 'bg-[#2c4a6e]' },
  { title: 'Án Mạng Trên Chuyến Tàu Cao Tốc', author: 'Kotaro Isaka', price: 139000, gradient: 'from-[#fff0f0] to-[#FF0B22]', bookBg: 'bg-[#8b0000]' },
  { title: 'Miền Hạnh Phúc', author: 'Emily Henry', price: 210000, gradient: 'from-[#ffeef8] to-[#d3a376]', bookBg: 'bg-[#8C6E63]' },
  { title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu?', author: 'Rosie Nguyễn', price: 99000, gradient: 'from-[#f0fff4] to-[#D3A376]', bookBg: 'bg-[#2d6a4f]' },
  { title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: 79000, gradient: 'from-[#fff8e1] to-[#D3A376]', bookBg: 'bg-[#7B4F2E]' },
];

export default function BackToSchoolPage() {
  const addItem = useCartStore((s) => s.addItem);
  const [toast, setToast] = useState(false);

  function handleAddToCart(e: React.MouseEvent, book: any) {
    e.preventDefault();
    addItem({ id: book.title.toLowerCase().replace(/\s+/g, '-'), title: book.title, author: book.author, price: book.price, image: "", qty: 1 });
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  function addAllCombo() {
    COMBO_BOOKS.forEach(b => {
      addItem({ id: b.title.toLowerCase().replace(/\s+/g, '-'), title: b.title, author: b.author, price: b.price, image: "", qty: 1 });
    });
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="font-heading font-bold text-primary text-5xl md:text-[70px] leading-[1.1]">Combo Back To School</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {COMBO_BOOKS.map((book) => (
          <Link key={book.title} href={`/products/${book.title.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white border border-primary rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer block flex flex-col">
            <div className={`h-48 bg-linear-to-br ${book.gradient} flex items-center justify-center p-4 shrink-0`}>
              <div className={`w-24 h-36 ${book.bookBg} rounded shadow-lg flex items-center justify-center`}>
                <i className="fa-solid fa-book text-white text-3xl opacity-80"></i>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-bold text-primary text-lg leading-tight mb-1 line-clamp-2">{book.title}</h3>
              <div className="text-accent text-base mb-1">★★★★★</div>
              <p className="text-secondary text-sm mb-3">{book.author}</p>
              <p className="text-danger font-bold text-xl mt-auto">{book.price.toLocaleString('vi-VN')} đ</p>
              <button onClick={(e) => handleAddToCart(e, book)} className="mt-3 w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-secondary transition-colors">Thêm vào giỏ</button>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-white border border-accent rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-heading text-2xl font-bold text-primary mb-2">Mua Trọn Combo (6 cuốn)</h2>
          <p className="text-secondary">Tiết kiệm hơn khi mua trọn bộ Combo Back To School</p>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-gray-400 line-through text-lg">820.000 đ</span>
            <span className="text-danger font-bold text-3xl">697.000 đ</span>
            <span className="bg-danger text-white text-xs font-bold px-2 py-1 rounded-full">-15%</span>
          </div>
        </div>
        <button onClick={addAllCombo} className="bg-primary text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-secondary transition-colors whitespace-nowrap">
          <i className="fa-solid fa-cart-shopping mr-2"></i> Thêm trọn combo
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-primary text-white text-sm font-medium px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50">
          <i className="fa-solid fa-check-circle text-accent" /> Đã thêm vào giỏ hàng!
        </div>
      )}
    </main>
  );
}
