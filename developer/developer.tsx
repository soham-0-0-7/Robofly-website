import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import sohamImage from "@/developer/soham-gandhi.jpg";
import jayImage from "@/developer/jay-ashwin.jpg";
import vyomImage from "@/developer/vyom-darji.jpg";

const developers = [
  {
    name: "Soham Gandhi",
    image: sohamImage,
    linkedin: "https://www.linkedin.com/in/soham-gandhi-57b856266/"
  },
  {
    name: "Jay Ashwin",
    image: jayImage,
    linkedin: "https://www.linkedin.com/in/jay-ashwin-9ab7952ba/"
  },
  {
    name: "Vyom Darji",
    image: vyomImage,
    linkedin: "https://www.linkedin.com/in/vyom-darji-14a5152a8/?originalSubdomain=in"
  }
];

const Developers = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-robofly-text mb-6">
            OUR <span className="text-robofly-primary">DEVELOPERS</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Meet the innovative minds behind Robofly's cutting-edge drone technology solutions.
          </p>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-16">
            Our dedicated team combines technical expertise with passion for aerial innovation.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {developers.map((developer, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <div className="w-full h-full rounded-full bg-robofly-primary flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {developer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full border-2 border-robofly-primary"></div>
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-robofly-text">
                      {developer.name}
                    </h3>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-robofly-primary text-robofly-primary hover:bg-robofly-primary hover:text-white transition-all duration-300"
                    onClick={() => window.open(developer.linkedin, '_blank')}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
                <div className="absolute inset-0 bg-white rounded-2xl p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-xl animate-fade-in">

                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <div className="w-full h-full rounded-full bg-robofly-primary flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {developer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                     
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full border-2 border-robofly-primary"></div>
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-robofly-text">
                      {developer.name}
                    </h3>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-robofly-primary text-robofly-primary hover:bg-robofly-primary hover:text-white transition-all duration-300"
                    onClick={() => window.open(developer.linkedin, '_blank')}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Developers;