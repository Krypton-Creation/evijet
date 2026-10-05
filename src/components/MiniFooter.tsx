import { Link } from 'react-router-dom'

export default function MiniFooter() {
  return (
    <footer className="max-w-5xl mx-auto px-4 py-8 text-center text-wt-gray-text text-sm">
      <p>
        Evijet Academy &middot; In partnership with Weltrade &middot; Golden Top Hotel, 16 Abakaliki Crescent, Okpara Avenue GRA, Enugu &middot; &copy; 2026 Evijet Academy 
      </p>
      <p className="mt-2 text-[13px]">
        <Link to="#" className="text-wt-gray-text hover:underline">
          Privacy
        </Link>
        <span className="mx-2">&middot;</span>
        <Link to="#" className="text-wt-gray-text hover:underline">
          Terms
        </Link>
      </p>
    </footer>
  )
}
