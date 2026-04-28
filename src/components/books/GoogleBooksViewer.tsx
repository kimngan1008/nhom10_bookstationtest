"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google?: {
      books: {
        load: () => void;
        setOnLoadCallback: (cb: () => void) => void;
        DefaultViewer: new (el: HTMLElement) => {
          load: (id: string, notFoundCb?: () => void) => void;
        };
      };
    };
    _googleBooksScriptLoaded?: boolean;
  }
}

interface Props {
  googleBookId: string;
  onNotAvailable?: () => void;
}

export default function GoogleBooksViewer({ googleBookId, onNotAvailable }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function initViewer() {
      if (!containerRef.current || !window.google?.books) return;
      const viewer = new window.google.books.DefaultViewer(containerRef.current);
      viewer.load(googleBookId, () => {
        // Book không có preview trên Google Books
        setLoading(false);
        onNotAvailable?.();
      });
      setLoading(false);
    }

    if (window._googleBooksScriptLoaded && window.google?.books) {
      window.google.books.setOnLoadCallback(initViewer);
      window.google.books.load();
    } else {
      const script = document.createElement("script");
      script.src = "https://www.google.com/books/jsapi.js";
      script.async = true;
      script.onload = () => {
        window._googleBooksScriptLoaded = true;
        window.google!.books.setOnLoadCallback(initViewer);
        window.google!.books.load();
      };
      document.head.appendChild(script);
    }
  }, [googleBookId, onNotAvailable]);

  return (
    <div className="relative w-full" style={{ minHeight: 520 }}>
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-50 rounded-xl">
          <i className="fa-solid fa-spinner fa-spin text-2xl text-primary"></i>
          <p className="text-sm text-secondary">Đang tải trang sách...</p>
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full rounded-xl overflow-hidden"
        style={{ height: 520 }}
      />
    </div>
  );
}
