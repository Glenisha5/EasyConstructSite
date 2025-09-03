"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi" | "kn"
export const nextLangLabel:Record<"en" | "hi" |"kn" ,string>={
  en:"हिं",
  hi:"ಕನ್ನಡ",
  kn:"EN",
}
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation & Common
    tagline: "Your One Stop-Shop for construction materials",
    search: "Search for construction materials...",
    categories: "Categories",
    cart: "Cart",
    menu: "Menu",
    continueShopping: "Continue Shopping",
    backToCart: "Back to Cart",

    // Homepage
    heroTitle: "We Follow 3C's: Check,Compare and Conclude",
    heroSubtitle:
      "From cement to furniture, we have everything you need for your construction project",
    shopNow: "Shop Now",
    exploreCategories: "Explore Categories",
    popularCategories: "Popular Categories",
    featuredProducts: "Featured Products",
    addToCart: "Add to Cart",
    viewAll: "View All",
    aboutUs: "About EasyConstruct",
    aboutText:
      "India's most trusted construction materials marketplace, serving contractors and homeowners with quality products and reliable service.",
    contact: "Contact Us",
    phone: "+91 9874561230",
    email: "support@easyconstruct.com",
    address: "Mangaluru, Karnataka, India",

    // Products
    products: "Products",
    filters: "Filters",
    brands: "Brands",
    priceRange: "Price Range",
    sortBy: "Sort By",
    popularity: "Popularity",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    rating: "Rating",
    newest: "Newest",
    results: "results found",
    clearFilters: "Clear Filters",
    applyFilters: "Apply Filters",
    gridView: "Grid View",
    listView: "List View",

    // Cart
    emptyCart: "Your cart is empty",
    emptyCartMessage: "Add some construction materials to get started",
    quantity: "Quantity",
    remove: "Remove",
    subtotal: "Subtotal",
    shipping: "Shipping",
    tax: "Tax (18% GST)",
    total: "Total",
    proceedToCheckout: "Proceed to Checkout",
    clearCart: "Clear Cart",
    free: "Free",
    items: "items",
    item: "item",

    // Checkout
    checkout: "Checkout",
    shippingInfo: "Shipping Information",
    firstName: "First Name",
    lastName: "Last Name",
    emailLabel: "Email Address",
    phoneLabel: "Phone Number",
    addressLabel: "Street Address",
    city: "City",
    state: "State",
    pincode: "PIN Code",
    paymentMethod: "Payment Method",
    cod: "Cash on Delivery",
    card: "Credit/Debit Card",
    upi: "UPI Payment",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    cardName: "Name on Card",
    orderSummary: "Order Summary",
    placeOrder: "Place Order",
    processing: "Processing...",
    required: "Required",
    secureCheckout: "Secure Checkout",

    // Order Confirmation
    orderConfirmed: "Order Confirmed!",
    thankYou: "Thank you for your order",
    orderMessage:
      "Your order has been successfully placed and is being processed.",
    orderNumber: "Order Number",
    estimatedDelivery: "Estimated Delivery",
    trackOrder: "Track Your Order",
    orderStatus: "Order Status",
    confirmed: "Confirmed",
    processingOrder: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    contactSupport: "Need help? Contact our support team",
    days: "business days",

    // Categories
    cement: "Cement",
    paint: "Paint",
    furniture: "Furniture",
    electrical: "Electrical",
    plumbing: "Plumbing",
    hardware: "Hardware",
    steel: "Steel",
    tiles: "Tiles",

    // Footer
    quickLinks: "Quick Links",
    aboutUsLink: "About Us",
    contactLink: "Contact",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    allRightsReserved: "All rights reserved.",
  },
  hi: {
    // Navigation & Common
    tagline: "निर्माण सामग्री के लिए आपकी एक स्टॉप शॉप",
    search: "निर्माण सामग्री खोजें...",
    categories: "श्रेणियां",
    cart: "कार्ट",
    menu: "मेनू",
    continueShopping: "खरीदारी जारी रखें",
    backToCart: "कार्ट पर वापस जाएं",

    // Homepage
    heroTitle: "हम 3सी का पालन करते हैं: जाँच, तुलना और निष्कर्ष",
    heroSubtitle:
      "सीमेंट से लेकर फर्नीचर तक, आपके निर्माण प्रोजेक्ट के लिए हमारे पास सब कुछ है",
    shopNow: "अभी खरीदें",
    exploreCategories: "श्रेणियां देखें",
    popularCategories: "लोकप्रिय श्रेणियां",
    featuredProducts: "विशेष उत्पाद",
    addToCart: "कार्ट में डालें",
    viewAll: "सभी देखें",
    aboutUs: "EasyConstruct के बारे में",
    aboutText:
      "भारत का सबसे भरोसेमंद निर्माण सामग्री बाज़ार, ठेकेदारों और घर के मालिकों को गुणवत्तापूर्ण उत्पाद और विश्वसनीय सेवा प्रदान करता है।",
    contact: "संपर्क करें",
    phone: "+91 98765 43210",
    email: "support@easyconstruct.com",
    address: "मंगलौर,कर्नाटक, भारत",

    // Products
    products: "उत्पाद",
    filters: "फिल्टर",
    brands: "ब्रांड",
    priceRange: "मूल्य सीमा",
    sortBy: "क्रमबद्ध करें",
    popularity: "लोकप्रियता",
    priceLowToHigh: "मूल्य: कम से अधिक",
    priceHighToLow: "मूल्य: अधिक से कम",
    rating: "रेटिंग",
    newest: "नवीनतम",
    results: "परिणाम मिले",
    clearFilters: "फिल्टर साफ़ करें",
    applyFilters: "फिल्टर लागू करें",
    gridView: "ग्रिड व्यू",
    listView: "लिस्ट व्यू",

    // Cart
    emptyCart: "आपका कार्ट खाली है",
    emptyCartMessage: "शुरू करने के लिए कुछ निर्माण सामग्री जोड़ें",
    quantity: "मात्रा",
    remove: "हटाएं",
    subtotal: "उप-योग",
    shipping: "शिपिंग",
    tax: "कर (18% GST)",
    total: "कुल",
    proceedToCheckout: "चेकआउट पर जाएं",
    clearCart: "कार्ट साफ़ करें",
    free: "मुफ्त",
    items: "आइटम",
    item: "आइटम",

    // Checkout
    checkout: "चेकआउट",
    shippingInfo: "शिपिंग जानकारी",
    firstName: "पहला नाम",
    lastName: "अंतिम नाम",
    emailLabel: "ईमेल पता",
    phoneLabel: "फोन नंबर",
    addressLabel: "पता",
    city: "शहर",
    state: "राज्य",
    pincode: "पिन कोड",
    paymentMethod: "भुगतान विधि",
    cod: "कैश ऑन डिलीवरी",
    card: "क्रेडिट/डेबिट कार्ड",
    upi: "UPI भुगतान",
    cardNumber: "कार्ड नंबर",
    expiryDate: "समाप्ति तिथि",
    cvv: "CVV",
    cardName: "कार्ड पर नाम",
    orderSummary: "ऑर्डर सारांश",
    placeOrder: "ऑर्डर दें",
    processing: "प्रसंस्करण...",
    required: "आवश्यक",
    secureCheckout: "सुरक्षित चेकआउट",

    // Order Confirmation
    orderConfirmed: "ऑर्डर कन्फर्म!",
    thankYou: "आपके ऑर्डर के लिए धन्यवाद",
    orderMessage:
      "आपका ऑर्डर सफलतापूर्वक दिया गया है और इसे प्रोसेस किया जा रहा है।",
    orderNumber: "ऑर्डर नंबर",
    estimatedDelivery: "अनुमानित डिलीवरी",
    trackOrder: "अपना ऑर्डर ट्रैक करें",
    orderStatus: "ऑर्डर स्थिति",
    confirmed: "कन्फर्म",
    processingOrder: "प्रसंस्करण",
    shipped: "भेजा गया",
    delivered: "डिलीवर",
    contactSupport: "मदद चाहिए? हमारी सपोर्ट टीम से संपर्क करें",
    days: "कार्य दिवस",

    // Categories
    cement: "सीमेंट",
    paint: "पेंट",
    furniture: "फर्नीचर",
    electrical: "इलेक्ट्रिकल",
    plumbing: "प्लंबिंग",
    hardware: "हार्डवेयर",
    steel: "स्टील",
    tiles: "टाइल्स",

    // Footer
    quickLinks: "त्वरित लिंक",
    aboutUsLink: "हमारे बारे में",
    contactLink: "संपर्क",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    allRightsReserved: "सभी अधिकार सुरक्षित।",
  },
  kn: {
    // Navigation & Common
    tagline: "ನಿಮ್ಮ ನಿರ್ಮಾಣ ಸಾಮಗ್ರಿಗಳ ಒನ್ ಸ್ಟಾಪ್ ಶಾಪ್",
    search: "ನಿರ್ಮಾಣ ಸಾಮಗ್ರಿಗಳನ್ನು ಹುಡುಕಿ...",
    categories: "ವರ್ಗಗಳು",
    cart: "ಕಾರ್ಟ್",
    menu: "ಮೆನು",
    continueShopping: "ಖರೀದಿಯನ್ನು ಮುಂದುವರಿಸಿ",
    backToCart: "ಕಾರ್ಟ್‌ಗೆ ಹಿಂದಿರುಗಿ",

    // Homepage
    heroTitle: "ನಾವು 3'ಸಿ'ಗಳನ್ನು ಅನುಸರಿಸುತ್ತೇವೆ: ಪರಿಶೀಲಿಸಿ, ಹೋಲಿಸಿ ಮತ್ತು ತೀರ್ಮಾನಿಸಿ.",
    heroSubtitle:
      "ಸಿಮೆಂಟ್‌ನಿಂದ ಫರ್ನಿಚರ್‌ವರೆಗೆ, ನಿಮ್ಮ ನಿರ್ಮಾಣ ಯೋಜನೆಗೆ ನಮಗಿದೆ",
    shopNow: "ಈಗ ಖರೀದಿಸಿ",
    exploreCategories: "ವರ್ಗಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
    popularCategories: "ಜನಪ್ರಿಯ ವರ್ಗಗಳು",
    featuredProducts: "ಮುಖ್ಯ ಉತ್ಪನ್ನಗಳು",
    addToCart: "ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ",
    viewAll: "ಎಲ್ಲವನ್ನೂ ನೋಡಿ",
    aboutUs: "EasyConstruct ಬಗ್ಗೆ",
    aboutText:
      "ಭಾರತದ ಅತ್ಯಂತ ನಂಬಿಕೆಯ ನಿರ್ಮಾಣ ಸಾಮಗ್ರಿಗಳ ಮಾರುಕಟ್ಟೆ, ಗುತ್ತಿಗೆದಾರರು ಮತ್ತು ಮನೆ ಮಾಲೀಕರಿಗೆ ಗುಣಮಟ್ಟದ ಉತ್ಪನ್ನಗಳು ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ಸೇವೆಯನ್ನು ಒದಗಿಸುತ್ತದೆ.",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    phone: "+91 98765 43210",
    email: "support@easyconstruct.com",
    address: "ಮಂಗಳೂರು, ಕರ್ನಾಟಕ, ಭಾರತ",

    // Products
    products: "ಉತ್ಪನ್ನಗಳು",
    filters: "ಫಿಲ್ಟರ್‌ಗಳು",
    brands: "ಬ್ರಾಂಡ್‌ಗಳು",
    priceRange: "ಬೆಲೆ ಶ್ರೇಣಿ",
    sortBy: "ವಿಂಗಡಿಸಿ",
    popularity: "ಜನಪ್ರಿಯತೆ",
    priceLowToHigh: "ಬೆಲೆ: ಕಡಿಮೆದಿಂದ ಹೆಚ್ಚು",
    priceHighToLow: "ಬೆಲೆ: ಹೆಚ್ಚುದಿಂದ ಕಡಿಮೆ",
    rating: "ರೇಟಿಂಗ್",
    newest: "ಹೊಸದು",
    results: "ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದವು",
    clearFilters: "ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ",
    applyFilters: "ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಅನ್ವಯಿಸಿ",
    gridView: "ಗ್ರಿಡ್ ವೀಕ್ಷಣೆ",
    listView: "ಪಟ್ಟಿ ವೀಕ್ಷಣೆ",

    // Cart
    emptyCart: "ನಿಮ್ಮ ಕಾರ್ಟ್ ಖಾಲಿಯಾಗಿದೆ",
    emptyCartMessage: "ಪ್ರಾರಂಭಿಸಲು ಕೆಲವು ನಿರ್ಮಾಣ ಸಾಮಗ್ರಿಗಳನ್ನು ಸೇರಿಸಿ",
    quantity: "ಪ್ರಮಾಣ",
    remove: "ತೆಗೆದುಹಾಕಿ",
    subtotal: "ಉಪಮೊತ್ತ",
    shipping: "ಶಿಪ್ಪಿಂಗ್",
    tax: "ತೆರಿಗೆ (18% GST)",
    total: "ಒಟ್ಟು",
    proceedToCheckout: "ಚೆಕ್‌ಔಟ್‌ಗೆ ಮುಂದುವರಿಸಿ",
    clearCart: "ಕಾರ್ಟ್ ತೆರವುಗೊಳಿಸಿ",
    free: "ಉಚಿತ",
    items: "ಐಟಂಗಳು",
    item: "ಐಟಂ",

    // Checkout
    checkout: "ಚೆಕ್‌ಔಟ್",
    shippingInfo: "ಶಿಪ್ಪಿಂಗ್ ಮಾಹಿತಿ",
    firstName: "ಮೊದಲ ಹೆಸರು",
    lastName: "ಕೊನೆಯ ಹೆಸರು",
    emailLabel: "ಇಮೇಲ್ ವಿಳಾಸ",
    phoneLabel: "ಫೋನ್ ಸಂಖ್ಯೆ",
    addressLabel: "ವಿಳಾಸ",
    city: "ನಗರ",
    state: "ರಾಜ್ಯ",
    pincode: "ಪಿನ್ ಕೋಡ್",
    paymentMethod: "ಪಾವತಿ ವಿಧಾನ",
    cod: "ಡೆಲಿವರಿಯಲ್ಲೇ ನಗದು",
    card: "ಕ್ರೆಡಿಟ್/ಡೆಬಿಟ್ ಕಾರ್ಡ್",
    upi: "UPI ಪಾವತಿ",
    cardNumber: "ಕಾರ್ಡ್ ಸಂಖ್ಯೆ",
    expiryDate: "ಅವಧಿ ದಿನಾಂಕ",
    cvv: "CVV",
    cardName: "ಕಾರ್ಡ್‌ನ ಮೇಲೆ ಹೆಸರು",
    orderSummary: "ಆರ್ಡರ್ ಸಾರಾಂಶ",
    placeOrder: "ಆರ್ಡರ್ ಮಾಡಿ",
    processing: "ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ...",
    required: "ಅಗತ್ಯವಿದೆ",
    secureCheckout: "ಸುರಕ್ಷಿತ ಚೆಕ್‌ಔಟ್",

    // Order Confirmation
    orderConfirmed: "ಆರ್ಡರ್ ದೃಢೀಕೃತವಾಗಿದೆ!",
    thankYou: "ನಿಮ್ಮ ಆರ್ಡರ್‌ಗೆ ಧನ್ಯವಾದಗಳು",
    orderMessage:
      "ನಿಮ್ಮ ಆರ್ಡರ್ ಯಶಸ್ವಿಯಾಗಿ ನೀಡಲಾಗಿದೆ ಮತ್ತು ಅದು ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ.",
    orderNumber: "ಆರ್ಡರ್ ಸಂಖ್ಯೆ",
    estimatedDelivery: "ಅಂದಾಜು ವಿತರಣೆ",
    trackOrder: "ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    orderStatus: "ಆರ್ಡರ್ ಸ್ಥಿತಿ",
    confirmed: "ದೃಢೀಕರಿಸಲಾಗಿದೆ",
    processingOrder: "ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ",
    shipped: "ರವಾನಿಸಲಾಗಿದೆ",
    delivered: "ವಿತರಿಸಲಾಗಿದೆ",
    contactSupport:
      "ಸಹಾಯ ಬೇಕೇ? ನಮ್ಮ ಬೆಂಬಲ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ",
    days: "ಕಾರ್ಯದಿನಗಳು",

    // Categories
    cement: "ಸಿಮೆಂಟ್",
    paint: "ಬಣ್ಣ",
    furniture: "ಅಸಬಾಬು",
    electrical: "ವಿದ್ಯುತ್",
    plumbing: "ಪ್ಲಂಬಿಂಗ್",
    hardware: "ಹಾರ್ಡ್‌ವೇರ್",
    steel: "ಸ್ಟೀಲ್",
    tiles: "ಟೈಲ್ಸ್",

    // Footer
    quickLinks: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",
    aboutUsLink: "ನಮ್ಮ ಬಗ್ಗೆ",
    contactLink: "ಸಂಪರ್ಕಿಸಿ",
    privacyPolicy: "ಗೌಪ್ಯತಾ ನೀತಿ",
    termsOfService: "ಸೇವಾ ನಿಯಮಗಳು",
    allRightsReserved: "ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
  },
} as const

const LanguageContext = createContext<LanguageContextType | null>(null)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("easyconstruct-language") as Language | null
    if (savedLanguage === "en" || savedLanguage === "hi" || savedLanguage === "kn") {
      setLanguageState(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("easyconstruct-language", language)
  }, [language])

  const setLanguage = (lang: Language) => setLanguageState(lang)
  
  
  const toggleLanguage = () => {
  if (language === "en") {
    setLanguage("hi")
  } else if (language === "hi") {
    setLanguage("kn")
  } else {
    setLanguage("en")
  }
}

  const t = (key: string): string => {
    const dict = translations[language] as Record<string, string>
    return dict[key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider")
  return context
}
