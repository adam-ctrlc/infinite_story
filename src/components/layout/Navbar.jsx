"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  BookOpen,
  Settings,
  Library,
  PenTool,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Feed", href: "/feed", icon: BookOpen },
    { name: "Write", href: "/story", icon: Library },
    { name: "Profile", href: "/profile", icon: User },
    // Settings removed, will be inside profile
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/feed" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <PenTool size={18} />
              </div>
              <span className="text-xl font-bold text-gray-100">
                Infinite Story
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 group ${
                      isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <item.icon
                      size={16}
                      className={`transition-colors ${
                        isActive
                          ? "text-blue-400"
                          : "text-gray-500 group-hover:text-blue-400"
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
              <button className="px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 group text-gray-300 hover:text-red-400 hover:bg-gray-800">
                <LogOut
                  size={16}
                  className="transition-colors text-gray-500 group-hover:text-red-400"
                />
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-950 border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <item.icon
                    size={18}
                    className={isActive ? "text-blue-400" : "text-gray-400"}
                  />
                  {item.name}
                </Link>
              );
            })}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 text-gray-300 hover:text-red-400 hover:bg-gray-800"
            >
              <LogOut
                size={18}
                className="text-gray-400 group-hover:text-red-400"
              />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
