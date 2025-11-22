import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Leaf, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const NavLinks = ({ mobile = false, onLinkClick }: { mobile?: boolean; onLinkClick?: () => void }) => (
    <>
      <Link 
        to="/" 
        className={`text-foreground hover:text-primary transition-colors ${mobile ? 'text-lg py-3 block' : ''}`}
        onClick={onLinkClick}
      >
        Home
      </Link>
      <Link 
        to="/plants" 
        className={`text-foreground hover:text-primary transition-colors ${mobile ? 'text-lg py-3 block' : ''}`}
        onClick={onLinkClick}
      >
        Browse Plants
      </Link>
      <Link 
        to="/scanner" 
        className={`text-foreground hover:text-primary transition-colors ${mobile ? 'text-lg py-3 block' : ''}`}
        onClick={onLinkClick}
      >
        Scanner
      </Link>
      <Link 
        to="/about" 
        className={`text-foreground hover:text-primary transition-colors ${mobile ? 'text-lg py-3 block' : ''}`}
        onClick={onLinkClick}
      >
        About
      </Link>
      {!mobile && user && (
        <Button variant="outline" asChild className="ml-2">
          <Link to="/scanner">Scan Plant</Link>
        </Button>
      )}
      {!mobile && !user && (
        <Button variant="default" asChild className="ml-2">
          <Link to="/auth">Login</Link>
        </Button>
      )}
      {!mobile && user && (
        <Button variant="ghost" onClick={signOut} className="ml-2">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-xl sm:text-2xl font-bold text-foreground">MediFlora</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <NavLinks />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <div className="flex flex-col gap-2 mt-8">
                <NavLinks mobile onLinkClick={() => setIsOpen(false)} />
                {user ? (
                  <>
                    <Button variant="default" asChild className="mt-4 w-full">
                      <Link to="/scanner" onClick={() => setIsOpen(false)}>Scan Plant</Link>
                    </Button>
                    <Button variant="outline" onClick={() => { signOut(); setIsOpen(false); }} className="w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button variant="default" asChild className="mt-4 w-full">
                    <Link to="/auth" onClick={() => setIsOpen(false)}>Login</Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
