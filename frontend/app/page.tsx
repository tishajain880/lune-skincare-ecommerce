import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-balance">Skincare Reimagined</h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Discover our curated collection of premium skincare products designed for the modern beauty enthusiast.
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              Shop Now
            </Link>
          </div>
          <div className="bg-muted h-96 rounded-lg flex items-center justify-center">
            <Image
              src="/luxury-skincare.png"
              alt="Skincare products"
              width={400}
              height={400}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-light mb-12 text-balance">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Serums", "Moisturizers", "Cleansers"].map((category) => (
            <Link key={category} href={`/products?category=${category.toLowerCase()}`} className="group">
              <div className="bg-muted h-64 rounded-lg mb-4 overflow-hidden">
                <Image
                  src={`/.jpg?height=300&width=400&query=${category} skincare`}
                  alt={category}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="text-lg font-medium group-hover:text-muted-foreground transition-colors">{category}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
