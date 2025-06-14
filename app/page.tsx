import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section
        className="relative py-20 md:py-32 bg-cover bg-center bg-no-repeat min-h-[600px] flex items-center"
        style={{
          backgroundImage: "url('/images/1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-pink-100/30"></div>
        <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-6">Docinhos C&apos;Art Cake Design</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8">
            Bolos artesanais personalizados para tornar seus momentos especiais ainda mais doces e memoráveis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700">
              <Link href="/galeria">Ver Galeria</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-white/80"
            >
              <Link href="/contacto">Contactar</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-pink-600">Nossas Especialidades</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={`/galeria/${category.slug}`} className="group">
                <div className="relative rounded-full overflow-hidden aspect-square mb-4 border-4 border-pink-100 group-hover:border-pink-300 transition-all">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-center font-medium text-lg text-pink-600">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Angela Neto - Cake Designer"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-pink-600">Sobre Nós</h2>
              <p className="text-gray-700 mb-4">
                Docinhos C&apos;Art Cake Design é um atelier de cake design localizado em Vila Nova de Famalicão,
                especializado na criação de bolos artesanais personalizados para todas as ocasiões.
              </p>
              <p className="text-gray-700 mb-6">
                Fundado por Angela Neto, nosso atelier combina criatividade, paixão e técnica para criar verdadeiras
                obras de arte comestíveis que tornam seus momentos especiais inesquecíveis.
              </p>
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-pink-300 text-pink-600 hover:bg-pink-50"
                >
                  <a href="https://instagram.com/docinhoscart" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4" />
                    <span>Siga-nos no Instagram</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-pink-600">Encomende o Seu Bolo</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Transforme a sua celebração com um bolo personalizado e delicioso. Entre em contacto connosco para discutir
            o design perfeito para a sua ocasião especial.
          </p>
          <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700">
            <Link href="/contacto">Fazer Encomenda</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

const categories = [
  {
    name: "Cupcakes",
    slug: "cupcakes",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Destaques",
    slug: "destaques",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Borboletas",
    slug: "borboletas",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Anos 80",
    slug: "anos-80",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Plumas",
    slug: "plumas",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Bolos de Casamento",
    slug: "casamento",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Bolos Infantis",
    slug: "infantis",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Bolos Temáticos",
    slug: "tematicos",
    image: "/placeholder.svg?height=300&width=300",
  },
]
