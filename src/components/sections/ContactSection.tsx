"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, ShoppingCart, Truck, Heart, Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

type ContactType = "buy" | "partnership" | "general";

export default function ContactSection() {
  const [contactType, setContactType] = useState<ContactType>("buy");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    company: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email";
        return "";
      case "phone":
        if (value && value.length < 10) return "Please enter a valid phone number";
        return "";
      case "product":
        if (contactType === "buy" && !value) return "Please select a fruit";
        return "";
      case "quantity":
        if (contactType === "buy" && (!value || parseInt(value) < 1)) return "Quantity must be at least 1kg";
        return "";
      case "company":
        if (contactType === "partnership" && !value.trim()) return "Company name is required";
        return "";
      case "subject":
        if (contactType === "general" && !value.trim()) return "Subject is required";
        return "";
      case "message":
        if (contactType !== "buy" && !value.trim()) return "Message is required";
        if (contactType !== "buy" && value.length < 10) return "Please provide more details (at least 10 characters)";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submitting
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log(`${contactType} inquiry submitted:`, formData);
      setIsSubmitted(true);
      setErrors({});

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          product: "",
          quantity: "",
          company: "",
          subject: "",
          message: ""
        });
      }, 3000);
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactTypeChange = (type: ContactType) => {
    setContactType(type);
    setErrors({}); // Clear errors when switching types
    setFormData({
      name: "",
      email: "",
      phone: "",
      product: "",
      quantity: "",
      company: "",
      subject: "",
      message: ""
    });
  };

  const fruits = [
    "Dragon Fruit",
    "Papaya",
    "Banana",
    "Avocado",
    "Apple",
    "Passion Fruit",
    "Mango"
  ];

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative py-20 md:py-24 lg:py-28 bg-gray-50 overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-orange-300 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-orange-100 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold text-orange-600 uppercase tracking-wide"
          >
            Get in Touch
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900"
          >
            Contact Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-600"
          >
            Whether you want to order fresh fruits, explore partnerships, or have questions about our products, we're here to help.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 flex flex-col justify-center"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Contact Information
            </h3>

            <div className="space-y-6">
              <a href="tel:+5712345678" className="block">
                <div className="group flex items-center gap-4 p-6 rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500 grid place-items-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600 group-hover:text-orange-600 transition-colors">
                      +57 123 456 7890
                    </p>
                  </div>
                </div>
              </a>

              <a href="mailto:info@fruitexotic.com" className="block">
                <div className="group flex items-center gap-4 p-6 rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-gray-600 grid place-items-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600 group-hover:text-orange-600 transition-colors">
                      info@fruitexotic.com
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Medellín+Colombia"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="group flex items-center gap-4 p-6 rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500 grid place-items-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Location</h4>
                    <p className="text-gray-600 group-hover:text-orange-600 transition-colors">
                      Medellín, Colombia
                    </p>
                  </div>
                </div>
              </a>
            </div>

            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 mt-8"
            >
              <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-xl">
                <Heart className="w-6 h-6 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">Fresh Quality</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-xl">
                <Truck className="w-6 h-6 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">Fast Delivery</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
              {/* Contact Type Selector */}
              <div className="mb-8">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4 text-center">
                  How can we help you?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <motion.button
                    onClick={() => handleContactTypeChange("buy")}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      contactType === "buy"
                        ? "border-orange-500 bg-orange-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        scale: contactType === "buy" ? 1.1 : 1,
                        rotate: contactType === "buy" ? 5 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ShoppingCart className={`w-6 h-6 mx-auto mb-2 transition-colors ${contactType === "buy" ? "text-orange-600" : "text-gray-600"}`} />
                    </motion.div>
                    <div className="text-sm font-medium text-gray-900">Place Order</div>
                    <div className="text-xs text-gray-500">Buy fresh fruits</div>
                  </motion.button>

                  <motion.button
                    onClick={() => handleContactTypeChange("partnership")}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      contactType === "partnership"
                        ? "border-orange-500 bg-orange-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        scale: contactType === "partnership" ? 1.1 : 1,
                        rotate: contactType === "partnership" ? 5 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Heart className={`w-6 h-6 mx-auto mb-2 transition-colors ${contactType === "partnership" ? "text-orange-600" : "text-gray-600"}`} />
                    </motion.div>
                    <div className="text-sm font-medium text-gray-900">Partnership</div>
                    <div className="text-xs text-gray-500">Business inquiry</div>
                  </motion.button>

                  <motion.button
                    onClick={() => handleContactTypeChange("general")}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      contactType === "general"
                        ? "border-orange-500 bg-orange-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        scale: contactType === "general" ? 1.1 : 1,
                        rotate: contactType === "general" ? 5 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Mail className={`w-6 h-6 mx-auto mb-2 transition-colors ${contactType === "general" ? "text-orange-600" : "text-gray-600"}`} />
                    </motion.div>
                    <div className="text-sm font-medium text-gray-900">General</div>
                    <div className="text-xs text-gray-500">Ask questions</div>
                  </motion.button>
                </div>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <Star className="w-8 h-8 text-orange-600" />
                  </div>
                  <h4 className="text-xl font-bold text-orange-600 mb-2">Message Sent!</h4>
                  <p className="text-gray-600">
                    Thank you! We'll get back to you soon with all the information you need.
                  </p>
                </div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  key={contactType}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                          errors.name ? "border-red-300 bg-red-50" : "border-gray-300"
                        }`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                          errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Order-specific fields */}
                  {contactType === "buy" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
                          Fruit Selection *
                        </label>
                        <select
                          id="product"
                          name="product"
                          required
                          value={formData.product}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        >
                          <option value="">Select a fruit</option>
                          {fruits.map((fruit) => (
                            <option key={fruit} value={fruit}>
                              {fruit}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                          Quantity (kg) *
                        </label>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          required
                          min="1"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          placeholder="5"
                        />
                      </div>
                    </div>
                  )}

                  {/* Partnership-specific fields */}
                  {contactType === "partnership" && (
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Your company name"
                      />
                    </div>
                  )}

                  {/* General inquiry-specific fields */}
                  {contactType === "general" && (
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="What's your question about?"
                      />
                    </div>
                  )}

                  {/* Message field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {contactType === "buy"
                        ? "Special Requests"
                        : contactType === "partnership"
                        ? "Partnership Details *"
                        : "Your Message *"}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required={contactType !== "buy"}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                      placeholder={
                        contactType === "buy"
                          ? "Any special delivery instructions or requests..."
                          : contactType === "partnership"
                          ? "Tell us about your business and partnership ideas..."
                          : "Please describe your question or inquiry..."
                      }
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    className={`w-full font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600 hover:shadow-xl text-white"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                          Sending...
                        </>
                      ) : contactType === "buy" ? (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          Submit Order Request
                        </>
                      ) : contactType === "partnership" ? (
                        <>
                          <Heart className="w-5 h-5" />
                          Send Partnership Inquiry
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


