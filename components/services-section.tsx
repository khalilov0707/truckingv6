"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Snowflake, AlertTriangle, Clock, Package, Forklift } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

const services = [
  {
    title: "Less Than Truckload",
    description: "Cost-effective solutions for smaller shipments, optimizing efficiency and reducing expenses.",
    icon: Truck,
  },
  {
    title: "Refrigerated Freight",
    description: "Temperature-controlled transportation for perishable goods, ensuring freshness and compliance.",
    icon: Snowflake,
  },
  {
    title: "Hazmat Freight",
    description:
      "Specialized handling and transportation of hazardous materials, adhering to strict safety regulations.",
    icon: AlertTriangle,
  },
  {
    title: "Expedited Shipping",
    description: "Fast and reliable delivery for time-sensitive shipments, ensuring your goods arrive when needed.",
    icon: Clock,
  },
  {
    title: "Specialized Freight",
    description:
      "Custom solutions for oversized, heavy, or unusual cargo that requires special handling and equipment.",
    icon: Package,
  },
  {
    title: "Warehousing & Distribution",
    description: "Comprehensive storage and distribution services to optimize your supply chain operations.",
    icon: Forklift,
  },
]

export default function ServicesSection() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="services" className="py-16 md:py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive range of trucking and logistics solutions to meet your specific needs.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Card
                className={`border border-border h-full hover:shadow-lg transition-all duration-300 group ${
                  isDark ? "hover:shadow-primary/10" : "hover:shadow-primary/5"
                }`}
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-full ${
                      isDark ? "bg-primary/20" : "bg-primary/10"
                    } flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors duration-300`}
                  >
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 group">
                    <span>Service Information</span>
                    <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

