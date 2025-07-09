
import React, { useState, useEffect } from 'react';
import { ArrowRight, Factory, Settings, Users, CheckCircle, Clock, Shield, Star, ArrowDown } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';

const page = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const flowchartData = [
    {
      id: 'manufacturer',
      title: 'Manufacturer',
      icon: Factory,
      color: 'bg-green-600',
      position: 'left',
      connections: ['certified-centers'],
      subPoints: [
        {
          title: 'Partner with Robofly',
          icon: CheckCircle,
          details: [
            'Sign a collaboration agreement to join Robofly\'s repair ecosystem.',
            'Share brand specifications and repair expectations.',
            'Get listed as an official drone brand partner.',
            'Gain visibility on Robofly\'s certified network.'
          ]
        },
        {
          title: 'Integrate Brand-Specific Repair Guidelines',
          icon: Settings,
          details: [
            'Upload model-wise repair SOPs and manuals.',
            'Define required tools and parts for repairs.',
            'Set safety and calibration standards for your drones.',
            'Ensure alignment with warranty policies.'
          ]
        },
        {
          title: 'Access Dashboard for Feedback & Repair Metrics',
          icon: Shield,
          details: [
            'View live data on repair success rates and turnaround time.',
            'Analyze customer satisfaction scores.',
            'Track the most common failure points per model.',
            'Receive alerts on unauthorized or low-quality service issues.'
          ]
        },
        {
          title: 'Enjoy Faster Turnaround & Stronger Customer Retention',
          icon: Star,
          details: [
            'Reduce downtime through streamlined workflows.',
            'Boost loyalty with certified, brand-aligned servicing.',
            'Build trust through reliable post-sale support.',
            'Increase repeat business via customer satisfaction.'
          ]
        }
      ]
    },
    {
      id: 'certified-centers',
      title: 'Certified Service Centers',
      icon: Settings,
      color: 'bg-green-500',
      position: 'center',
      connections: ['drone-clients'],
      subPoints: [
        {
          title: 'Apply to Join Robofly Network',
          icon: CheckCircle,
          details: [
            'Submit business credentials and repair experience.',
            'Pass background checks and vetting.',
            'Meet minimum equipment and staffing standards.',
            'Sign service-level agreement (SLA) with Robofly.'
          ]
        },
        {
          title: 'Get Trained & Certified',
          icon: Settings,
          details: [
            'Complete manufacturer-approved training programs.',
            'Learn repair standards for multiple drone brands.',
            'Pass theoretical and practical assessments.',
            'Earn a Robofly Certified Technician badge.'
          ]
        },
        {
          title: 'Start Accepting Repair Requests',
          icon: Clock,
          details: [
            'Get listed in Robofly\'s platform as an available service center.',
            'Receive real-time job requests based on location.',
            'Use Robofly\'s repair management system to track jobs.',
            'Manage scheduling, pickup, and delivery from the platform.'
          ]
        },
        {
          title: 'Follow Quality Protocols & Continuous Support',
          icon: Shield,
          details: [
            'Adhere to documented SOPs for diagnostics and repair.',
            'Submit photos/videos of repairs for audits.',
            'Access live chat with technical experts for support.',
            'Receive ratings and feedback for service improvement.'
          ]
        }
      ]
    },
    {
      id: 'drone-clients',
      title: 'Drone Clients',
      icon: Users,
      color: 'bg-green-400',
      position: 'right',
      connections: [],
      subPoints: [
        {
          title: 'Submit Repair Request Online',
          icon: Settings,
          details: [
            'Fill in drone issue details on the Robofly portal/app.',
            'Attach photos/videos of the malfunction.',
            'Choose preferred time/date for pickup or drop-off.',
            'Track repair status in real-time.'
          ]
        },
        {
          title: 'Assigned to Nearest Certified Center',
          icon: CheckCircle,
          details: [
            'Automatically routed to nearby certified center.',
            'Get ETA and contact of assigned service technician.',
            'Choose from in-store, pickup, or onsite service options.',
            'Get notified about service progress and updates.'
          ]
        },
        {
          title: 'Fast, Reliable Repairs',
          icon: Clock,
          details: [
            'Receive genuine parts and expert handling.',
            'Enjoy fixed-price or transparent quote-based services.',
            'Repairs completed within a standardized turnaround time.',
            'Warranty offered on repair depending on brand policy.'
          ]
        },
        {
          title: 'Provide Feedback & Get Drone Back in Action',
          icon: Star,
          details: [
            'Rate the repair quality and service experience.',
            'Report any post-repair issues or concerns.',
            'Get loyalty rewards or discounts on future services.',
            'Resume drone operations with confidence and assurance.'
          ]
        }
      ]
    }
  ];

  const linearFlowData = [
    {
      title: 'Manufacturer',
      color: 'bg-gradient-to-r from-green-600 to-green-700',
      steps: [
        'Partner with Robofly',
        'Integrate Brand Guidelines',
        'Access Dashboard Metrics',
        'Enjoy Faster Turnaround'
      ]
    },
    {
      title: 'Certified Service Centers',
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      steps: [
        'Apply to Join Network',
        'Get Trained & Certified',
        'Start Accepting Requests',
        'Follow Quality Protocols'
      ]
    },
    {
      title: 'Drone Clients',
      color: 'bg-gradient-to-r from-green-400 to-green-500',
      steps: [
        'Submit Repair Request',
        'Assigned to Nearest Center',
        'Fast, Reliable Repairs',
        'Provide Feedback & Resume'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-green-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Upcoming Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Revolutionizing Drone Repairs: A Decentralized, Certified Service Ecosystem
            </p>
          </div>
        </div>
      </section>

      {/* Linear Flowchart Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Service Process Flow</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process connects all stakeholders in the drone repair ecosystem
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-12">
              {linearFlowData.map((section, sectionIndex) => (
                <div key={section.title} className="flex flex-col items-center flex-1 relative">
                  {/* Header */}
                  <div className={`${section.color} text-white px-8 py-4 rounded-t-xl font-bold text-center w-full max-w-sm shadow-lg`}>
                    <h3 className="text-lg">{section.title}</h3>
                  </div>
                  
                  {/* Steps */}
                  <div className="border-2 border-t-0 border-green-200 rounded-b-xl w-full max-w-sm shadow-lg bg-white">
                    {section.steps.map((step, stepIndex) => (
                      <div key={stepIndex}>
                        <div className="p-6 text-center bg-white hover:bg-green-50 transition-colors duration-200 min-h-[100px] flex items-center justify-center">
                          <p className="text-sm font-medium text-gray-700 leading-relaxed">{step}</p>
                        </div>
                        {stepIndex < section.steps.length - 1 && (
                          <div className="flex justify-center py-2">
                            <ArrowDown className="h-5 w-5 text-green-400" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Horizontal Arrow (except for last item) */}
                  {sectionIndex < linearFlowData.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center absolute -right-6 top-1/2 transform -translate-y-1/2 z-10">
                      <div className="bg-white rounded-full p-2 shadow-lg border-2 border-green-200">
                        <ArrowRight className="h-6 w-6 text-green-500" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* View Details Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-16">
            {linearFlowData.map((section, index) => (
              <Button
                key={section.title}
                onClick={() => setActiveSection(activeSection === index ? null : index)}
                className={`px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  activeSection === index
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-white text-green-600 border-2 border-green-500 hover:bg-green-50'
                }`}
              >
                {activeSection === index ? 'Hide Details' : `View ${section.title} Details`}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      {activeSection !== null && (
        <div className="transition-all duration-500 bg-gradient-to-r from-gray-50 to-white pb-20">
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className={`${linearFlowData[activeSection].color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  {activeSection === 0 && <Factory className="h-8 w-8 text-white" />}
                  {activeSection === 1 && <Settings className="h-8 w-8 text-white" />}
                  {activeSection === 2 && <Users className="h-8 w-8 text-white" />}
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">{linearFlowData[activeSection].title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {flowchartData[activeSection].subPoints.map((subPoint, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors duration-300">
                          <subPoint.icon className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{subPoint.title}</h3>
                      </div>
                      <ul className="space-y-3">
                        {subPoint.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Our Ecosystem?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether you're a manufacturer, service center, or drone owner, Robofly's ecosystem is designed to serve you better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-green-700 px-8 py-3 rounded-full transition-all duration-300"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;