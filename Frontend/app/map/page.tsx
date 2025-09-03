"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Phone, Clock, Star, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useLanguage } from "@/contexts/language-context"

// Mock data for shops and lands
const mockShops = [
  {
    id: 1,
    name: "Sharma Construction Materials",
    nameHi: "शर्मा निर्माण सामग्री",
    address: "Sector 15, Gurgaon, Haryana",
    addressHi: "सेक्टर 15, गुड़गांव, हरियाणा",
    phone: "+91 98765 43210",
    rating: 4.5,
    distance: "2.3 km",
    type: "shop",
    category: "General Materials",
    categoryHi: "सामान्य सामग्री",
    hours: "8:00 AM - 8:00 PM",
    hoursHi: "8:00 AM - 8:00 PM",
    lat: 28.4595,
    lng: 77.0266,
    image: "/construction-materials-shop.png",
  },
  {
    id: 2,
    name: "Delhi Cement Depot",
    nameHi: "दिल्ली सीमेंट डिपो",
    address: "Karol Bagh, New Delhi",
    addressHi: "करोल बाग, नई दिल्ली",
    phone: "+91 98765 43211",
    rating: 4.2,
    distance: "5.1 km",
    type: "shop",
    category: "Cement & Steel",
    categoryHi: "सीमेंट और स्टील",
    hours: "7:00 AM - 9:00 PM",
    hoursHi: "7:00 AM - 9:00 PM",
    lat: 28.6519,
    lng: 77.1909,
    image: "/cement-depot-warehouse.png",
  },
  {
    id: 3,
    name: "Prime Land Solutions",
    nameHi: "प्राइम लैंड सॉल्यूशन्स",
    address: "Noida Extension, UP",
    addressHi: "नोएडा एक्सटेंशन, यूपी",
    phone: "+91 98765 43212",
    rating: 4.7,
    distance: "8.2 km",
    type: "land",
    category: "Residential Plot",
    categoryHi: "आवासीय प्लॉट",
    area: "1200 sq ft",
    areaHi: "1200 वर्ग फुट",
    price: "₹45,00,000",
    lat: 28.4744,
    lng: 77.4847,
    image: "/residential-land-plot.png",
  },
  {
    id: 4,
    name: "Steel & Iron Works",
    nameHi: "स्टील और आयरन वर्क्स",
    address: "Industrial Area, Faridabad",
    addressHi: "औद्योगिक क्षेत्र, फरीदाबाद",
    phone: "+91 98765 43213",
    rating: 4.3,
    distance: "12.5 km",
    type: "shop",
    category: "Steel & Iron",
    categoryHi: "स्टील और आयरन",
    hours: "6:00 AM - 7:00 PM",
    hoursHi: "6:00 AM - 7:00 PM",
    lat: 28.4089,
    lng: 77.3178,
    image: "/steel-iron-construction.png",
  },
  {
    id: 5,
    name: "Commercial Land Hub",
    nameHi: "कमर्शियल लैंड हब",
    address: "Sohna Road, Gurgaon",
    addressHi: "सोहना रोड, गुड़गांव",
    phone: "+91 98765 43214",
    rating: 4.6,
    distance: "15.3 km",
    type: "land",
    category: "Commercial Plot",
    categoryHi: "व्यावसायिक प्लॉट",
    area: "2500 sq ft",
    areaHi: "2500 वर्ग फुट",
    price: "₹1,20,00,000",
    lat: 28.367,
    lng: 77.0244,
    image: "/commercial-land-plot.png",
  },
]

