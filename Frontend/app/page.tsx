"use client"

import { useState } from "react"
import { Search, Filter, ShoppingCart, Menu, MapPin, Phone, Mail, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import Spline from "@splinetool/react-spline"
import AboutPage from "./about/page"
import ContactPage from "./contact/page"
import PrivacyPolicyPage from "./privacy/page"
import TermsOfServicePage from "./terms/page"
import { useAuth } from "@/contexts/auth-context"
import { Compass } from "lucide-react"
import AIChatbot from "@/components/ai-chatbot"
import VastuAssistant from "@/components/VastuAssistant"
import ThemeToggle from "@/components/theme-toggle"
import Image from "next/image"

export default function HomePage() {
  const { language, toggleLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state, addItem } = useCart()
  const {user,logout} =useAuth()

  const categories = [
    { name: t("cement"), icon: "🧱🏗️", count: "500+" },
    { name: t("paint"), icon: "🎨🪣", count: "300+" },
    { name: t("furniture"), icon: "🛋️🛏️", count: "200+" },
    { name: t("electrical"), icon: "⚡💡", count: "400+" },
    { name: t("plumbing"), icon: "🧰🔩", count: "250+" },
    { name: t("hardware"), icon: "🔌🪛", count: "600+" },
  ]

  const featuredProducts = [
    {
      id: 1,
      name: language === "en" ? "Premium Cement 50kg" : "प्रीमियम सीमेंट 50kg",
      brand: "UltraTech",
      category: t("cement"),
      price: 350,
      originalPrice: 400,
      rating: 4.5,
      image: "/cement-bag-construction.png",
      badge: language === "en" ? "Best Seller" : "बेस्ट सेलर",
    },
    {
      id: 2,
      name: language === "en" ? "Wall Paint 20L" : "वॉल पेंट 20L",
      brand: "Asian Paints",
      category: t("paint"),
      price: 2500,
      originalPrice: 3000,
      rating: 4.3,
      image: "/placeholder-xv4rx.png",
      badge: language === "en" ? "New Arrival" : "नया आगमन",
    },
    {
      id: 3,
      name: language === "en" ? "Steel TMT Bars" : "स्टील TMT बार",
      brand: "TATA Steel",
      category: t("steel"),
      price: 45000,
      originalPrice: 48000,
      rating: 4.7,
      image: "/placeholder-rwnwq.png",
      badge: language === "en" ? "Premium" : "प्रीमियम",
    },
    {
      id: 4,
      name: language === "en" ? "Ceramic Tiles" : "सिरेमिक टाइल्स",
      brand: "Kajaria",
      category: t("tiles"),
      price: 800,
      originalPrice: 950,
      rating: 4.4,
      image: "/ceramic-tiles-flooring.png",
      badge: language === "en" ? "Popular" : "लोकप्रिय",
    },
  ]

  const handleAddToCart = (product: any) => {
    if(!user){
      alert("Please login to add items to cart")
      window.location.href="/login"
      return
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      brand: product.brand,
      category: product.category,
    })
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
                <Image 
                src="/logo-png.png"
                alt="EasyConstruct Logo"
                width={40}
                height={40}
                className="rounded-full"/>
              <div>
                <h1 className="font-playfair font-bold text-xl text-foreground">EasyConstruct</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">{t("tagline")}</p>
              </div>
            </Link>

      {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder={t("search")} className="pl-10 pr-4" />
              </div>
            </div>

        {/* Navigation Icons */}
            <div className="flex items-center space-x-4">
            <Link href="/products">
            <Button variant="ghost" size="sm" className="hidden md:flex">
            <Filter className="h-4 w-4 mr-2" />
            {t("categories")}
            </Button>
            </Link>
            {/* <ThemeToggle/> */}
            <Button variant="ghost" size="sm" onClick={toggleLanguage}>
            <Globe className="h-4 w-4 mr-2" />
            {language === "en" ? "हिं" : "EN"}
            </Button>

            <Link href="/cart">
            <Button variant="ghost" size="sm" className="relative">
            <ShoppingCart className="h-4 w-4" />
            {state.itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
            {state.itemCount}
            </Badge>
            )}
            <span className="ml-2 hidden sm:inline">{t("cart")}</span>
            </Button>
            </Link>
  {/* 🔑 Login / Logout Button */}
            {user ? (
            <Button variant="ghost" size="sm" onClick={logout}>
            Logout
            </Button>
            ) : (
            <Link href="/login">
            <Button variant="ghost" size="sm">Login</Button>
            </Link>
            )}

  <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
    <Menu className="h-4 w-4" />
  </Button>
</div>

          </div>

     {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder={t("search")} className="pl-10 pr-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-card to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                {t("heroTitle")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t("heroSubtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  {t("shopNow")}
                </Button>
                <Button variant="outline" size="lg">
                  {t("exploreCategories")}
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/indian-construction-materials.png"
                alt="Construction materials"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Spline Viewer Section */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <Spline scene="https://prod.spline.design/4dJ4PXYPas5yIkm6/scene.splinecode" />
          </div>
          </section> */}

      {/* Popular Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="font-playfair font-bold text-3xl text-foreground mb-4">{t("popularCategories")}</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
                  <h4 className="font-semibold text-foreground mb-2">{category.name}</h4>
                  <p className="text-sm text-muted-foreground">{category.count} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h3 className="font-playfair font-bold text-3xl text-foreground">{t("featuredProducts")}</h3>
            <Link href="/products">
              <Button variant="outline">{t("viewAll")}</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-accent">{product.badge}</Badge>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h4>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-lg text-primary">₹{product.price.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        {t("addToCart")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-playfair font-bold text-3xl text-foreground mb-6">{t("aboutUs")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{t("aboutText")}</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-foreground">{t("phone")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-foreground">{t("email")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-foreground">{t("address")}</span>
                </div>
              </div>
            </div>
            <div>
              <img
                src="/indian-construction-workers.png"
                alt="About EasyConstruct"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                  <Image 
                    src="/logo-png.png" 
                    alt="EasyConstruct Logo" 
                    width={32} 
                    height={32} 
                    className="rounded-full"
                    />
                <span className="font-playfair font-bold text-xl text-foreground">EasyConstruct</span>
              </div>
              <p className="text-muted-foreground text-sm">{t("tagline")}</p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">{t("categories")}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {categories.slice(0, 4).map((category, index) => (
                  <li key={index} className="hover:text-primary cursor-pointer">
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">{t("quickLinks")}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/about" className="hover:text-primary cursor-pointer">
                    {t("aboutUsLink")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-primary cursor-pointer">
                      {t("contactLink")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-primary cursor-pointer">
                    {t("privacyPolicy")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-primary cursor-pointer">
                    {t("termsOfService")}
                    </Link>
                  </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">{t("contact")}</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>{t("phone")}</p>
                <p>{t("email")}</p>
                <p>{t("address")}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 EasyConstruct. {t("allRightsReserved")}</p>
          </div>
        </div>
      </footer>
      <AIChatbot/>
      <VastuAssistant/>
    </div>
  )
}
