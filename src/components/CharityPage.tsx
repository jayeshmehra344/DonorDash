import { Button } from "../components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Link } from "react-router-dom";
import CharitiesLogo from "./images/Charitieslogo.jpg"; // Import the background image

const charities = [
  {
    id: 1,
    name: "Helping Hands Foundation",
    category: "Homeless Support",
    description: "Supporting homeless individuals with essential supplies and shelter",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=300&auto=format&fit=crop",
    needsUrgent: ["Winter Clothing", "Blankets", "Personal Hygiene Items"]
  },
  {
    id: 2,
    name: "Children's Future",
    category: "Education",
    description: "Providing educational materials and support for underprivileged children",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=300&auto=format&fit=crop",
    needsUrgent: ["School Supplies", "Children's Books", "Backpacks"]
  },
  {
    id: 3,
    name: "Animal Welfare League",
    category: "Animal Care",
    description: "Rescuing and caring for abandoned and injured animals",
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=300&auto=format&fit=crop",
    needsUrgent: ["Pet Food", "Towels", "Pet Toys"]
  },
  {
    id: 4,
    name: "Food For All",
    category: "Food Bank",
    description: "Distributing food to families and individuals facing food insecurity",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=300&auto=format&fit=crop",
    needsUrgent: ["Canned Goods", "Rice", "Cooking Oil"]
  }
];

export default function CharitiesShowcase() {
  return (
    <section className="pt-12 md:pt-16"> {/* Reduced top padding to move the page up */}
      {/* ✅ Hero Section with Background Image */}
      <div className="relative w-full h-[40vh] overflow-hidden"> {/* Adjusted height to match homepage */}
        {/* Background Image with Blur */}
        <img
          src={CharitiesLogo} // Use the imported image
          alt="Charities Background"
          className="w-full h-full object-cover"
          style={{ filter: "blur(4px)" }} // Apply blur effect using inline CSS
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4">
          <div className="space-y-2"> 
            <h2
              className="text-4xl font-extrabold tracking-tighter md:text-6xl text-purple-700 drop-shadow-lg mb-6"
              style={{ fontFamily: "'Hemi Head', sans-serif" }}
            >
              Featured Charities
            </h2>
          </div>
        </div>
      </div>

      {/* ✅ The cards remain outside, with NO background */}
      <div className="container px-4 md:px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {charities.map((charity) => (
            <Card key={charity.id} className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={charity.image} 
                  alt={charity.name}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                  data-darkreader-inline="background"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-gray-900">{charity.name}</CardTitle> {/* Black text */}
                </div>
                <Badge variant="secondary" className="mt-1 w-fit bg-gray-100 text-gray-900">
                  {charity.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{charity.description}</p> {/* Gray text */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2 text-gray-900">Urgent Needs:</h4> {/* Black text */}
                  <div className="flex flex-wrap gap-1">
                    {charity.needsUrgent.map((need, index) => (
                      <Badge key={index} variant="outline" className="bg-purple-600 text-white border-purple-700">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full bg-white text-purple-600 hover:bg-purple-50 border-purple-600" asChild>
                  <Link to={`/charities/${charity.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" className="bg-purple-600 text-white hover:bg-purple-700" asChild>
            <Link to="/charities">View All Charities</Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 