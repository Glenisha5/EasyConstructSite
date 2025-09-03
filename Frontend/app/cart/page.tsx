"use client"

import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function CartPage() {
  const { language, toggleLanguage, t } = useLanguage()
  const { state, removeItem, updateQuantity, clearCart } = useCart()

  const shippingCost = state.total > 5000 ? 0 : 200
  const taxAmount = Math.round(state.total * 0.18)
  const finalTotal = state.total + shippingCost + taxAmount

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">E</span>
              </div>
              <span className="font-playfair font-bold text-xl text-foreground">EasyConstruct</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={toggleLanguage}>
                <Globe className="h-4 w-4 mr-2" />
                {language === "en" ? "हिं" : "EN"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/products">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("continueShopping")}
            </Button>
          </Link>
          <h1 className="font-playfair font-bold text-3xl text-foreground">{t("cart")}</h1>
        </div>

        {state.items.length === 0 ? (
          // Empty Cart
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="font-playfair font-bold text-2xl text-foreground mb-4">{t("emptyCart")}</h2>
            <p className="text-muted-foreground mb-8">{t("emptyCartMessage")}</p>
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                {t("continueShopping")}
              </Button>
            </Link>
          </div>
        ) : (
          // Cart with Items
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">
                  {state.itemCount} {state.itemCount === 1 ? t("item") : t("items")}
                </p>
                <Button variant="outline" size="sm" onClick={clearCart}>
                  {t("clearCart")}
                </Button>
              </div>

              {state.items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary">₹{item.price.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{item.originalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="font-bold text-lg">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="font-playfair">{t("orderSummary")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("subtotal")}</span>
                    <span className="font-medium">₹{state.total.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("shipping")}</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? <Badge variant="secondary">{t("free")}</Badge> : `₹${shippingCost}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("tax")}</span>
                    <span className="font-medium">₹{taxAmount.toLocaleString()}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>{t("total")}</span>
                    <span className="text-primary">₹{finalTotal.toLocaleString()}</span>
                  </div>

                  {state.total < 5000 && (
                    <p className="text-sm text-muted-foreground">
                      {language === "en"
                        ? "Add ₹" + (5000 - state.total).toLocaleString() + " more for free shipping"
                        : "मुफ्त शिपिंग के लिए ₹" + (5000 - state.total).toLocaleString() + " और जोड़ें"}
                    </p>
                  )}

                  <Link href="/checkout">
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                      {t("proceedToCheckout")}
                    </Button>
                  </Link>

                  <Link href="/products">
                    <Button variant="outline" size="lg" className="w-full bg-transparent">
                      {t("continueShopping")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
