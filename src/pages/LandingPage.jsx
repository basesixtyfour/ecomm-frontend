import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Sparkles, Truck, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="border-b-2 border-black px-6 pb-16 pt-14 md:pb-20 md:pt-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 md:flex-row md:items-start">
          <div className="flex-1 text-center md:text-left">
            <div className="mb-5 inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em]">
              <Sparkles className="h-4 w-4" />
              <span>NEW STOCK // WEEKLY</span>
            </div>

            <h1 className="mb-4 text-4xl font-black uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              SHOP THE BOLDEST
              <span className="block border-y-4 border-black py-2 text-4xl sm:text-5xl lg:text-6xl">
                DEALS ONLINE
              </span>
              <span className="mt-2 block text-sm font-semibold tracking-[0.22em] text-neutral-700">
                NO GRADIENTS. NO FLUFF. JUST COMMERCE.
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-sm text-neutral-800 sm:text-base md:mx-0">
              Brutalist storefront. High contrast. Fast checkout. Everything you need to buy, with
              every distraction ripped out.
            </p>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-start">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto hover:!bg-black hover:!text-white !text-black"
              >
                <Link to="/products" className="inline-flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  START SHOPPING
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <button
                type="button"
                className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-800"
              >
                or browse today&apos;s picks
                <span className="inline-flex h-5 w-5 items-center justify-center border-2 border-black bg-white text-[10px]">
                  ?
                </span>
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-neutral-800">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-black" />
                24/7 SECURE CHECKOUT
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-black" />
                FREE SHIPPING OVER $50
              </span>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative mx-auto w-full max-w-md">
              <Card className="border-2 border-black bg-white shadow-[var(--shadow-hard-lg)]">
                <CardContent className="space-y-4 py-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-900">
                      LIVE TRENDING
                    </p>
                    <span className="border-2 border-black bg-black px-2 py-1 text-[10px] font-black text-white">
                      120+ ITEMS
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="border-2 border-black bg-white p-3">
                      <p className="text-[11px] font-semibold text-black uppercase">Headphones</p>
                      <p className="mt-1 text-[10px] text-neutral-700">FROM $59</p>
                    </div>
                    <div className="border-2 border-black bg-white p-3">
                      <p className="text-[11px] font-semibold text-black uppercase">Sneakers</p>
                      <p className="mt-1 text-[10px] text-neutral-700">UP TO 40% OFF</p>
                    </div>
                    <div className="border-2 border-black bg-white p-3">
                      <p className="text-[11px] font-semibold text-black uppercase">Home tech</p>
                      <p className="mt-1 text-[10px] text-neutral-700">SMART &amp; SHARP</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 pb-16 pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl">
              SHOPPING THAT FEELS DELIBERATE
            </h2>
            <p className="mt-2 text-sm text-neutral-800 md:text-base">
              Fast, secure, and unapologetically minimal. Built for people who care about signal,
              not noise.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="bg-white text-black transition-transform hover:-translate-y-1">
              <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center border-2 border-black bg-white">
                  <Truck className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-black uppercase">Lightning-fast delivery</h3>
                  <p className="text-sm text-neutral-800">
                    Reliable partners. Clear tracking. No vague promises.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white text-black transition-transform hover:-translate-y-1">
              <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center border-2 border-black bg-white">
                  <Shield className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-black uppercase">Security-first checkout</h3>
                  <p className="text-sm text-neutral-800">
                    Minimal attack surface, hardened flows, and no unnecessary scripts.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white text-black transition-transform hover:-translate-y-1">
              <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center border-2 border-black bg-white">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-black uppercase">Curated collections</h3>
                  <p className="text-sm text-neutral-800">
                    Tight, opinionated collections instead of endless, noisy grids.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
