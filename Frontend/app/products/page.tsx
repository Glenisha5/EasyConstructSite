"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Grid, List, Star, ShoppingCart, CuboidIcon as Cube, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import ARVRPreview from "@/components/ar-vr-preview"
import Image from "next/image"

export default function ProductsPage() {
  const { language, toggleLanguage, t } = useLanguage()
  const { state, addItem } = useCart()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [sortBy, setSortBy] = useState("popularity")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [arvrPreview, setArvrPreview] = useState<{ product: any; mode: "ar" | "vr" } | null>(null)

  const allProducts = [
    {
      id: 1,
      name: language === "en" ? "Premium Cement 50kg" : "प्रीमियम सीमेंट 50kg",
      category: t("cement"),
      brand: "UltraTech",
      price: 350,
      originalPrice: 400,
      rating: 4.5,
      reviews: 234,
      image: "/cement-bag-construction.png",
      badge: language === "en" ? "Best Seller" : "बेस्ट सेलर",
      description:
        language === "en"
          ? "High-quality cement for all construction needs"
          : "सभी निर्माण आवश्यकताओं के लिए उच्च गुणवत्ता वाला सीमेंट",
    },
    {
      id: 2,
      name: language === "en" ? "Wall Paint 20L White" : "वॉल पेंट 20L सफेद",
      category: t("paint"),
      brand: "Asian Paints",
      price: 2500,
      originalPrice: 3000,
      rating: 4.3,
      reviews: 156,
      image: "/white-paint-bucket.png",
      badge: language === "en" ? "New Arrival" : "नया आगमन",
      description:
        language === "en"
          ? "Premium interior wall paint with excellent coverage"
          : "उत्कृष्ट कवरेज के साथ प्रीमियम इंटीरियर वॉल पेंट",
    },
    {
      id: 3,
      name: language === "en" ? "Steel TMT Bars 12mm" : "स्टील TMT बार 12mm",
      category: t("steel"),
      brand: "TATA Steel",
      price: 45000,
      originalPrice: 48000,
      rating: 4.7,
      reviews: 89,
      image: "/steeltmt.webp",
      badge: language === "en" ? "Premium" : "प्रीमियम",
      description:
        language === "en"
          ? "High-strength TMT bars for structural construction"
          : "संरचनात्मक निर्माण के लिए उच्च शक्ति TMT बार",
    },
    {
      id: 4,
      name: language === "en" ? "Ceramic Floor Tiles" : "सिरेमिक फ्लोर टाइल्स",
      category: t("tiles"),
      brand: "Kajaria",
      price: 800,
      originalPrice: 950,
      rating: 4.4,
      reviews: 178,
      image: "/ceramic-tiles-flooring.png",
      badge: language === "en" ? "Popular" : "लोकप्रिय",
      description:
        language === "en"
          ? "Durable ceramic tiles for flooring applications"
          : "फ्लोरिंग अनुप्रयोगों के लिए टिकाऊ सिरेमिक टाइल्स",
    },
    {
      id: 5,
      name: language === "en" ? "PVC Electrical Wire 2.5mm" : "PVC इलेक्ट्रिकल वायर 2.5mm",
      category: t("electrical"),
      brand: "Havells",
      price: 1200,
      originalPrice: 1400,
      rating: 4.2,
      reviews: 267,
      image: "/electrical-wire-coil.png",
      badge: language === "en" ? "Certified" : "प्रमाणित",
      description:
        language === "en"
          ? "ISI certified electrical wire for home wiring"
          : "घरेलू वायरिंग के लिए ISI प्रमाणित इलेक्ट्रिकल वायर",
    },
    {
      id: 6,
      name: language === "en" ? "PVC Pipe 4 inch" : "PVC पाइप 4 इंच",
      category: t("plumbing"),
      brand: "Supreme",
      price: 450,
      originalPrice: 500,
      rating: 4.6,
      reviews: 145,
      image: "/placeholder-fi896.png",
      badge: language === "en" ? "Quality" : "गुणवत्ता",
      description:
        language === "en" ? "High-quality PVC pipes for plumbing systems" : "प्लंबिंग सिस्टम के लिए उच्च गुणवत्ता वाले PVC पाइप",
    },
    {
      id: 7,
      name: language === "en" ? "Wooden Door Frame" : "लकड़ी का दरवाजा फ्रेम",
      category: t("furniture"),
      brand: "Greenply",
      price: 8500,
      originalPrice: 9500,
      rating: 4.1,
      reviews: 92,
      image: "/wooden-door-frame.png",
      badge: language === "en" ? "Eco-Friendly" : "पर्यावरण अनुकूल",
      description:
        language === "en" ? "Premium teak wood door frame with polish" : "पॉलिश के साथ प्रीमियम सागौन लकड़ी का दरवाजा फ्रेम",
    },
    {
      id: 8,
      name: language === "en" ? "Bathroom Fittings Set" : "बाथरूम फिटिंग सेट",
      category: t("plumbing"),
      brand: "Jaquar",
      price: 15000,
      originalPrice: 18000,
      rating: 4.8,
      reviews: 203,
      image: "/bathroom-fittings-set.png",
      badge: language === "en" ? "Luxury" : "लक्जरी",
      description:
        language === "en" ? "Complete bathroom fittings with modern design" : "आधुनिक डिज़ाइन के साथ पूर्ण बाथरूम फिटिंग",
    },
  ]

  const categories = [
    { name: t("cement"), count: 45 },
    { name: t("paint"), count: 32 },
    { name: t("steel"), count: 28 },
    { name: t("tiles"), count: 67 },
    { name: t("electrical"), count: 89 },
    { name: t("plumbing"), count: 54 },
    { name: t("furniture"), count: 23 },
  ]

  const brands = [
    { name: "UltraTech", count: 12 },
    { name: "Asian Paints", count: 8 },
    { name: "TATA Steel", count: 15 },
    { name: "Kajaria", count: 22 },
    { name: "Havells", count: 18 },
    { name: "Supreme", count: 14 },
    { name: "Greenply", count: 9 },
    { name: "Jaquar", count: 11 },
  ]

  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice
    })

    switch (sortBy) {
      case "priceLowToHigh":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "priceHighToLow":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default: // popularity
        filtered.sort((a, b) => b.reviews - a.reviews)
    }

    return filtered
  }, [searchQuery, selectedCategories, selectedBrands, priceRange, sortBy])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 100000])
    setSearchQuery("")
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-foreground mb-3">{t("categories")}</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center space-x-2">
              <Checkbox
                id={category.name}
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={() => toggleCategory(category.name)}
              />
              <label htmlFor={category.name} className="text-sm text-muted-foreground cursor-pointer flex-1">
                {category.name} ({category.count})
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">{t("brands")}</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand.name} className="flex items-center space-x-2">
              <Checkbox
                id={brand.name}
                checked={selectedBrands.includes(brand.name)}
                onCheckedChange={() => toggleBrand(brand.name)}
              />
              <label htmlFor={brand.name} className="text-sm text-muted-foreground cursor-pointer flex-1">
                {brand.name} ({brand.count})
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">{t("priceRange")}</h3>
        <div className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={100000} min={0} step={500} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
        {t("clearFilters")}
      </Button>
    </div>
  )

  const handleAddToCart = (product: any) => {
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

  const handleARPreview = (product: any) => {
    setArvrPreview({ product, mode: "ar" })
  }

  const handleVRPreview = (product: any) => {
    setArvrPreview({ product, mode: "vr" })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/logo-png.png" 
                alt="EasyConstruct Logo" 
                width={32} 
                height={32} 
                className="rounded-full"
                />
              <span className="font-playfair font-bold text-xl text-foreground">EasyConstruct</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={toggleLanguage}>
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
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={t("search")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden bg-transparent">
                      <Filter className="h-4 w-4 mr-2" />
                      {t("filters")}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>{t("filters")}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-muted-foreground">
                  {filteredProducts.length} {t("results")}
                </p>

                <div className="flex items-center gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">{t("popularity")}</SelectItem>
                      <SelectItem value="priceLowToHigh">{t("priceLowToHigh")}</SelectItem>
                      <SelectItem value="priceHighToLow">{t("priceHighToLow")}</SelectItem>
                      <SelectItem value="rating">{t("rating")}</SelectItem>
                      <SelectItem value="newest">{t("newest")}</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border border-border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow group">
                  <CardContent className={viewMode === "grid" ? "p-0" : "p-4"}>
                    {viewMode === "grid" ? (
                      <>
                        <div className="relative">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <Badge className="absolute top-2 left-2 bg-accent">{product.badge}</Badge>
                          <div className="absolute top-2 right-2 flex gap-1">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                              onClick={() => handleARPreview(product)}
                              title="AR Preview"
                            >
                              <Cube className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                              onClick={() => handleVRPreview(product)}
                              title="VR Preview"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-bold text-lg text-primary">₹{product.price.toLocaleString()}</span>
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-muted-foreground">
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 bg-transparent"
                                onClick={() => handleARPreview(product)}
                              >
                                <Cube className="h-4 w-4 mr-1" />
                                AR
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 bg-transparent"
                                onClick={() => handleVRPreview(product)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                VR
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleAddToCart(product)}
                              className="w-full bg-primary hover:bg-primary/90"
                            >
                              {t("addToCart")}
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex gap-4">
                        <div className="relative w-32 h-32 shrink-0">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <Badge className="absolute top-1 left-1 text-xs bg-accent">{product.badge}</Badge>
                        </div>
                        <div className="flex-1 space-y-2">
                          <h4 className="font-semibold text-foreground">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.brand}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg text-primary">₹{product.price.toLocaleString()}</span>
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-muted-foreground">
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-transparent"
                              onClick={() => handleARPreview(product)}
                            >
                              <Cube className="h-4 w-4 mr-1" />
                              AR
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-transparent"
                              onClick={() => handleVRPreview(product)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              VR
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleAddToCart(product)}
                              className="bg-primary hover:bg-primary/90"
                            >
                              {t("addToCart")}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  {language === "en"
                    ? "No products found matching your criteria"
                    : "आपके मानदंडों से मेल खाने वाले कोई उत्पाद नहीं मिले"}
                </p>
                <Button onClick={clearFilters}>{t("clearFilters")}</Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {arvrPreview && (
        <ARVRPreview
          product={arvrPreview.product}
          mode={arvrPreview.mode}
          isOpen={!!arvrPreview}
          onClose={() => setArvrPreview(null)}
        />
      )}
    </div>
  )
}
