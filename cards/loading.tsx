export default function CardsLoading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        <p className="text-lg text-gray-600">Loading insurance cards...</p>
      </div>
    </div>
  )
}
