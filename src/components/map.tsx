"use client";

interface FreeMapCardProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  placeName?: string;
  placeId?: string; // thêm prop này nếu có
}

export default function FreeMapCard({
  lat = 10.0299337,
  lng = 105.7706153,
  zoom = 16,
  placeName = "Đại học Cần Thơ",
  placeId, // nếu có thì ưu tiên dùng
}: FreeMapCardProps) {
  // Ưu tiên Place ID → tên địa điểm → tọa độ
  const query = placeId ? `place_id:${placeId}` : encodeURIComponent(placeName);

  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${query}&zoom=${zoom}&maptype=roadmap`;

  const getDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="relative h-full w-full rounded-xl overflow-hidden">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bản đồ"
        />

        <button
          onClick={getDirections}
          className="absolute bottom-5 right-2 z-10 bg-[linear-gradient(135deg,#39a9e8,color-mix(in_srgb,#39a9e8,#021b2c_62%))] text-white font-medium px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transition"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
          </svg>
          Chỉ đường
        </button>
      </div>
    </>
  );
}
