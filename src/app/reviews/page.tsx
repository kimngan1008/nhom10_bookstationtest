"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

function Stars({ count }: { count: number }) {
  return (
    <span className="text-accent text-lg">
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

export default function ReviewsPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    if (!user) { router.push("/auth/login"); return; }
    setReviews(JSON.parse(localStorage.getItem("bsReviews") || "[]"));
  }, [user, router]);

  if (!user) return null;

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-heading text-3xl text-primary font-bold mb-6">Đánh Giá Của Tôi</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <ProfileSidebar />

        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="font-heading text-xl text-primary font-bold mb-6 pb-4 border-b border-gray-100">
              Đánh Giá Của Tôi
            </h2>

            {reviews.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-regular fa-star text-3xl text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium text-lg">Chưa có đánh giá nào</p>
                <p className="text-gray-400 text-sm mt-2">Mua sách và để lại đánh giá của bạn</p>
                <a
                  href="/products"
                  className="inline-block mt-6 bg-primary text-white font-semibold py-3 px-8 rounded-xl hover:bg-secondary transition-colors text-sm"
                >
                  Mua sắm ngay
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-16 bg-primary rounded flex items-center justify-center shrink-0">
                        <i className="fa-solid fa-book text-accent text-sm" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-primary">{r.bookTitle || "Sách"}</h3>
                          <span className="text-xs text-gray-400">{r.date || ""}</span>
                        </div>
                        <Stars count={r.rating || 5} />
                        <p className="text-secondary text-sm mt-1">{r.comment || ""}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
