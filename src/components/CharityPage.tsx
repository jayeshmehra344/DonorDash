import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";
import CharitiesLogo from "./images/Charitieslogo.jpg";

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
    <section className="py-16 md:py-24">
      {/* ✅ This div ONLY contains the heading section with the background */}
      <div
        className="relative py-16 px-4 md:px-6 bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${CharitiesLogo})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Optional dark overlay */}
        <div className="relative flex flex-col items-center justify-center text-center space-y-4">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-donor-purple/10 px-3 py-1 text-sm text-donor-purple">
              Verified Partners
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Featured Charities
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Browse through our network of verified charities and find causes that align with your values.
            </p>
          </div>
        </div>
      </div>

      {/* ✅ The cards remain outside, with NO background */}
      <div className="container px-4 md:px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {charities.map((charity) => (
            <Card key={charity.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={charity.image} 
                  alt={charity.name}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{charity.name}</CardTitle>
                </div>
                <Badge variant="secondary" className="mt-1 w-fit">{charity.category}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{charity.description}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Urgent Needs:</h4>
                  <div className="flex flex-wrap gap-1">
                    {charity.needsUrgent.map((need, index) => (
                      <Badge key={index} variant="outline" className="bg-donor-purple/5">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to={`/charities/${charity.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" asChild>
            <Link to="/charities">View All Charities</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
