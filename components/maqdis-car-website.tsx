'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Copy, MessageCircle, Truck, Mail } from 'lucide-react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Define the Car type
type Car = {
  id: number;
  name: string;
  version: string;
  type: string;
  price: number;
  image: string;
  featured: boolean;
  transmission: string;
  seats: number;
  luggage: number;
  airConditioning: boolean;
  fuel: string;
  maxSpeed: number;
  trunkSize: number;
}
const cars: Car[] = [
  {
    id: 1,
    name: 'Kia Picanto',
    version: 'Base',
    type: 'Économique',
    price: 249,
    image: '/kia.jpg',
    featured: true,
    transmission: 'Manuelle',
    seats: 4,
    luggage: 2,
    airConditioning: true,
    fuel: 'Essence',
    maxSpeed: 160,
    trunkSize: 255
  },
  {
    id: 4,
    name: 'Renault Clio 4',
    version: 'Base',
    type: 'Économique',
    price: 249,
    image: '/clio4.jpeg',
    featured: false,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 2,
    airConditioning: true,
    fuel: 'Gazoil',
    maxSpeed: 180,
    trunkSize: 300
  },
  {
    id: 8,
    name: 'Citroën C-Elysée',
    version: 'Base',
    type: 'Berline',
    price: 269,
    image: '/Celyse.jpg',
    featured: false,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 3,
    airConditioning: true,
    fuel: 'Gazoil',
    maxSpeed: 180,
    trunkSize: 506
  },
  {
    id: 9,
    name: 'Citroën C3',
    version: 'Base',
    type: 'Économique',
    price: 269,
    image: '/c3.jpg',
    featured: false,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 2,
    airConditioning: true,
    fuel: 'Gazoil',
    maxSpeed: 170,
    trunkSize: 300
  },
  {
    id: 2,
    name: 'Dacia Logan',
    version: 'Base',
    type: 'Économique',
    price: 300,
    image: '/dacia.jpg',
    featured: false,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 3,
    airConditioning: true,
    fuel: 'Gazoil',
    maxSpeed: 170,
    trunkSize: 510
  },
  {
    id: 3,
    name: 'Stepway',
    version: 'Base',
    type: 'Crossover',
    price: 300,
    image: '/dacia-Stepway.webp',
    featured: false,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 3,
    airConditioning: true,
    fuel: 'Gazoil',
    maxSpeed: 170,
    trunkSize: 478
  },
  {
    id: 5,
    name: 'Renault Clio 5',
    version: 'Base',
    type: 'Économique',
    price: 299,
    image: '/clio24.jpg',
    featured: true,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 2,
    airConditioning: true,
    fuel: 'Gazoil',
    maxSpeed: 180,
    trunkSize: 391
  },
  {
    id: 6,
    name: 'Opel Corsa',
    version: 'Base',
    type: 'Économique',
    price: 299,
    image: '/Corsa.png',
    featured: false,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 2,
    airConditioning: true,
    fuel: 'Gazoil',
    maxSpeed: 185,
    trunkSize: 309
  },
  {
    id: 10,
    name: 'Hyundai i20',
    version: 'Base',
    type: 'Économique',
    price: 299,
    image: '/i20.jpg',
    featured: false,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 2,
    airConditioning: true,
    fuel: 'Gazoil',
    maxSpeed: 170,
    trunkSize: 352
  },
  {
    id: 12,
    name: 'Hyundai i10',
    version: 'Automatique',
    type: 'Économique',
    price: 299,
    image: '/bva.webp',
    featured: false,
    transmission: 'Automatique',
    seats: 4,
    luggage: 2,
    airConditioning: true,
    fuel: 'Essence',
    maxSpeed: 160,
    trunkSize: 252
  },
  {
    id: 13,
    name: 'Peugeot 208',
    version: 'Base',
    type: 'Économique',
    price: 339,
    image: '/208.jpeg',
    featured: false,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 2,
    airConditioning: true,
    fuel: 'Gazoil',
    maxSpeed: 185,
    trunkSize: 311
  },
  {
    id: 11,
    name: 'Hyundai Accent RIA',
    version: 'Base',
    type: 'Berline',
    price: 349,
    image: '/acc.avif',
    featured: false,
    transmission: 'Automatique',
    seats: 5,
    luggage: 3,
    airConditioning: true,
    fuel: 'Gazoil',
    maxSpeed: 190,
    trunkSize: 480
  },
  {
    id: 7,
    name: 'Hyundai Tucson',
    version: 'Premium',
    type: 'SUV',
    price: 699,
    image: '/tucson.webp',
    featured: true,
    transmission: 'Automatique',
    seats: 5,
    luggage: 4,
    airConditioning: true,
    fuel: 'Gazoil',
    maxSpeed: 200,
    trunkSize: 620
  },
  {
    id: 14,
    name: 'Volkswagen T-Roc',
    version: 'Premium',
    type: 'SUV',
    price: 699,
    image: '/Trok.jpg',
    featured: true,
    transmission: 'Automatique',
    seats: 5,
    luggage: 4,
    airConditioning: true,
    fuel: 'Gazoil',
    maxSpeed: 205,
    trunkSize: 445
  },
    {
    id: 19,
    name: 'Cupra Leon',
    version: 'Premium',
    type: 'Berline',
    price: 599,
    image: '/cupra.png',
    featured: true,
    transmission: 'Automatique',
    seats: 5,
    luggage: 4,
    airConditioning: true,
    fuel: 'Gazoil',
    maxSpeed: 205,
    trunkSize: 445
  },
];

