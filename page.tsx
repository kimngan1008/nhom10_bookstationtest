import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <div className="w-24 h-24 mx-auto bg-lightBg rounded-full flex items-center justify-center mb-6">
          <i className="fa-solid fa-book-open text-4xl text-accent" />
        </div>
        <h1 className="font-heading text-4xl md:text-5xl text-primary font-bold mb-6">Về BookStation</h1>
        <p className="text-lg text-secondary leading-relaxed max-w-2xl mx-auto">
          Trạm dừng chân của những tâm hồn yêu sách. Nơi mỗi cuốn sách không chỉ là tri thức, mà còn là một tác phẩm nghệ thuật độc bản.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-10">
        <section>
          <h2 className="font-heading text-2xl md:text-3xl text-primary font-bold mb-4 border-l-4 border-accent pl-4">Câu chuyện của chúng tôi</h2>
          <p className="text-gray-600 leading-relaxed">
            Ra đời từ năm 2024, BookStation bắt đầu với một niềm tin đơn giản: Sách in luôn mang một giá trị nguyên bản không thể thay thế. Trong kỷ nguyên số hóa, chúng tôi muốn tạo ra một không gian nơi người yêu sách có thể chậm lại, chạm vào từng trang giấy và đắm chìm trong mùi mực in thơm ngát.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl md:text-3xl text-primary font-bold mb-4 border-l-4 border-accent pl-4">Sứ mệnh</h2>
          <p className="text-gray-600 leading-relaxed">
            Lan tỏa văn hóa đọc đến giới trẻ Việt Nam thông qua trải nghiệm mua sắm hiện đại, tiện lợi. Đặc biệt, chúng tôi tiên phong với dịch vụ <strong>Custom Sách</strong> – biến những cuốn sách thông thường (và cả sách cũ) trở thành những món quà mang đậm dấu ấn cá nhân, độc nhất vô nhị.
          </p>
        </section>

        <section className="bg-lightBg rounded-2xl p-8 mt-8">
          <h3 className="font-heading text-xl text-primary font-bold mb-4 text-center">Tại sao chọn BookStation?</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <li className="flex items-center gap-3"><i className="fa-solid fa-check text-accent" /> 100% Sách bản quyền từ NXB</li>
            <li className="flex items-center gap-3"><i className="fa-solid fa-check text-accent" /> Dịch vụ Custom sách độc quyền</li>
            <li className="flex items-center gap-3"><i className="fa-solid fa-check text-accent" /> Trạm đọc thử trải nghiệm 20%</li>
            <li className="flex items-center gap-3"><i className="fa-solid fa-check text-accent" /> Đóng gói quà tặng thẩm mỹ cao</li>
          </ul>
        </section>
      </div>

      <div className="text-center mt-12">
        <Link href="/products" className="inline-block bg-primary text-white font-bold px-10 py-4 rounded-xl hover:bg-secondary transition-colors shadow-lg">
          Khám phá cửa hàng ngay
        </Link>
      </div>
    </main>
  );
}