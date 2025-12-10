import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const adaptations = await prisma.adaptation.findMany({
    include: {
      book: {
        include: {
          author: true,
        },
      },
    },
    orderBy: {
      releaseYear: "desc",
    },
  });

  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white">
<div className="flex justify-between items-center mb-8">
  <h1 className="text-3xl font-bold">Book-to-Screen Adaptations</h1>
  <a 
    href="/add" 
    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
  >
    + Add New
  </a>
</div>      
      {adaptations.length === 0 ? (
        <p className="text-gray-400">No adaptations yet.</p>
      ) : (
        <div className="grid gap-6">
          {adaptations.map((adaptation) => (
            <div
              key={adaptation.id}
              className="bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{adaptation.title}</h2>
                  <p className="text-gray-400">
                    Based on "{adaptation.book.title}" by {adaptation.book.author.name}
                  </p>
                </div>
                <span className="bg-blue-600 px-3 py-1 rounded text-sm">
                  {adaptation.type}
                </span>
              </div>
              
              <div className="mt-4 flex gap-6 text-sm text-gray-300">
                <span>📅 {adaptation.releaseYear}</span>
                <span>📺 {adaptation.platform}</span>
                {adaptation.imdbRating && (
                  <span>⭐ IMDb: {adaptation.imdbRating}</span>
                )}
                {adaptation.rtScore && (
                  <span>🍅 RT: {adaptation.rtScore}%</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}