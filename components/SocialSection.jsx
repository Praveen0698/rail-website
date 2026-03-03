export default function SocialSection() {
  return (
    <div className="max-w-[1300px] mx-auto mt-10 grid md:grid-cols-2 gap-6">
      <div className="bg-white shadow p-6">
        <h3 className="font-bold mb-4">Facebook Feed</h3>
        <div className="h-48 bg-gray-200"></div>
      </div>
      <div className="bg-white shadow p-6">
        <h3 className="font-bold mb-4">Tweets by RailMinIndia</h3>
        <div className="h-48 bg-gray-200"></div>
      </div>
    </div>
  );
}