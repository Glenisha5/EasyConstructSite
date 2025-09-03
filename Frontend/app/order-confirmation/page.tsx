"use client"
import { CheckCircle, Package, Truck, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// <CHANGE> Added useLanguage hook import
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function OrderConfirmationPage() {
  // <CHANGE> Removed local language state and used global language context
  const { language, toggleLanguage, t } = useLanguage()

  const orderNumber = "EC" + Math.random().toString(36).substr(2, 9).toUpperCase()
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 5)

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

            {/* <CHANGE> Updated language toggle to use global context */}
            <Button variant="ghost" size="sm" onClick={toggleLanguage}>
              <Globe className="h-4 w-4 mr-2" />
              {language === "en" ? "हिं" : "EN"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            {/* <CHANGE> Updated order confirmation messages to use translation function */}
            <h1 className="font-playfair font-bold text-4xl text-foreground">{t("orderConfirmed")}</h1>
            <p className="text-xl text-muted-foreground">{t("thankYou")}</p>
            <p className="text-muted-foreground">{t("orderMessage")}</p>
          </div>

          {/* Order Details */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                {/* <CHANGE> Updated order details labels to use translation function */}
                <span className="font-medium">{t("orderNumber")}:</span>
                <Badge variant="secondary" className="font-mono text-lg px-3 py-1">
                  {orderNumber}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">{t("estimatedDelivery")}:</span>
                <span className="text-primary font-medium">
                  {deliveryDate.toLocaleDateString()} (5-7 {t("days")})
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card>
            <CardHeader>
              {/* <CHANGE> Updated order status title to use translation function */}
              <CardTitle className="font-playfair">{t("orderStatus")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-primary-foreground" />
                  </div>
                  {/* <CHANGE> Updated order status labels to use translation function */}
                  <span className="text-sm font-medium text-primary">{t("confirmed")}</span>
                </div>
                <div className="flex-1 h-0.5 bg-primary mx-4"></div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-primary">{t("processing")}</span>
                </div>
                <div className="flex-1 h-0.5 bg-muted mx-4"></div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">{t("shipped")}</span>
                </div>
                <div className="flex-1 h-0.5 bg-muted mx-4"></div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-\
