"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

const fleetItems = [
  {
    id: "dry-van",
    title: "Freightliner Cascadia",
    description: "Discover the Fifth Generation Cascadia—engineered for safety, efficiency, and profitability.",
    features: ["Innovated for Safety", "Defined by Profitability", "Intelligent Braking Control System"],
    image: "https://img.fleetowner.com/files/base/ebm/fleetowner/image/2024/10/670d1548aa5657b07992b5df-13_fifthgenerationfreightlinercascadiadaycabonhigh.png?auto=format,compress&fit=max&q=45&w=640&width=640",
  },
  {
    id: "refrigerated",
    title: "Volvo VNL",
    description: "The all-new VNL offers spaces optimized for both working and living, putting the driver comfortably in command and maximizing productivity.",
    features: ["Prepared for nearly every ‘what if?’", "The all-new VNL’s with the D13 engine", "10% improvement in fuel efficiency"],
    image: "https://www.volvotrucks.us/trucks/vnl/media_188e41b129559a282a04d3b9cd92e5669355f655b.jpeg?width=2000&format=webply&optimize=medium",
  },
  {
    id: "flatbed",
    title: "Kenworth T680",
    description: "Start with the most highly evolved aerodynamic long-haul tractor Kenworth has ever engineered.",
    features: [
      "PROFIT-TUNED PERFORMANCE", 
      "CUTTING EDGE EXTERIOR STYLING", 
      "Driver-optimized Technology"
    ],
    image: "https://www.kenworthne.com/hubfs/Website%20Files/Showroom/T680-Truck.webp",
  },
  {
    id: "specialized",
    title: "Mack Anthem",
    description: "The Mack Anthem is a heavy-duty truck that is designed to be a more efficient and productive truck for the construction industry.",
    features: [
      "Safer drives by design",
      "Efficiency over everything",
      "Reduced fuel costs by up to 13.5%",
    ],
    image: "https://www.macktrucks.com/trucks/anthem/media_1f153ac933f598062cadaf8dc2924b41ffdacfcd1.jpeg?format=webp&optimize=medium&width=2880",
  },
]

export default function FleetSection() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <section id="fleet" className="py-16 md:py-24 bg-muted/30 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Fleet</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We maintain a modern fleet of vehicles to handle various types of freight and shipping requirements.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="dry-van" className="w-full">
            <TabsList className={`grid grid-cols-2 md:grid-cols-4 mb-8 ${isDark ? "bg-background/80" : ""}`}>
              {fleetItems.map((item) => (
                <TabsTrigger key={item.id} value={item.id} className="text-sm">
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {fleetItems.map((item) => (
              <TabsContent key={item.id} value={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className={`overflow-hidden ${isDark ? "border-primary/10" : ""}`}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="h-64 md:h-auto relative">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="p-6 flex flex-col justify-center">
                        <CardHeader className="p-0 pb-4">
                          <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 pb-6">
                          <CardDescription className="text-base">{item.description}</CardDescription>
                          <ul className="mt-4 space-y-2">
                            {item.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2 text-primary">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter className="p-0">
                          <Button className="group">
                            <span>Request This Vehicle</span>
                            <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                          </Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}

