"use client";

import { use, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Book } from "@/lib/booksData";
import { fetchBookBySlug } from "@/lib/supabaseBooks";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { searchGoogleBookId } from "@/lib/googleBooks";
import GoogleBooksViewer from "@/components/books/GoogleBooksViewer";

export default function BookPreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [book, setBook] = useState<Book | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();
  const addItem = useCartStore((s: any) => s.addItem);

  const [toast, setToast] = useState(false);
  const [googleBookId, setGoogleBookId] = useState<string | null>(null);
  const [viewerNotAvailable, setViewerNotAvailable] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchBookBySlug(slug).then((b) => { setBook(b); setPageLoading(false); });
  }, [slug]);

  // Tự động tìm Google Book ID nếu chưa có
  useEffect(() => {
    if (!book) return;
    if (book.googleBookId) { setGoogleBookId(book.googleBookId); return; }
    setSearching(true);
    searchGoogleBookId(book.title, book.author).then((id) => {
      setGoogleBookId(id);
      setSearching(false);
    });
  }, [book]);

  const handleNotAvailable = useCallback(() => {
    setViewerNotAvailable(true);
  }, []);

  if (pageLoading) {
    return <div className="flex justify-center items-center py-32"><i className="fa-solid fa-spinner fa-spin text-3xl text-primary"></i></div>;
  }

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="font-heading text-2xl text-primary font-bold mb-4">Không tìm thấy sách</h2>
        <Link href="/products" className="bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-secondary transition-colors">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  function handleAddToCart() {
    addItem({ id: book!.slug, title: book!.title, author: book!.author, price: book!.price, image: book!.image, qty: 1 });
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  function buyNow() {
    addItem({ id: book!.slug, title: book!.title, author: book!.author, price: book!.price, image: book!.image, qty: 1 });
    router.push("/cart");
  }

  const showGoogleViewer = googleBookId && !viewerNotAvailable;
  const showTextPreview = !searching && (!googleBookId || viewerNotAvailable);
  const rawPreviewText = (book as any).previewText || book.description;
  const previewParagraphs = rawPreviewText.split("\n").filter((p: string) => p.trim() !== "");

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* Header bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 mb-6 flex items-center justify-between">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors">
          <i className="fa-solid fa-arrow-left text-xs"></i> Trở về
        </button>
        <div className="flex flex-col items-center">
          <h2 className="font-heading font-bold text-primary text-base md:text-lg line-clamp-1">{book.title}</h2>
          <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-3 py-0.5 rounded-full mt-1 uppercase tracking-wide">BẢN DÙNG THỬ</span>
        </div>
        <div className="w-16"></div>
      </div>

      {/* Trạng thái đang tìm kiếm */}
      {searching && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 flex flex-col items-center gap-3 mb-6">
          <i className="fa-solid fa-book-open fa-bounce text-2xl text-primary"></i>
          <p className="text-sm text-secondary">Đang tìm bản xem thử trên Google Books...</p>
        </div>
      )}

      {/* Google Books Embedded Viewer */}
      {showGoogleViewer && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="bg-linear-to-r from-primary to-secondary px-7 py-4 text-white flex items-center gap-3">
            <i className="fa-brands fa-google text-lg"></i>
            <div>
              <p className="text-xs text-white/60 uppercase tracking-widest">Google Books Preview</p>
              <h3 className="font-heading text-lg font-bold">{book.title}</h3>
            </div>
          </div>
          <div className="p-4">
            <GoogleBooksViewer
              googleBookId={googleBookId!}
              onNotAvailable={handleNotAvailable}
            />
          </div>
        </div>
      )}

      {/* Text preview fallback */}
      {showTextPreview && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative mb-6">
          <div className="bg-linear-to-r from-primary to-secondary px-7 py-5 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">Chương 1</p>
            <h3 className="font-heading text-xl font-bold">Trích đoạn mở đầu</h3>
          </div>
          <div className="px-6 md:px-10 py-8 relative">
            <div className="font-serif leading-[1.95] text-[1.05rem] text-[#2d2d2d]">
              {previewParagraphs.map((p: string, idx: number) => (
                <p key={idx} className="mb-[1.2em] indent-8">{p}</p>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-30 bg-linear-to-t from-white to-transparent pointer-events-none"></div>
          </div>
        </div>
      )}

      {/* End of preview / CTA */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 md:px-10 py-8 text-center mb-4">
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-lock text-accent text-xl"></i>
        </div>
        <h3 className="font-heading text-xl font-bold text-primary mb-2">Bạn đã đọc hết phần trích đoạn</h3>
        <p className="text-sm text-secondary max-w-xs mx-auto mb-6 leading-relaxed">
          Để tiếp tục theo dõi và ủng hộ bản quyền tác giả, hãy sở hữu ngay cuốn sách này nhé!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
          <button onClick={buyNow} className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-secondary transition-colors shadow-md flex items-center justify-center gap-2">
            <i className="fa-solid fa-bolt"></i>
            <span>Mua sách <span className="hidden sm:inline">giá {formatPrice(book.price)}</span></span>
          </button>
          <Link href={`/products/${slug}`} className="flex-1 border-2 border-primary text-primary font-semibold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
            <i className="fa-solid fa-circle-info text-sm"></i> Xem thông tin
          </Link>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 mb-4">
        <div className="flex-1 bg-gray-100 rounded-full h-2">
          <div className="bg-primary rounded-full h-2" style={{ width: "15%" }}></div>
        </div>
        <span className="text-xs text-gray-400 font-medium shrink-0">~15% nội dung</span>
      </div>

      {/* Add to cart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-primary text-sm">Muốn đọc sau?</p>
          <p className="text-xs text-secondary mt-0.5">Thêm vào giỏ hàng để không quên nhé!</p>
        </div>
        <button onClick={handleAddToCart} className="bg-accent text-primary font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-accent/80 transition-colors flex items-center gap-2 shrink-0">
          <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-primary text-white text-sm font-medium px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50">
          <i className="fa-solid fa-check-circle text-accent" /> Đã thêm vào giỏ hàng!
        </div>
      )}
    </main>
  );
}
