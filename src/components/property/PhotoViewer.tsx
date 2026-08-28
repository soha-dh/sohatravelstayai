import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type PhotoViewerProps = {
  name: string
  images: string[]
  startIndex: number
  onClose: () => void
  onIndexChange: (index: number) => void
}

function PhotoViewer({
  name,
  images,
  startIndex,
  onClose,
  onIndexChange,
}: PhotoViewerProps) {
  const [index, setIndex] = useState(startIndex)
  const total = images.length

  function goTo(nextIndex: number) {
    const safeIndex = (nextIndex + total) % total
    setIndex(safeIndex)
    onIndexChange(safeIndex)
  }

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') goTo(index - 1)
      if (event.key === 'ArrowRight') goTo(index + 1)
    }

    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [index, onClose])

  return (
    <div className="fixed inset-0 z-[90] flex flex-col bg-slate-950">
      <div className="flex items-center justify-between px-4 py-4 text-white">
        <p className="text-sm">
          {name} · {index + 1} / {total}
        </p>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"
          aria-label="Close photo"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6">
        <button
          type="button"
          className="absolute left-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-800"
          aria-label="Previous photo"
          onClick={() => goTo(index - 1)}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <img
          src={images[index]}
          alt={`${name} photo ${index + 1}`}
          className="max-h-full max-w-full rounded-xl object-contain"
        />

        <button
          type="button"
          className="absolute right-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-800"
          aria-label="Next photo"
          onClick={() => goTo(index + 1)}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

export default PhotoViewer