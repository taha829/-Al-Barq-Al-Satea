import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import heroImage from "@/assets/hero-manufacturing.jpg";

const OrderBooking = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    productType: "",
    quantity: "",
    size: "",
    name: "",
    phone: "",
    whatsapp: "",
    location: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = t("order.whatsappMessage")
      .replace("{product}", formData.productType)
      .replace("{quantity}", formData.quantity)
      .replace("{size}", formData.size)
      .replace("{name}", formData.name)
      .replace("{phone}", formData.phone)
      .replace("{location}", formData.location)
      .replace("{notes}", formData.notes);

    const whatsappUrl = `https://wa.me/962799259682?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    toast({
      title: t("order.toast.title"),
      description: t("order.toast.description"),
    });

    setFormData({
      productType: "",
      quantity: "",
      size: "",
      name: "",
      phone: "",
      whatsapp: "",
      location: "",
      notes: "",
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection
        title={t("order.hero.title")}
        subtitle={t("order.hero.subtitle")}
        backgroundImage={heroImage}
      />

      {/* Order Form */}
      <section className="py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t("order.form.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Product Type */}
                  <div>
                    <Label htmlFor="productType">
                      {t("order.form.productType")} {t("order.form.required")}
                    </Label>
                    <Select
                      value={formData.productType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, productType: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("order.form.productTypePlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="printed-bags">
                          {t("order.form.printedBags")}
                        </SelectItem>
                        <SelectItem value="unprinted-bags">
                          {t("order.form.unprintedBags")}
                        </SelectItem>
                        <SelectItem value="table-covers">
                          {t("order.form.tableCovers")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <Label htmlFor="quantity">
                      {t("order.form.quantity")} {t("order.form.required")}
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      placeholder={t("order.form.quantityPlaceholder")}
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Size & Thickness */}
                  <div>
                    <Label htmlFor="size">
                      {t("order.form.size")} {t("order.form.required")}
                    </Label>
                    <Input
                      id="size"
                      placeholder={t("order.form.sizePlaceholder")}
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      required
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <Label htmlFor="name">
                      {t("order.form.name")} {t("order.form.required")}
                    </Label>
                    <Input
                      id="name"
                      placeholder={t("order.form.namePlaceholder")}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone">
                      {t("order.form.phone")} {t("order.form.required")}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t("order.form.phonePlaceholder")}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <Label htmlFor="whatsapp">{t("order.form.whatsapp")}</Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder={t("order.form.whatsappPlaceholder")}
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <Label htmlFor="location">{t("order.form.location")}</Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder={t("order.form.locationPlaceholder")}
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <Label htmlFor="notes">{t("order.form.notes")}</Label>
                    <Textarea
                      id="notes"
                      placeholder={t("order.form.notesPlaceholder")}
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    {t("order.form.submit")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Order Process Info */}
            <Card className="mt-8 bg-muted">
              <CardContent className="pt-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  {t("order.process.title")}
                </h3>
                <p className="text-muted-foreground">{t("order.process.description")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderBooking;
