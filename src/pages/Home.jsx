import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const projects = [
    {
      title: "Smart City Development",
      desc: "Building sustainable, technology-driven cities across India.",
      img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Rural Broadband Expansion",
      desc: "Connecting rural communities with high-speed internet access.",
      img: "https://www.techspot.com/images2/news/bigimage/2022/01/2022-01-31-image-6.jpg",
    },
    {
      title: "Green Energy Program",
      desc: "Promoting renewable energy projects for a cleaner future.",
      img: "https://s40598.pcdn.co/wp-content/uploads/2022/06/Solar-panels-wind-turbines-installed-on-a-field.jpg",
    },
  ];

  const features = [
    {
      title: "Track Spending",
      description: "Monitor government projects and expenditures in real-time.",
      color: "bg-blue-100",
    },
    {
      title: "Transparency",
      description: "All public service transactions are fully visible to citizens.",
      color: "bg-green-100",
    },
    {
      title: "Smart Contracts",
      description: "Blockchain-powered contracts ensure security and authenticity.",
      color: "bg-yellow-100",
    },
    {
      title: "Data Security",
      description: "All records are tamper-proof and securely stored.",
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="bg-gray-50 ">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-24 px-6 text-center rounded-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Digital Public Services Transparency Platform
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl mb-8">
          Promoting accountability and trust in governance by making all public service
          transactions—contracts, permits, approvals—transparent and accessible in real-time.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg font-semibold transition shadow-md"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-white hover:bg-gray-100 text-blue-900 px-6 py-3 rounded-lg font-semibold transition shadow-md"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-12">Latest Government Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              <img src={p.img} alt={p.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-12">Key Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className={`p-6 rounded-2xl shadow-md hover:shadow-lg transition ${f.color}`}>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-700 text-sm">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-12 rounded-2xl">
        © {new Date().getFullYear()} Government Transparency Platform | All Rights Reserved
      </footer>
    </div>
  );
}