export default function MapPage() {
  const { language, translations } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [maxDistance, setMaxDistance] = useState([20])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filteredItems, setFilteredItems] = useState(mockShops)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const mapTranslations = {
    en: {
      title: "Find Shops & Lands",
      searchPlaceholder: "Search for shops, lands, or locations...",
      filters: "Filters",
      type: "Type",
      category: "Category",
      maxDistance: "Max Distance",
      allTypes: "All Types",
      shops: "Shops",
      lands: "Lands",
      allCategories: "All Categories",
      generalMaterials: "General Materials",
      cementSteel: "Cement & Steel",
      steelIron: "Steel & Iron",
      residentialPlot: "Residential Plot",
      commercialPlot: "Commercial Plot",
      km: "km",
      rating: "Rating",
      distance: "Distance",
      hours: "Hours",
      area: "Area",
      price: "Price",
      callNow: "Call Now",
      getDirections: "Get Directions",
      mapView: "Map View",
      results: "results found",
    },
    hi: {
      title: "दुकानें और भूमि खोजें",
      searchPlaceholder: "दुकानें, भूमि या स्थान खोजें...",
      filters: "फिल्टर",
      type: "प्रकार",
      category: "श्रेणी",
      maxDistance: "अधिकतम दूरी",
      allTypes: "सभी प्रकार",
      shops: "दुकानें",
      lands: "भूमि",
      allCategories: "सभी श्रेणियां",
      generalMaterials: "सामान्य सामग्री",
      cementSteel: "सीमेंट और स्टील",
      steelIron: "स्टील और आयरन",
      residentialPlot: "आवासीय प्लॉट",
      commercialPlot: "व्यावसायिक प्लॉट",
      km: "किमी",
      rating: "रेटिंग",
      distance: "दूरी",
      hours: "समय",
      area: "क्षेत्रफल",
      price: "मूल्य",
      callNow: "अभी कॉल करें",
      getDirections: "दिशा निर्देश",
      mapView: "मैप व्यू",
      results: "परिणाम मिले",
    },
  }

  const t = mapTranslations[language]

  useEffect(() => {
    let filtered = mockShops

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          (language === "en" ? item.name : item.nameHi || item.name)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (language === "en" ? item.address : item.addressHi || item.address)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((item) => item.type === selectedType)
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (item) => (language === "en" ? item.category : item.categoryHi || item.category) === selectedCategory,
      )
    }

    // Filter by distance
    filtered = filtered.filter((item) => Number.parseFloat(item.distance.replace(" km", "")) <= maxDistance[0])

    setFilteredItems(filtered)
  }, [searchQuery, selectedType, selectedCategory, maxDistance, language])

  const MapComponent = () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100"></div>
      <div className="relative z-10 text-center">
        <MapPin className="h-12 w-12 text-orange-600 mx-auto mb-2" />
        <p className="text-gray-600 font-medium">{t.mapView}</p>
        <p className="text-sm text-gray-500 mt-1">Interactive map coming soon</p>
      </div>

      {/* Mock map markers */}
      {filteredItems.slice(0, 5).map((item, index) => (
        <div
          key={item.id}
          className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-110 transition-transform ${
            item.type === "shop" ? "bg-orange-500" : "bg-green-500"
          }`}
          style={{
            left: `${20 + index * 15}%`,
            top: `${30 + index * 10}%`,
          }}
          onClick={() => setSelectedItem(item)}
        >
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <MapPin className="h-3 w-3 text-white" />
          </div>
        </div>
      ))}
    </div>
  )

  const ItemCard = ({ item }: { item: any }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedItem(item)}>
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img
          src={item.image || "/placeholder.svg"}
          alt={language === "en" ? item.name : item.nameHi || item.name}
          className="w-full h-full object-cover"
        />
        <Badge className={`absolute top-2 right-2 ${item.type === "shop" ? "bg-orange-500" : "bg-green-500"}`}>
          {item.type === "shop" ? t.shops.slice(0, -1) : t.lands.slice(0, -1)}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{language === "en" ? item.name : item.nameHi || item.name}</h3>
        <p className="text-gray-600 text-sm mb-2 flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {language === "en" ? item.address : item.addressHi || item.address}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{item.rating}</span>
          </div>
          <span className="text-sm text-gray-500">{item.distance}</span>
        </div>

        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">{t.category}:</span>{" "}
            {language === "en" ? item.category : item.categoryHi || item.category}
          </p>

          {item.type === "shop" ? (
            <p className="text-sm flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {language === "en" ? item.hours : item.hoursHi || item.hours}
            </p>
          ) : (
            <div className="space-y-1">
              <p className="text-sm">
                <span className="font-medium">{t.area}:</span>{" "}
                {language === "en" ? item.area : item.areaHi || item.area}
              </p>
              <p className="text-sm font-semibold text-orange-600">{item.price}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Button size="sm" className="flex-1">
            <Phone className="h-4 w-4 mr-1" />
            {t.callNow}
          </Button>
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            <MapPin className="h-4 w-4 mr-1" />
            {t.getDirections}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.title}</h1>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  {t.filters}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{t.filters}</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t.type}</label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.allTypes}</SelectItem>
                        <SelectItem value="shop">{t.shops}</SelectItem>
                        <SelectItem value="land">{t.lands}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">{t.category}</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.allCategories}</SelectItem>
                        <SelectItem value={t.generalMaterials}>{t.generalMaterials}</SelectItem>
                        <SelectItem value={t.cementSteel}>{t.cementSteel}</SelectItem>
                        <SelectItem value={t.steelIron}>{t.steelIron}</SelectItem>
                        <SelectItem value={t.residentialPlot}>{t.residentialPlot}</SelectItem>
                        <SelectItem value={t.commercialPlot}>{t.commercialPlot}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t.maxDistance}: {maxDistance[0]} {t.km}
                    </label>
                    <Slider
                      value={maxDistance}
                      onValueChange={setMaxDistance}
                      max={50}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            {filteredItems.length} {t.results}
          </p>
        </div>

        {/* Map Component */}
        <div className="mb-8">
          <MapComponent />
        </div>

        {/* Results Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No results found. Try adjusting your filters.</p>
          </div>
        )}
      </div>

      {/* Selected Item Modal/Sheet */}
      {selectedItem && (
        <Sheet open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>
                {language === "en" ? selectedItem.name : selectedItem.nameHi || selectedItem.name}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <img
                src={selectedItem.image || "/placeholder.svg"}
                alt={language === "en" ? selectedItem.name : selectedItem.nameHi || selectedItem.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {language === "en" ? selectedItem.address : selectedItem.addressHi || selectedItem.address}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{selectedItem.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">{selectedItem.distance}</span>
                </div>

                {selectedItem.type === "shop" ? (
                  <div>
                    <p className="text-sm flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {language === "en" ? selectedItem.hours : selectedItem.hoursHi || selectedItem.hours}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">{t.area}:</span>{" "}
                      {language === "en" ? selectedItem.area : selectedItem.areaHi || selectedItem.area}
                    </p>
                    <p className="text-lg font-semibold text-orange-600">{selectedItem.price}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    {t.callNow}
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <MapPin className="h-4 w-4 mr-2" />
                    {t.getDirections}
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