// First, add the BrandsSection component inside the same file, just before the MaqdisCarWebsite component

function BrandsSection() {
  const carBrands = [
    { name: "Mercedes-Benz", logo: "/merec.png" },
    { name: "Volkswagen", logo: "/wols.png" },
    { name: "Dacia", logo: "/dac.png" },
    { name: "Peugeot", logo: "/peug.png" },
    { name: "Hyundai", logo: "/hundai.png" },
    { name: "Citroën", logo: "/citro.png" },
    { name: "Opel", logo: "/opel.png" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="my-24"
    >
      <h3 className="text-3xl font-semibold mb-12 text-gray-800 text-center">Nos Marques Partenaires</h3>
      <div className="relative overflow-hidden h-32">
        <motion.div
          className="flex absolute"
          animate={{
            x: [0, -2100],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {[...carBrands, ...carBrands].map((brand, index) => (
            <div key={index} className="flex-shrink-0 w-60 mx-8">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={150}
                height={150}
                className="object-contain h-32"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export function MaqdisCarWebsite() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedFilters, setSelectedFilters] = useState({ type: '', featured: false })
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [showReservationConfirmation, setShowReservationConfirmation] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Get unique car types
  const carTypes = Array.from(new Set(cars.map(car => car.type)))

  const filteredCars = cars.filter(car => {
    return (selectedFilters.type === '' || car.type === selectedFilters.type)
  });

  const handleFilterChange = (filterType: string, value: string | boolean) => {
    setSelectedFilters(prev => ({ ...prev, [filterType]: value }))
  }

  const openCarDetails = (car: Car) => {
    setSelectedCar(car)
  }

  const closeCarDetails = () => {
    setSelectedCar(null)
  }

  const handleReservation = () => {
    setShowReservationConfirmation(true)
  }

  const closeReservationConfirmation = () => {
    setShowReservationConfirmation(false)
  }

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText('+212 625-831083')
    toast.success('Numéro de téléphone copié!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  return (
    <div ref={contentRef} className={`min-h-screen ${currentPage === 'about' ? 'bg-white' : 'bg-gradient-to-r from-[#B8860B] to-[#C0C0C0]'}`}>
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 z-50">
          <nav className={`${currentPage === 'about' ? 'bg-gradient-to-b from-[#B8860B] via-[#C0C0C0] to-transparent' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center -mt-4">
                  <Image
                    src="/jlogo.png"
                    alt="Joude Car Logo"
                    width={250}
                    height={150}
                    className="mr-2"
                  />
                </div>
                <div className="flex space-x-8">
                  <button
                    className={`text-lg ${currentPage === 'home' ? 'text-white font-bold' : 'text-white hover:text-gray-200'}`}
                    onClick={() => {
                      if (currentPage !== 'home') {
                        setCurrentPage('home');
                        window.scrollTo(0, 0);
                      }
                    }}
                  >
                    Accueil
                  </button>
                  <button
                    className={`text-lg ${currentPage === 'about' ? 'text-white font-bold' : 'text-white hover:text-gray-200'}`}
                    onClick={() => {
                      if (currentPage !== 'about') {
                        setCurrentPage('about');
                        window.scrollTo(0, 0);
                      }
                    }}
                  >
                    À Propos
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="h-24"></div> {/* Spacer to prevent content from hiding under nav */}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <section className="relative h-screen">
              <div className="absolute inset-0 flex flex-col justify-center items-center z-10 -mt-80"> {/* Increased negative margin to -mt-80 for more upward movement */}
                <h2 className="text-5xl font-bold mb-8 text-white text-center">Bienvenue chez <span className="font-bold italic text-gray-200">Joude Car</span></h2>
                <p className="text-xl mb-8 text-white text-center max-w-2xl mx-auto">
                  Découvrez notre sélection de voitures de luxe pour une expérience de conduite inoubliable.
                </p>
                <motion.button
                  className="bg-white text-gray-600 px-8 py-3 rounded-full text-xl mx-auto relative overflow-hidden group"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(184,134,11,0.7)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    y: [0, -10, 0],
                    boxShadow: [
                      "0 0 10px rgba(184,134,11,0.3)",
                      "0 0 20px rgba(184,134,11,0.5)",
                      "0 0 10px rgba(184,134,11,0.3)"
                    ]
                  }}
                  transition={{
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  onClick={() => {
                    const catalogElement = document.getElementById('catalog');
                    if (catalogElement) {
                      catalogElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                >
                  {/* Continuous shine effect */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-continuous-shine" />
                  </div>

                  {/* Continuous glow effect */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B] to-[#C0C0C0] blur-xl animate-continuous-pulse opacity-30" />
                  </div>

                  {/* Button content */}
                  <div className="flex items-center space-x-2 relative z-10">
                    <span className="relative bg-gradient-to-r from-[#B8860B] to-[#C0C0C0] bg-clip-text">
                      Voir notre catalogue
                    </span>
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      animate={{
                        x: [0, 5, 0],
                        rotate: [0, 15, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="stroke-[#B8860B] transition-colors duration-300"
                    >
                      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                      <path d="M13 13l6 6" />
                    </motion.svg>
                  </div>
                </motion.button>
              </div>
            </section>

            <section id="catalog" className="py-16 px-4 md:px-8 bg-gray-100">
              <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Notre Catalogue</h2>

              <div className="mb-12 max-w-3xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Filtres</h3>
                  <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                    <div className="w-full">
                      <label className="block mb-2 text-gray-700 font-medium">Type de véhicule</label>
                      <select
                        className="w-full bg-gray-50 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        value={selectedFilters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                      >
                        <option value="">Tous les types</option>
                        {carTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredCars.map((car) => (
                  <motion.div
                    key={car.id}
                    className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-100 relative group hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    {/* Badge Populaire */}
                    {car.featured && (
                      <div className="absolute top-8 right-8 z-10">
                        <span className="bg-white px-4 py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-sm border border-gray-100">
                          Populaire
                        </span>
                      </div>
                    )}

                    {/* Image Container - Added light gray background for better contrast */}
                    <div className="relative h-56 mb-6 bg-[#F8F9FA] rounded-[24px] overflow-hidden flex items-center justify-center">
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        style={{ objectFit: 'contain' }}
                        className="p-4 transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{car.name}</h3>
                          <div className="flex items-center text-sm text-gray-500 font-medium">
                            <span>{car.transmission}</span>
                            <span className="mx-2">•</span>
                            <span>{car.fuel}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[22px] font-bold text-[#D4AF37] leading-none">
                            {car.price.toLocaleString()} MAD
                          </div>
                          <span className="text-xs text-gray-400 font-medium">/ jour</span>
                        </div>
                      </div>

                      {/* Dotted Separator */}
                      <div className="w-full border-t-2 border-dashed border-gray-100 my-6"></div>

                      {/* Action Button */}
                      <Button
                        className="w-full bg-black hover:bg-gray-800 text-white rounded-full py-6 font-bold text-sm tracking-wide transition-colors duration-300"
                        onClick={() => openCarDetails(car)}
                      >
                        Réserver ce véhicule
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-[#B8860B] to-[#C0C0C0]">
              <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Service de Navette Aéroport</h2>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="w-full md:w-1/2">
                      <Image
                        src="/angad.jpeg"
                        alt="Aéroport Oujda Angads"
                        width={500}
                        height={300}
                        className="rounded-lg shadow-lg object-cover"
                      />
                    </div>

                    <div className="w-full md:w-1/2 space-y-6">
                      <h3 className="text-2xl font-semibold text-gray-800">Transport Aéroport Oujda Angads</h3>

                      <p className="text-gray-600">
                        Pour votre confort, <span className="font-bold italic text-[#B8860B]">Joude Car</span> propose un service de navette depuis et vers l&apos;aéroport d&apos;Oujda Angads.
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#B8860B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">Service disponible 24/7</span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#B8860B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">Véhicules confortables et climatisés</span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#B8860B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">Suivi des vols en temps réel</span>
                        </div>
                      </div>

                      <div className="mt-8">
                        <Button
                          className="bg-[#B8860B] hover:bg-[#906E0B] text-white w-full md:w-auto"
                          onClick={() => window.open('https://wa.me/212625831083', '_blank')}
                        >
                          <MessageCircle className="mr-2" />
                          Réserver une navette
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Add new map section */}
            <section className="py-16 px-4 md:px-8 bg-white">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Notre Emplacement</h2>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="w-full md:w-1/2 space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-800">Visitez Notre Agence</h3>
                    <p className="text-gray-600">
                      Nous sommes idéalement situés pour vous servir. Venez nous rendre visite pour découvrir notre flotte de véhicules et discuter de vos besoins en location.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-2 text-gray-600" />
                        <span>Oujda, Maroc</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-5 h-5 mr-2 text-gray-600" />
                        <span>+212 625-831083</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Truck className="w-5 h-5 mr-2 text-gray-600" />
                        <span>Livraison partout au Maroc</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.535075263833!2d-1.8998052880310843!3d34.66644267281907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd787d450f13d7a3%3A0x8c9f27075bc0ed37!2sJoude%20car!5e0!3m2!1sfr!2sma!4v1730114747553!5m2!1sfr!2sma"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {currentPage === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen relative overflow-hidden"
          >
            {/* Gradient background for the top part */}
            <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-gray-600 via-gray-500 via-gray-400 via-gray-300 to-white"></div>

            {/* White background for the content */}
            <div className="relative z-10 bg-white pt-16">
              <div className="max-w-4xl mx-auto px-4 md:px-8">
                <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">À Propos de <span className="text-[#B8860B] italic">Joude Car</span></h2>
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Notre Mission</h3>
                    <p className="text-gray-600">
                      Chez <span className="font-bold italic text-[#B8860B]">Joude Car</span>, notre mission est de vous offrir une expérience de location automobile exceptionnelle,
                      alliant confort, flexibilité et service client de premier ordre, tout en vous permettant de découvrir
                      les merveilles du Maroc à votre rythme.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Notre Vision</h3>
                    <p className="text-gray-600">
                      Nous aspirons à devenir la référence incontournable de la location de voitures au Maroc, en proposant
                      une flotte moderne et écologique, tout en mettant l&apos;accent sur l&apos;innovation, la durabilité et la
                      satisfaction de nos clients. <span className="font-bold italic text-[#B8860B]">Joude Car</span> s&apos;engage à être votre partenaire de confiance pour tous vos voyages.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Pourquoi choisir Joude Car ?</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Une flotte diversifiée de véhicules récents et bien entretenus</li>
                      <li>Des options de location flexibles adaptées à vos besoins</li>
                      <li>Un service client disponible 24/7 pour vous assister</li>
                      <li>Des tarifs transparents et compétitifs</li>
                      <li>Une présence dans les principales villes touristiques du Maroc</li>
                      <li>Siège bébé gratuit pour votre sécurité et confort</li>
                      <li>Service d&apos;assistance et remorquage disponible</li>
                      <li>Assurance Tous risques incluse pour votre tranquillité</li>
                      <li>Des conseils personnalisés pour optimiser votre voyage</li>
                    </ul>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-12"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">Contactez-Nous</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-gray-700">Notre Siège Social</h4>
                      <p className="text-gray-600">
                        Av. Yacoub Al Mansour, Oujda<br />
                        Oujda, Maroc
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 mr-2 text-gray-600" />
                          <span className="text-gray-600">joudecar@gmail.com</span>
                        </div>
                      </div>
                    </div>
                    <form className="space-y-4">
                      <input
                        type="text"
                        placeholder="Votre nom"
                        className="w-full bg-white p-2 rounded border border-gray-300"
                      />
                      <input
                        type="email"
                        placeholder="Votre email"
                        className="w-full bg-white p-2 rounded border border-gray-300"
                      />
                      <textarea
                        placeholder="Votre message"
                        rows={4}
                        className="w-full bg-white p-2 rounded border border-gray-300"
                      ></textarea>
                      <Button type="submit" className="w-full bg-gray-600 hover:bg-gray-700 text-white">
                        Envoyer
                      </Button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Add BrandsSection here, just before the closing div */}
            <BrandsSection />

            {/* Add padding at the bottom */}
            <div className="pb-20"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-gray-800 text-white py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-[#C0C0C0] mb-2">Joude Car</h3>
            <p className="text-sm">Votre partenaire de confiance pour explorer le Maroc</p>
          </div>

          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/JoudeCar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/joude.car/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 Joude Car. Tous droits réservés.</p>
        </div>
      </footer>

      <Dialog open={!!selectedCar} onOpenChange={closeCarDetails}>
        <DialogContent className="bg-white text-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">
              <span className="font-bold italic">{selectedCar?.name}</span>
            </DialogTitle>
            <DialogDescription>
              <div className="mt-4 relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={selectedCar?.image || ''}
                  alt={selectedCar?.name || ''}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-700">Type:</p>
                  <p className="italic text-gray-600">{selectedCar?.type}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Transmission:</p>
                  <p className="italic text-gray-600">{selectedCar?.transmission}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Sièges:</p>
                  <p className="italic text-gray-600">{selectedCar?.seats}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Bagages:</p>
                  <p className="italic text-gray-600">{selectedCar?.luggage}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Climatisation:</p>
                  <p className="italic text-gray-600">{selectedCar?.airConditioning ? 'Oui' : 'Non'}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Carburant:</p>
                  <p className="italic text-gray-600">{selectedCar?.fuel}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Vitesse max:</p>
                  <p className="italic text-gray-600">{selectedCar?.maxSpeed} km/h</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Taille du coffre:</p>
                  <p className="italic text-gray-600">{selectedCar?.trunkSize} L</p>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <p className="text-2xl font-bold text-gray-600">{selectedCar?.price.toLocaleString()} MAD</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleReservation}>
                  Réserver
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={showReservationConfirmation} onOpenChange={closeReservationConfirmation}>
        <DialogContent className="bg-white text-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">Confirmation de réservation</DialogTitle>
            <DialogDescription>
              <p className="mt-4 text-gray-600">Merci d&apos;avoir choisi <span className="font-bold italic text-[#B8860B]">Joude Car</span> pour votre location de voiture.</p>
              <p className="mt-2 text-gray-600">Pour finaliser votre réservation, veuillez nous contacter par l&apos;un des moyens suivants :</p>
              <div className="mt-6 space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => window.open('https://wa.me/212625831083', '_blank')}>
                  <MessageCircle className="mr-2" />
                  Contacter sur WhatsApp
                </Button>
                <div className="flex items-center space-x-2">
                  <Button className="flex-grow bg-[#B8860B] hover:bg-[#906E0B] text-white">
                    <Phone className="mr-2" />
                    +212 625-831083
                  </Button>
                  <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800" onClick={copyPhoneNumber}>
                    <Copy className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </div>
  )
}
