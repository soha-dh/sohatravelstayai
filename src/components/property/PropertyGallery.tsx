import { useState } from 'react'
import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react'
import PhotoViewer from './PhotoViewer'

type PropertyGalleryProps = {
  name: string
  images: string[]
}

function PropertyGallery({ name, images }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const total = images.length
  const extraCount = Math.max(total - 5, 0)
  const hasMoreTile = extraCount > 0

  function showPrevious() {
    setCurrentIndex((value) => (value === 0 ? total - 1 : value - 1))
  }

  function showNext() {
    setCurrentIndex((value) => (value === total - 1 ? 0 : value + 1))
  }

  function GalleryControls() {
    return (
      <>
        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-950/70 px-3 py-1 text-xs text-white">
          {currentIndex + 1} / {total}
        </p>
        <button
          type="button"
          className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-800"
          aria-label="Previous photo"
          onClick={showPrevious}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-800"
          aria-label="Next photo"
          onClick={showNext}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </>
    )
  }

  return (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:hidden">
        <img
          src={images[currentIndex]}
          alt={`${name} photo ${currentIndex + 1}`}
          className="h-full w-full object-cover"
        />
        <GalleryControls />
      </div>

      <div className="hidden aspect-[2.75/1] grid-cols-2 gap-1 overflow-hidden rounded-2xl lg:grid">
        <div className="relative min-h-0 overflow-hidden rounded-xl">
          <img
            src={images[currentIndex]}
            alt={`${name} photo ${currentIndex + 1}`}
            className="h-full w-full object-cover"
          />
          <GalleryControls />
        </div>

        <div className="grid min-h-0 grid-cols-4 grid-rows-2 gap-1">
          <button
            type="button"
            className="relative col-span-2 min-h-0 overflow-hidden rounded-lg"
            onClick={() => setCurrentIndex(1)}
          >
            <img src={images[1]} alt="" className="h-full w-full object-cover" />
          </button>
          <button
            type="button"
            className="relative col-span-2 min-h-0 overflow-hidden rounded-lg"
            onClick={() => setCurrentIndex(2)}
          >
            <img src={images[2]} alt="" className="h-full w-full object-cover" />
          </button>
          <button
            type="button"
            className={`relative min-h-0 overflow-hidden rounded-lg ${
              hasMoreTile ? 'col-span-2' : 'col-span-2'
            }`}
            onClick={() => setCurrentIndex(3)}
          >
            <img src={images[3]} alt="" className="h-full w-full object-cover" />
          </button>
          <button
            type="button"
            className={`relative min-h-0 overflow-hidden rounded-lg ${
              hasMoreTile ? 'col-span-1' : 'col-span-2'
            }`}
            onClick={() => setCurrentIndex(4)}
          >
            <img src={images[4]} alt="" className="h-full w-full object-cover" />
          </button>
          {hasMoreTile ? (
            <button
              type="button"
              className="relative col-span-1 min-h-0 overflow-hidden rounded-lg"
              onClick={() => setIsOpen(true)}
            >
              <img src={images[4]} alt="" className="h-full w-full object-cover" />
              <span className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/45 text-white">
                <span className="text-xl font-semibold">+{extraCount}</span>
                <span className="text-xs">Photos</span>
              </span>
            </button>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 lg:w-auto"
        onClick={() => setIsOpen(true)}
      >
        <Images className="h-4 w-4" />
        View all photos ({total})
      </button>

      {isOpen ? (
  <div className="fixed inset-0 z-[80] overflow-y-auto bg-slate-950/90 p-4">
    <div className="mx-auto flex max-w-5xl items-center justify-between py-4 text-white">
      <p className="text-sm">
        {name} · {total} photos
      </p>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"
        aria-label="Close gallery"
        onClick={() => setIsOpen(false)}
      >
        <X className="h-5 w-5" />
      </button>
    </div>
    <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2">
      {images.map((image, index) => (
        <button
          key={`${image}-${index}`}
          type="button"
          onClick={() => setViewerIndex(index)}
        >
          <img
            src={image}
            alt={`${name} photo ${index + 1}`}
            className="h-56 w-full rounded-xl object-cover"
          />
        </button>
      ))}
    </div>
  </div>
) : null}

{viewerIndex !== null ? (
  <PhotoViewer
    name={name}
    images={images}
    startIndex={viewerIndex}
    onClose={() => setViewerIndex(null)}
    onIndexChange={setCurrentIndex}
  />
) : null}
    </>
  )
}

export default PropertyGallery